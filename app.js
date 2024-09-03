const express = require('express');
const router = require('./src/routes/api');
// const router = express.Router();

const app = new express();
const bodyParser = require('body-parser');
const path = require('path');

// Security Middleware
const { default: rateLimit } = require('express-rate-limit');
const { default: helmet } = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');

// Database Lib Import
const { default: mongoose } = require('mongoose');

// frontend
app.use(express.static('client/build'));

// Secuirity middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
app.use(bodyParser.json());

// Request rate limit
const limiter = rateLimit({
    windowMs:15*60*1000,
    max:3000
});

app.use(limiter);

// MongoDB Database connection
let URI = 'mongodb+srv://monzurmorshedcse:P6l062RTrsfXTr22@cluster0.wm9uy.mongodb.net/sample_restaurants?retryWrites=true&w=majority';
mongoose.connect(URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));;

// Routing implement
app.use('/api/v1',router);
// app.use('/',router);

// Frontend routing
app.get('*', function(req,res) {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
});

module.exports = app;

