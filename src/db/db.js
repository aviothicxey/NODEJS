const mongoose = require('mongoose');

async function connectDB(){
    await mongoose.connect("mongodb://localhost:27017/myDatabase").then(()=> console.log("Connected to MongoDB")).catch(err => console.error("could not connect to db") );
}

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName : String,
    username :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    age:Number,
    date:{
        type:Date,
        default:Date.now
    }
}, {collection : "users"});

const User = mongoose.model('User', userSchema);

async function createUser(){
    const user = new User({
        firstName : "John",
        lastName : "Doe",
        username : "johndoe",
        email : "123@example.com",
        age : 30
    });

    try{
        const existingUser = await User.findOne({ email: user.email });
        if(existingUser){
            console.error(`email ${user.email} already exists. Please use a different email.`);
            return;
        }
    } catch(err){
        if(err.code === 11000){
            console.error(`email ${user.email} already exists. Please use a different email.`);
        } else {
            console.error("Error saving data: ", err);
        }
    }finally{   
        mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}
createUser();

module.exports = connectDB;