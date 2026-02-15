const express = require('express');

 // express(); // this created a server but it will n ot work until we  call it
  const app = express();// created a server and stored it in a variable called app
  app.get("/",(req,res)=>{

    res.send("Hello World"); // this will send a response to the client when they make a GET request to the root URL

  }); // programming the server.
  app.get("/about",(req, res)=>{
    res.send("About Page");
  })
  app.listen(3000,()=>{ //start the server with listen method and pass the port number and a callback function
    console.log('server is running on port 3000');
  });