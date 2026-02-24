const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// EJS setup
app.set("view engine", "ejs");

// middleware to read form data
app.use(express.urlencoded({ extended: true }));

const DATA_FILE = path.join(__dirname, "messages.json");


// 👉 GET home page (form)
app.get("/", (req, res) => {
    res.render("index", { title: "Contact" });
});


// 👉 POST form submit (YOUR CODE)
app.post("/contact", (req, res) => {

    const newmessage = {
        name: req.body.username,
        email: req.body.useremail,
        date: new Date().toLocaleString()
    };

    let messages = [];

    if (fs.existsSync(DATA_FILE)) {
        const fileData = fs.readFileSync(DATA_FILE, "utf-8");
        messages = JSON.parse(fileData);
    }

    messages.push(newmessage);

    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

    res.send("Message saved successfully!");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});