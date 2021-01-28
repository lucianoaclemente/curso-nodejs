var app = require('./config/server');
var AWS = require("aws-sdk")

AWS.config.update({
    region: "eu-west-1",
    endpoint: process.env.dynamodbEndpoint,
    accessKeyId: "12345678",
    secretAccessKey: "12345678"
});

var dynamodb = new AWS.DynamoDB()

// Excluindo tabela
var params = {
    TableName: 'Usuarios',
};

dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.log("Tabela não existe.");
    } else {
        console.log("Tabela excluida");
    }

    var params = {
        TableName : "Usuarios",
        KeySchema: [
            { AttributeName: "id", KeyType: "HASH"},  //Partition key
        ],
        AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };
    
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.log("Erro na tentativa de criação da tabela");
        } else {
            console.log("Tabela criada com sucesso!");
        }
    });        
});

app.listen(3000, function() {
    console.log('Servidor ON');
});