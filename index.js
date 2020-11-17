const express = require('express');
const bodyParser = require('body-parser')


const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

/**
 * Import routes to the application.
 */
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

dotenv.config();

mongoose.connect(
    process.env.DB_ACCESS,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {

        console.log('connected to cloud Mongodb');
    });

/**
 * Middleware
 */
app.use(cors());
app.use(bodyParser.json());

/**
 * Route Middleware
 */
app.use('/api/user', userRoute);
app.use('/api', authRoute);


app.listen(
    3000,
    () => {
        console.log('Server is up and running.')
    });