const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true

    },
    age : Number,
    password :{
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }

},{collection : 'users'});

const User = mongoose.model('User', userSchema);

module.exports = User;