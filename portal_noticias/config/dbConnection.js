var mysql = require('mysql');

var connMySQL = function() {
    return mysql.createConnection({
        host : '192.168.85.136',
        user : 'root',
        password : 'admin123',
        database : 'portal_noticias'        
    });
}

module.exports = function() {
    return connMySQL;
}
