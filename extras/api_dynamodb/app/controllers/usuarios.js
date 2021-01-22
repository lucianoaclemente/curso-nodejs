module.exports.listar = function(application, req, res) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.listar(req, function(err, data) {
        if (err) res.json(err); 
        else res.json(data) 
    });
    
}

module.exports.incluir = function(application, req, res) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.incluir(req.body, function(err, data) {
        if (err) res.json(err); 
        else res.json(data) 
    });
    
}

module.exports.buscar = function(application, req, res) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.buscarPorId(req.params.id, function(err, data) {
        if (err) res.json(err); 
        else res.json(data) 
    });
    
}

module.exports.alterar = function(application, req, res) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.alterar(req.params.id, req.body, function(err, data) {
        if (err) res.json(err); 
        else res.json(data) 
    });
    
}

module.exports.excluir = function(application, req, res) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.excluir(req.params.id, function(err, data) {
        if (err) res.json(err); 
        else res.json(data) 
    });
    
}