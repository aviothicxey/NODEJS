const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const session = require("express-session");
const app = express();

const uploadsDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static(uploadsDir));
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

mongoose.connect("mongodb://127.0.0.1:27017/signupDB")
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Connection failed", err));

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: String,
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    age: Number,
    password: { type: String, required: true },
    profilePic:String,
    date: { type: Date, default: Date.now }
}, { collection: 'Users' });

const Users = mongoose.model('Users', userSchema);

app.get('/', (req, res) => {
    return res.redirect('/signup');
});

app.get('/signup', (req, res) => {
    res.render('signup', { message: null });
});

app.post('/signup', upload.single('profilePic'),async (req, res) => {
    try {
        const { firstname, lastname, username, email, age, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.render('signup', { message: "Passwords do not match" });
        }

        const userExists = await Users.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (userExists) {
            if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
            return res.render('signup', { message: "Username or Email already exists" });
        }

        const newuser = new Users({
            firstname,
            lastname,
            username,
            email,
            age: age ? Number(age) : undefined,
            password,
            profilePic: req.file ? `/uploads/${req.file.filename}` : ""
        });

        await newuser.save();

        res.render('signup', { message: "Signup successful!" });

    } catch (err) {
        console.error("Signup error:", err);
        res.render('signup', { message: "Error: " + err.message });
    }
});

app.get('/login', (req, res) => {
    res.render('login', { message: null });
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.render('login', { message: "Username and password required" });
        }

        const user = await Users.findOne({ username });

        if (!user) {
            return res.render('login', { message: "User not found" });
        }

        if (user.password !== password) {
            return res.render('login', { message: "Invalid password" });
        }

        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.firstname = user.firstname;
        req.session.lastname = user.lastname;
        req.session.profilePic = user.profilePic;

        res.redirect('/home');

    } catch (err) {
        console.error("Login error:", err);
        res.render('login', { message: "Error: " + err.message });
    }
});

app.get('/home', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    
    res.render('home', {
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        profilePic: req.session.profilePic,
        username: req.session.username
    });
});

// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.render('home', { message: "Error logging out" });
//         }
//         res.redirect('/login');
//     });
// });

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    return res.status(500).render('signup', { message: "Server error. Check terminal logs." });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

