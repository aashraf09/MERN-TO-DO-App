const express = require('express') 
const app = express() 
const cors = require('cors') 
require('dotenv').config(); 
const cookieParser = require('cookie-parser') 
const mongoose = require('mongoose') 
const corsOptions = require('./config/corsOptions') 
const connectDb = require('./config/dbconn') 
const credentials = require('./middleware/credentials')
const path = require('path')
const PORT = process.env.PORT || 8080;

connectDb();
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/userdata', require('./routes/userdata'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});