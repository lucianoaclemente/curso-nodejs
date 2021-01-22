var express = require('express')
var AWS = require("aws-sdk")
var uuid = require('uuid');
var app = express()

// Criando tabela...
AWS.config.update({
    region: "eu-west-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "12345678",
    secretAccessKey: "12345678"
});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: 'Usuarios',
};
dynamodb.deleteTable(params, function(err, data) {
    if (err) {
        console.log("unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Table deleted. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

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
         console.log("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
     } else {
         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
     }
 });

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// CRUD

app.get('/usuarios', async(req, res) => {
    var params = {
        TableName: 'Usuarios',
    };

    docClient.scan(params, function(err, data) {
        if (err) res.json(err); // an error occurred
        else res.json(data) // successful responses
    });
})

app.get('/usuarios/:id', async(req, res) => {
    var params = {
        TableName: "Usuarios",
        Key:{
            "id": req.params.id
        }        
    };
    
    docClient.get(params, function(err, data) {
        if (err) res.json(err); // an error occurred
        else res.json(data) // successful response
    });
});

app.post('/usuarios', async(req, res) => {        
    var data = req.body
    var uid = uuid.v4()
    
    var params = {
        TableName: "Usuarios",
        Item:{
            "id": uid,
            "nome": data.nome,
            "email": data.email
        }
    };

    docClient.put(params, function(err, data) {
        if (err) res.json(err); // an error occurred
        else res.json(data) // successful response
    });
});

app.put('/usuarios/:id', async(req, res) => { 
    var params = {
        TableName: 'Usuarios',
        Key: {     
            id: req.params.id
        },
        UpdateExpression: 'SET email = :email', // String representation of the update to an attribute
        ConditionExpression: 'attribute_exists(email)', // optional String describing the constraint to be placed on an attribute
        ExpressionAttributeValues: { // a map of substitutions for all attribute values
            ':email': req.body.email
        },
        ConditionExpression: 'attribute_exists(email)', // optional String describing the constraint to be placed on an attribute
        ReturnValues: 'NONE', // optional (NONE | ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW)
    };

    docClient.update(params, function(err, data) {
        if (err) res.json(err); // an error occurred
        else res.json(data) // successful response
    });
});

app.delete('/usuarios/:id', async(req, res) => { 
    var params = {
        TableName: "Usuarios",
        Key:{
            "id": req.params.id           
        },
        ConditionExpression:"id <= :id",
        ExpressionAttributeValues: {
            ":id": req.params.id 
        }
    };
    
    docClient.delete(params, function(err, data) {
        if (err) res.json(err); // an error occurred
        else res.json(data) // successful response
    });
});

app.listen(3000, () => console.log('ok'))

