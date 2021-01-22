module.exports = function(application) {
    application.get('/usuarios', async(req, res) => {
        application.app.controllers.usuarios.listar(application, req, res);
    });  

    application.get('/usuarios/:id', async(req, res) => {
        application.app.controllers.usuarios.buscar(application, req, res);
    });  

    application.post('/usuarios', async(req, res) => {
        application.app.controllers.usuarios.incluir(application, req, res);
    }); 

    application.put('/usuarios/:id', async(req, res) => {
        application.app.controllers.usuarios.alterar(application, req, res);
    }); 

    application.delete('/usuarios/:id', async(req, res) => {
        application.app.controllers.usuarios.excluir(application, req, res);
    }); 
}