const express = require('express');

const app = express();

app.use(express.json());

app.post('./create-post' , (req,res)=>{

    console.log(req.body);

})







module.exports = app;