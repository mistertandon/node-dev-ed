const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

mongoose.connect(
    process.env.DB_ACCESS,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => {

        console.log('connected to cloud Mongodb');
    })

/**
 * Import routes to the application.
 */
const appRoute = require('./routes/auth');

app.use('/api/user/', appRoute);

app.listen(
    3000,
    () => {
        console.log('Server is up and running.')
    });