const express = require('express');

const app = express();
app.get("/" , (req ,res)=>{
    res.send("HELLO WORLD");
})

app.listen(3000 , ()=>{
    console.log("Server port is 3000");
})