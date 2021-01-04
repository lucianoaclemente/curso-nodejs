// importar o mongodb
var mongo = require('mongodb');

var connMongoDB = function() {

    var db = new mongo.Db(
        'got',
        new mongo.Server(
            '192.168.85.136',
            27017,
            {}
        ),
        {}
    );

    return db;

}

module.exports = function() {
    return connMongoDB;
}