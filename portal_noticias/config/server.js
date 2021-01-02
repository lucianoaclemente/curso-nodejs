var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Body Parser é um middleware
// extended = permite que seja implementado em json 
// as urls codificadas. 
app.use(bodyParser.urlencoded({extended: true}));

// Consign corre o diretório de rotas, arquivos específicos
// e adiciona as rotas  em app
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .into(app);

module.exports = app;
