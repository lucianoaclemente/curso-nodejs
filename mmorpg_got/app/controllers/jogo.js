module.exports.jogo = function(application, req, res) {
    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');        
        return;
    } 

    var usuario = req.session.usuario;
    
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.jogoDAO(connection);

    jogoDAO.iniciaJogo(usuario, function(result) {
        if(result[0] !== undefined) {
            res.render('jogo', { img_casa : req.session.casa, jogo : result[0] });
        } else {
            res.send("O usuário não possui sessão de jogo.")
        }
    });   
        
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function(erro) {
        res.render('index', { validacao : {} });
    });
}