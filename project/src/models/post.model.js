const mongoose = require('mongoose');

const postSchema = new mongoose.schema({
    image : String,
    caption : String,
})
const postModel =  mongoose.model("post",postSchema);



module.exports = postModel;