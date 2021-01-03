// importar o módulo do framework express
var express = require('express');

// importar o módulo do consign
var consign = require('consign');

// importar o módulo do body-parser
var bodyParser = require('body-parser');

// importar o módulo do expressa validator
var expressValidator = require('express-validator');

// importar o objeto do express
var app = express();

// setas as variáveis 'view engine' e 'views' do express
app.set('view engine', 'ejs');
app.set('views','./app/views');

// configurar os middlewares express.static
app.use(express.static('./app/public'));

// configurar o middleware body-parser
app.use(bodyParser.urlencoded({extended: true}));

// configurar o middleware express-validator
app.use(expressValidator());

// configura o autoloader das rotas, dos models e dos controllers
// para o objeto app
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app)

// exportar o objeto app
module.exports = app;