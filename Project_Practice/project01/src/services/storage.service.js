const {imageKit} = require('@imagekit/nodejs');

const imagekit = new imagekit({
    PublicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndPoint : process.env.IMAGEKIT_MONGO_URI
})

async function uploadFile(buffer){
    const result = await imagekit.files({
        file:buffer.toString("base_64"),
        fileName : "image.jpg",
    })
   return result;
}

module.exports = uploadFile;
