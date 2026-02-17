 const express = require('express');
const noteModel = require('./models/note.model');


 const app = express();
app.use(express.json()); // middleware , req.body do not get data unless a middleware is called


app.post("/notes", async(req ,res) =>{
    const data = req.body;  // {title,description}

    await noteModel.create({
        title : data.title,
        description : data.description
    })
     res.status(201).json({
        message : "note created successfully"
     })
})

app.get("/notes", async(req , res)=> {
    const notes = await noteModel.find(); // find() will always return an array;

    res.status(200).json({
        message: "Notes fetched successfully",
        notes : notes
    })
})

app.delete("/notes/:id" , async(req , res) =>{
    const id = req.params.id;
    await noteModel.findOneAndDelete({
        _id:id
    })

    res.status(200).json({
        message:"Note Deleted Successfully."
    })
})

app.patch("/notes/:id" , async(req,res) =>{
    const id = req.params.id;
    const description = req.body.description;

    await noteModel.findOneAndUpdate({
        _id:id
    },// ist : kiske bases pr find krenge
    {
        description : description
    }) // second: kisme update krna h

    res.status(200).json({
        message: "Note Updated Successfully."
    })
})


 module.exports = app; 
