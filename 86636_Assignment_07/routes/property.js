const mysql = require('mysql2');
const express = require('express');
const { request, response } = require('express');

const app = express.Router();

/*========= CONNECTION DETAILS FOR MYSQL DB =========== */

const connectionDetails = {
    host: "localhost",
    user: "KD1_Mayur_86636",
    password: "manager",
    port: "9999",
    database: "projectZ"
}

/*=============== ADD PROPERTY (POST METHOD) ================ */

app.post("/", (request, response)=>{

    console.log("I am working dude at Add Property...Hurrahhh...!!! ");

    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const insertPropertyQuery = `INSERT INTO property(   
        categoryId, 
        title, 
        details, 
        address, 
        contactNo, 
        ownerName, 
        isLakeView, 
        isTV, 
        isAC, 
        isWifi, 
        isMiniBar, 
        isBreakfast, 
        isParking, 
        guests, 
        bedrooms, 
        beds, 
        bathrooms, 
        rent, 
        profileImage) 
        VALUES( ${request.body.categoryId}, 
        '${request.body.title}', 
        '${request.body.details}', 
        '${request.body.address}', 
        '${request.body.contactNo}', 
        '${request.body.ownerName}', 
         ${request.body.isLakeView}, 
         ${request.body.isTV}, 
         ${request.body.isAC}, 
         ${request.body.isWifi}, 
         ${request.body.isMiniBar}, 
         ${request.body.isBreakfast}, 
         ${request.body.isParking}, 
         ${request.body.guests}, 
         ${request.body.bedrooms}, 
         ${request.body.beds}, 
         ${request.body.bathrooms}, 
         ${request.body.rent}, 
        '${request.body.profileImage}')`
    
    connection.query(insertPropertyQuery, (error, result)=>{
       
        if(error==null)
        {
            const resultSetter = {
                status: "success",
                data: result
            }
            response.write(JSON.stringify(resultSetter));
            response.end();
        }
        else
        {
            const errorSetter = {
                status: "failed",
                data: error
            }
            response.write(JSON.stringify(errorSetter));
            response.end();
        }
    
    });

    connection.end();
})


/*=============== VIEW PROPERTY (GET METHOD) =============*/

app.get("/", (request, response)=>{

    console.log("I am working dude at View Property...Hurrahhh...!!! ");

    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const insertPropertyQuery = `SELECT  id, title, details, rent, profileImage from property`
    
    connection.query(insertPropertyQuery, (error, result)=>{
       
        if(error==null)
        {
            const resultSetter = {
                status: "success",
                data: result
            }
            response.write(JSON.stringify(resultSetter));
            response.end();
        }
        else
        {
            const errorSetter = {
                status: "failed",
                data: error
            }
            response.write(JSON.stringify(errorSetter));
            response.end();
        }
    
    });

    connection.end();
})


/*============== UPDATE THE PROPERTY (PUT METHOD) ===================*/

app.put("/", (request, response)=>{

    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

})



module.exports = app;