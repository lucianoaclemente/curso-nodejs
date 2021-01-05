module.exports.index = function(application, req, res) {
    res.render('index', { validacao : {} });
}

module.exports.autenticar = function(application, req, res) {
    var dadosForm = req.body;

    req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha não pode ser vazia').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render("index", {validacao : erros });
        return;
    }

    var connection = application.config.dbConnection;
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.autenticar(dadosForm, function(result) {
        req.session.autorizado = (result[0] !== undefined);

        if (req.session.autorizado) {

            req.session.usuario = result[0].usuario;
            req.session.casa =  result[0].casa;

            res.redirect('jogo');
    
        } else {
            res.render("index", { validacao : {} })
        }
    });

}