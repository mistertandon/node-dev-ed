const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

/**
 * Import routes to the application.
 */
const appRoute = require('./routes/auth');

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

app.use(express.json());

/**
 * Route Middleware
 */
app.use('/api/user/', appRoute);

app.listen(
    3000,
    () => {
        console.log('Server is up and running.')
    });