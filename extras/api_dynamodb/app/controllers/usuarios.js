module.exports.listar = function(application, callback) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.listar(callback);

}

module.exports.buscar = function(application, id, callback) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.buscarPorId(id, callback);

}

module.exports.incluir = function(application, dados, callback) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.incluir(dados, callback);
    
}

module.exports.alterar = function(application, id, dados, callback) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.alterar(id, dados, callback);
    
}

module.exports.excluir = function(application, id, callback) {

    var connection = application.config.dbConnection();
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.excluir(req.params.id, callback);
    
}