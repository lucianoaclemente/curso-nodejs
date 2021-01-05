module.exports.jogo = function(application, req, res) {
    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');        
        return;
    } 

    var msg = 'N';

    if (req.query.msg != '') {
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    jogoDAO.iniciaJogo(usuario, function(result) {
        if(result[0] !== undefined) {
            res.render('jogo', { img_casa : req.session.casa, jogo : result[0], msg });
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

module.exports.suditos = function(application, req, res) {
    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');        
        return;
    } 

    res.render('aldeoes', { validacao : {} });
}

module.exports.pergaminhos = function(application, req, res) {
    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');        
        return;
    } 
    
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);
    var usuario = req.session.usuario;

    jogoDAO.getAcoes(usuario, function(result) {
        res.render('pergaminhos', { acoes : result })
    });

}

module.exports.ordenar_acao_sudito = function(application, req, res) {
    var dadosForm = req.body;
    
    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?msg=A');
        return;
    }

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    jogoDAO.acao(dadosForm);

    res.redirect('jogo?msg=B');
}

module.exports.revogar_acao = function(application, req, res) {

    var url_query = req.query;

    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.JogoDAO(connection);

    var _id = url_query.id_acao;

    jogoDAO.revogarAcao(_id, res);

}
