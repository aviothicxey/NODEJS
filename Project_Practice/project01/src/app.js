const express = require('express');
const postModel = require('./models/post.model');


const app = express();
app.use(express.json());

app.post("/post", async(req,res) =>{
    const result = 
})


module.exports = app;