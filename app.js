// app.js
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const user = require('./routes/route');
const app = express();

// Configuring the database
const dbConfig = 'mongodb://localhost:27017/userDB';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;



// Connecting to the database
mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', user);


// app.set('view engine', 'jade');

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

