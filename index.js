const express = require(express);
const app = express();

const appRoute = require('./routes/auth');

app.listen(
    3000,
    () => {
        console.log('Server is up and running.')
    });