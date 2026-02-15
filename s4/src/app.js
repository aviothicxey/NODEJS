// motive of this file is creating the server

const express = require('express');

const app = express();
// express.json() is a middleware that parses incoming JSON requests and puts the parsed data in req.body

app.use(express.json());
const notes = [];

app.post('/notes' , (req ,res) => {
    notes.push(req.body);
    res.status(201).json({
        message : 'Note created successfully',
    });
})

app.get('/notes',(req , res)=>{
    res.status(200).json({
        message : "notes fetched successfully",
        notes : notes
    })
})

app.delete('/notes/:index' , (req , res)=>{
    const index = parseInt(req.params.index);
    delete notes[index]; 
    res.status(200).json({
        message : "Note deleted successfully"
    })
})

app.patch('/notes/:index' , (req , res)=>{
    const index = parseInt(req.params.index);
    const description = req.body.description;
    notes[index].description = description;
    res.status(200).json({
        message : "Note updated successfully"
    })
})


module.exports = app; // server to export kr diya