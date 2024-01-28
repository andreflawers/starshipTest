'use strict';
const axios = require("axios");
const AWS = require("aws-sdk")
const translator = require("../helpers/translate")

AWS.config.setPromisesDependency(require('bluebird'));

const apiUrl = 'https://swapi.py4e.com/api/starships/';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getList() {
    var responseData = await axios.get(apiUrl)
        .then((response) => {
            return response.data.results;
        })
    return responseData;
}

async function getStarship(id) {
    var url = `${apiUrl}${id}`;
    var responseData = await axios.get(url)
        .then((response) => {
            return response.data;
        })
    return responseData;
}

module.exports.list = async(event) => {
    var starshipList = await getList();
    return {
        statusCode: 200,
        body: JSON.stringify(starshipList),
    };

};

module.exports.get = async(event) => {
    var starship = await getStarship(event.pathParameters.id);
    const starshipTranslated = translator.translateStarship(starship);
    return {
        statusCode: 200,
        body: JSON.stringify(starshipTranslated),
    };
}

module.exports.getInternal = async(event) => {

    const name = decodeURI(event.pathParameters.nombre);
    console.log(name);
    const params = {
        TableName: process.env.DYNAMODB_TABLE || 'starshipsTable',
        Key: {
            nombre: name,
        }
    }
    try {
        const result = await dynamoDB.get(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: `Hola , Peter : ${err}`
        }
    }
}

module.exports.post = async(event) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: JSON.parse(event.body)
    }
    try {
        const result = await dynamoDB.put(params).promise();
        return {
            statusCode: 200,
            body: `Insertado correctamente`,
        };
    } catch (err) {
        return {
            statusCode: 400,
            body: `Hola , Peter : ${err}`
        }
    }

}