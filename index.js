const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://mistertandon:0291noJI**@devednode.gggju.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useUnifiedTopology: true },
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