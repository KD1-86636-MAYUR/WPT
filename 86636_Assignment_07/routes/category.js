const mysql = require('mysql2');
const express = require('express');
const { request, response } = require('express');

const app = express.Router();

/*============== CONNECTION DETAILS FOR MYSQL DB ================ */

const connectionDetails = {
    host: "localhost",
    user: "KD1_Mayur_86636",
    password: "manager",
    port: 9999,
    database: "projectZ"
};

/*========== ADD THE CATEGORY (POST METHOD) ==============*/

app.post("/", (request, response)=>{

    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    
})


module.exports = app;



