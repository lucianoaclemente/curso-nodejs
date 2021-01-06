var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var port = 3000;

app.listen(port);

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

console.log('Servidor HTTP está escutando na porta ' + port);

app.get('/', function(req, res) {
    res.send({msg: 'Olá'})    
});

app.post('/api', function(req, res) {
    var dados = req.body;

   
});