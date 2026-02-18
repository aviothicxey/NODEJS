const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image : String,
    caption : String,
})
const postModel =  mongoose.Model("post",postSchema);



module.exports = postModel;