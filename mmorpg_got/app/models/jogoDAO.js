function jogoDAO(connection) {   
    this._connection = connection();
 }

jogoDAO.prototype.gerarParametros = function(usuario) {
    this._connection.open( function(erro, mongoClient) {
        mongoClient.collection("jogo", function(erro, collection) {
            collection.insert({
                usuario : usuario,
                moeda : 15,
                suditos : 10,         
                temor : Math.floor(Math.random() * 1000),
                sabedoria : Math.floor(Math.random() * 1000),
                comercio : Math.floor(Math.random() * 1000),
                magia : Math.floor(Math.random() * 1000)
            });

            mongoClient.close();
        });
    }); 
}

jogoDAO.prototype.iniciaJogo = function(usuario, callback) {
    this._connection.open( function(erro, mongoClient) {
        mongoClient.collection("jogo", function(erro, collection) {
            collection.find({ usuario : usuario }).toArray(function(erro, result) {
                mongoClient.close();                
                callback(result);
            });
        });
    }); 


}

 module.exports = function() {
    return jogoDAO;
}