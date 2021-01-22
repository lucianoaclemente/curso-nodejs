var uuid = require('uuid');

function UsuariosDAO(connection) {
    this._docClient = connection;
}

UsuariosDAO.prototype.listar = function(req, callback) {
    var params = {
        TableName: 'Usuarios',
    };
    
    this._docClient.scan(params, callback);
}

UsuariosDAO.prototype.incluir = function(dados, callback) {
    var uid = uuid.v4()

    var params = {
        TableName: "Usuarios",
        Item:{
            "id": uid,
            "nome": dados.nome,
            "email": dados.email
        }
    };

    this._docClient.put(params, callback);
}

UsuariosDAO.prototype.buscarPorId = function(id, callback) {
    var params = {
        TableName: "Usuarios",
        Key:{
            "id": id
        }        
    };
    
    this._docClient.get(params, callback);
}

UsuariosDAO.prototype.alterar = function(id, dados, callback) {
    
    var params = {
        TableName: 'Usuarios',
        Key: {     
            id: id
        },
        UpdateExpression: 'SET email = :email', 
        ConditionExpression: 'attribute_exists(email)', 
        ExpressionAttributeValues: { 
            ':email': dados.email
        },
        ConditionExpression: 'attribute_exists(email)', 
        ReturnValues: 'NONE', 
    };

    this._docClient.update(params, callback);

}

UsuariosDAO.prototype.excluir = function(id, callback) {
    var params = {
        TableName: "Usuarios",
        Key:{
            "id": id          
        },
        ConditionExpression:"id <= :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    };
    
    this._docClient.delete(params, callback);
}

module.exports = function() {
    return UsuariosDAO;
};