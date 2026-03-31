const express = require('express');

const app = express();

app.use(express.json());
app.use('/api/auth' , authRouter);

app.get('/', (req, res) => {
    res.send('BEE Class');
});

module.exports = app;