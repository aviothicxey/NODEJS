const  mongoose = require('mongoose');

async function connectDB(){

    await mongoose.connect("mongodb+srv://gargaparna78_db_user:Aparna1107@practice.ybtv1c7.mongodb.net/Ayush");

    console.log("Connected to db");
}


module.exports = connectDB ;