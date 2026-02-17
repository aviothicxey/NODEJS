const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect("mongodb+srv://backend:Aparna1107@backend.ecddmea.mongodb.net/aparna") // connect the database with server

    console.log("Database is connected successfully");


}

module.exports = connectDB;