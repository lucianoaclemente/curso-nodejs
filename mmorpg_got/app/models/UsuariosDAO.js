function UsuariosDAO(connection) {   
   this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
    this._connection.open( function(erro, mongoClient) {
        mongoClient.collection("usuarios", function(erro, collection) {
            collection.insert(usuario);
            
            mongoClient.close();
        });
    }); 
}

UsuariosDAO.prototype.autenticar = function(usuario, callback) {
    this._connection.open( function(erro, mongoClient) {
        mongoClient.collection("usuarios", function(erro, collection) {
            collection.find(usuario).toArray(function(erro, result) {
                mongoClient.close();
                callback(result);
            });
        });
    }); 
}

module.exports = function() {
    return UsuariosDAO;
}