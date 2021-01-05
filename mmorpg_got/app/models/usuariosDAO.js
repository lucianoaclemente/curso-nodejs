function usuariosDAO(connection) {   
   this._connection = connection();
}

usuariosDAO.prototype.inserirUsuario = function(usuario) {
    this._connection.open( function(erro, mongoClient) {
        mongoClient.collection("usuarios", function(erro, collection) {
            collection.insert(usuario);
            
            mongoClient.close();
        });
    }); 
}

usuariosDAO.prototype.autenticar = function(usuario, callback) {
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
    return usuariosDAO;
}