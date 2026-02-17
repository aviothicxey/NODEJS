const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema({

title : String,
description : String,

})

const noteModel = mongoose.model("note" , noteSchema); // first argument : name of the collection in database, second argument : schema which we want to use for that collection

module.exports = noteModel;