var ObjectID = require('mongodb').ObjectId

function JogoDAO(connection) {   
    this._connection = connection();
 }

 JogoDAO.prototype.gerarParametros = function(usuario) {
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

JogoDAO.prototype.iniciaJogo = function(usuario, callback) {
    this._connection.open( function(erro, mongoClient) {
        mongoClient.collection("jogo", function(erro, collection) {
            collection.find({ usuario : usuario }).toArray(function(erro, result) {
                mongoClient.close();                
                callback(result);
            });
        });
    });
}

JogoDAO.prototype.acao = function(acao) {
    this._connection.open( function(erro, mongoClient) {

        mongoClient.collection("acao", function(erro, collection) {
            var date = new Date();
            var tempo = 0;

            switch(parseInt(acao.acao)) {
                case 1: tempo = 1 * 60 * 60000; break;       
                case 2: tempo = 2 * 60 * 60000; break;       
                case 3: tempo = 5 * 60 * 60000; break;       
                case 4: tempo = 5 * 60 * 60000; break;    
            }

            acao.acao_termina_em = date.getTime() + tempo;    
            collection.insert(acao);
            
        });

        mongoClient.collection("jogo", function(erro, collection) {
            var moedas = 0;
            
            switch(parseInt(acao.acao)) {
                case 1: moedas = -2 * acao.quantidade; break;
                case 2: moedas = -3 * acao.quantidade; break;
                case 3: moedas = -1 * acao.quantidade; break;
                case 4: moedas = -1 * acao.quantidade; break;
            }   
            
            collection.update(
                { usuario : acao.usuario },
                { $inc : { moeda : moedas } }                
            );
            
            mongoClient.close();
        }); 
    });
}

JogoDAO.prototype.getAcoes = function(usuario, callback) {
    this._connection.open( function(erro, mongoClient) {
        mongoClient.collection("acao", function(erro, collection) {
            var date = new Date();
            var momento_atual = date.getTime();

            collection.find({ usuario : usuario, acao_termina_em : {$gt:momento_atual}}).toArray(function(erro, result) {
                mongoClient.close();                
                callback(result);
            });
        });
    });
}

JogoDAO.prototype.revogarAcao = function(_id, res) {

    this._connection.open(function(err, mongoClient) {

        mongoClient.collection('acao', function(err, collection) {

            collection.remove(       
                {_id: ObjectID(_id)},
                function(err, result) {
                    res.redirect("jogo?msg=D")
                    mongoClient.close();       
                }
            ); 
        }); 

    });

}

 module.exports = function() {
    return JogoDAO;
}