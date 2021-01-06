var http = require("http");

var opcoes = {
    hostname : 'localhost',
    port : 3000,
    path : '/',
    method : 'post',
    headers : {
        'Accept' : 'application/json',
        'Content-type' : 'Application/json'
    }
}

//Usando get
/*
http.get(opcoes, function(res) {

    var buffer_corpo_response = [];

    res.on('data', function(chunk) {
        buffer_corpo_response.push(chunk);
    });

    res.on('end', function() {
        var corpo_response = Buffer.concat(buffer_corpo_response).toString();        
        console.log(corpo_response);
    });

    res.on('error', function() {

    });
});
*/

// Usando request

// Content type
var html = 'nome=José';   // x-www-form-urlencoded
var json = {
    nome : 'José'
}
var string_json = JSON.stringify(json);

var req = http.request(opcoes, function(res) {

    var buffer_corpo_response = [];

    res.on('data', function(chunk) {
        buffer_corpo_response.push(chunk);
    });

    res.on('end', function() {
        var corpo_response = Buffer.concat(buffer_corpo_response).toString();        
        console.log(corpo_response);
    });
    
});

req.write(string_json);
req.end();
