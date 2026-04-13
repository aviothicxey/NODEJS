const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());

const JWT_SECRET = 'your_secret_key';
app.get('/login' , (req,res) => {
    const data = jwt.sign({
        username : 'Aparna_11',
        firstname: 'Aparna'
    }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', data, { httpOnly: true });
    res.send('Logged in successfully');
});
app.get('/dashboard', (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('You have been logged out!');
    }   
    jwt.verify(token, JWT_SECRET, (err, userData) => {
        if (err) {
            return res.status(403).send('Invalid token.');
        }
        res.render('dashboard', { user: userData });
    });
});
app.get('/logout', (req, res) => {
    if(req.cookies.token) {
        res.clearCookie('token');
        res.send('Logged out successfully');
    }else{
        res.send('You are not logged in');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});