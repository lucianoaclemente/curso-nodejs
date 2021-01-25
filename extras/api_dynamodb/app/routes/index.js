module.exports = function(application) {
    application.get('/usuarios', async(req, res) => {
        application.app.controllers.usuarios.listar(application, function(err, data) {
            if (err) res.status(400).json(err); 
            else res.status(200).json(data) 
        });
    });  

    application.get('/usuarios/:id', async(req, res) => {
        application.app.controllers.usuarios.buscar(application, req.params.id, function(err, data) {
            if (err) res.status(400).json(err); 
            else res.status(200).json(data) 
        });
    });  

    application.post('/usuarios', async(req, res) => {
        application.app.controllers.usuarios.incluir(application, req.body, function(err, data) {
            if (err) res.status(400).json(err); 
            else res.status(200).json(data) 
        });
    }); 

    application.put('/usuarios/:id', async(req, res) => {
        application.app.controllers.usuarios.alterar(application, req.params.id, req.body, function(err, data) {
            if (err) res.status(400).json(err); 
            else res.status(200).json(data) 
        });
    }); 

    application.delete('/usuarios/:id', async(req, res) => {
        application.app.controllers.usuarios.excluir(application, req.params.id, function(err, data) {
            if (err) res.status(400).json(err); 
            else res.status(200).json(data) 
        });
    }); 
}