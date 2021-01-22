var AWS = require("aws-sdk")

var connDynamodb = function() {
    return new AWS.DynamoDB.DocumentClient()
}

module.exports = function() {
    return connDynamodb;
}