const express = require('express');

const userProcess = require('./routes/user');
const propertyProcess = require('./routes/property');
const categoryProcess = require('./routes/category');

const app = express();

app.use((request, response, next)=>{
    console.log(request.url);
    next();
})

app.use(express.json());

app.use("/users", userProcess);
app.use("/property", propertyProcess);
app.use("/category", categoryProcess);


app.listen(12019, ()=>{
    console.log("Server started...!!!");
})