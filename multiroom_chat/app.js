// importar as configurações no servidor
var app = require('./config/server');

// parametrizar a porta de escuta
var server = app.listen(3000, function() {
    console.log('Servidor online');
})

var io = require('socket.io').listen(server);

// Criar a conexão por websocket
io.on('connection', function(socket) {
    console.log('Usuário conectou');

    socket.on('disconnect', function() {
        console.log('Usuário desconectou');
    });
});
