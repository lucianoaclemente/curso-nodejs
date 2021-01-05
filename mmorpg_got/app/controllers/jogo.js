module.exports.jogo = function(application, req, res) {
    if (!req.session.autorizado) {
        res.send('Usuário precisa fazer login');        
        return;
    } 

    var comando_invalido = 'N';

    if (req.query.comando_invalido == 'S') {
        comando_invalido = 'S';
    }

    var usuario = req.session.usuario;
    
    var connection = application.config.dbConnection;
    var jogoDAO = new application.app.models.jogoDAO(connection);

    jogoDAO.iniciaJogo(usuario, function(result) {
        if(result[0] !== undefined) {
            res.render('jogo', { img_casa : req.session.casa, jogo : result[0], comando_invalido });
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

    res.render('pergaminhos', { validacao : {} });
}

module.exports.ordenar_acao_sudito = function(application, req, res) {
    var dadosForm = req.body;
    
    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.redirect('jogo?comando_invalido=S');
        return;
    }

    console.log(dadosForm);

    res.send('tudo ok');
}