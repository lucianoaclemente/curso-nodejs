var express = require('express');
var consign = require('consign');

var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;