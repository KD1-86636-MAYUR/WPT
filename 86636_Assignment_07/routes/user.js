
const mysql = require('mysql2');
const express = require('express');
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

// console.log(jwt);

const app = express.Router();


/*=========== CONNECTION DETAILS FOR MYSQL DB ========== */
const connectionDetails = {
    host:"localhost",
    user:"KD1_Mayur_86636",
    password:"manager",
    port:"9999",
    database:"projectZ"
}

/*=========== VIEW ALL USERS =========== */

app.get("/profile", (request, response) => {

    const connection = mysql.createConnection(connectionDetails);
    
    connection.connect();

    const token = request.headers["authkey"]; // Do not use key in lower case but I using it then go for const token = request.headers["AuthKey"] || request.headers["authkey"];
   
    console.log(token);
    const decodedToken = jwt.verify(token, "SecretKeyDude");
    console.log(decodedToken);

    const selectQuery = `select firstName, lastName, phoneNumber, email from user where email = '${decodedToken.email}'`;

    connection.query(selectQuery, (error, result)=>{

        if(error == null)
        {
            const formattedData = {
                status: "success",
                data: [{
                         firstName: result[0].firstName,
                         lastName: result[0].lastName,
                         phoneNumber: result[0].phoneNumber,
                         email: result[0].email
                }]}
            response.write(JSON.stringify(formattedData));
            response.end();
        }
        else
        {
            const formattedData = {
                status: "failedDude",
                data: [{
                         firstName: " ",
                         lastName: " ",
                         phoneNumber: " ",
                         email: " "
                }]}

            response.write(error + "error occoured");
            response.end();
        }

     })       

    connection.end();

});

/*============ UPDATE THE USER (PUT)============== */


app.put("/profile", (request, response) => {

    const connection = mysql.createConnection(connectionDetails);
    
    connection.connect();

    const token = request.headers["authkey"]; // Do not use key in lower case but I using it then go for const token = request.headers["AuthKey"] || request.headers["authkey"];
   
    console.log(token);
    const decodedToken = jwt.verify(token, "SecretKeyDude");
    console.log(decodedToken);

    const updateQuery = `UPDATE user 
                     SET firstName = '${request.body.firstName}', 
                         lastName = '${request.body.lastName}', 
                         phoneNumber = '${request.body.phoneNumber}' 
                     WHERE email = '${decodedToken.email}'`;


    connection.query(updateQuery, (error, result)=>{

        if(error == null)
        {
            const reply = {
                status: "success",
                data: result
            }
            response.write(JSON.stringify(reply));
            response.end();
        }
        else
        {
            const reply = {
                status: "failedDude",
                data: result
            }
            response.write(JSON.stringify(reply));
            response.end();
        }

     })       

    connection.end();

});


/*=========== REGISTER USER (POST METHOD INSERT) ============= */

app.post("/registration", (request, response)=>{

    console.log("Register sucessfully..!!!");
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    var insertQuery = `INSERT INTO user 
    (firstName, lastName, email, password, phoneNumber, isDeleted) 
    VALUES(   
        '${request.body.firstName}', 
        '${request.body.lastName}', 
        '${request.body.email}', 
        '${request.body.password}', 
        '${request.body.phoneNumber}', 
         ${request.body.isDeleted})`;

     connection.query(insertQuery, (error, result)=>{
        if(error == null)
        {
            response.write(JSON.stringify(result));
            response.end();
        }
        else
        {
            response.write(error + "error occoured");
            response.end();
        }

        connection.end();

     })       
    connection.end();
})

/*=============== USER LOGINS (POST METHOD) =============== */

app.post("/login", (request, response)=>{

    console.log("login sucessfully !!");
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    var checkEmailFromUser = `select email, password, firstName, lastName, createdTimestamp from user WHERE email='${request.body.email}'`;
    
    connection.query(checkEmailFromUser, (error, result)=>{
        if(error == null)
        {
            if(result[0].password == request.body.password)
            {
                console.log(" Logged in....")

                const tokenGenerationForLogin = {
                    status:"success",
                    data:{
                    token:jwt.sign({
                        email: result[0].email,
                        dateTime: result[0].createdTimestamp
                    }, "SecretKeyDude"),
                    name: `${result[0].firstName} ${result[0].lastName}`}
               };
               console.log(tokenGenerationForLogin);
             }
             else
             {
                const tokenGenerationForLogin = {
                    isUserValid: true,
                    message:"User logged in..!!!",
                    token: null
                };
             }

            response.write(JSON.stringify(result));
            response.end();
        }
        else
        {
            response.write(error + "error occoured again..")
            response.end();
        }
    })
    
    connection.end();
})

/*============= EXPORTING MODULE ============== */

module.exports = app;