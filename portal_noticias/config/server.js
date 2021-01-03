var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');

// Body Parser é um middleware
// extended = permite que seja implementado em json 
// as urls codificadas. 
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(express.static('./app/public'))

// Consign corre o diretório de rotas, arquivos específicos
// e adiciona as rotas  em app
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;
