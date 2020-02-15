const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
// app.use(bodyParser.urlencoded({ extended: false }));

    //  IMPORTS ROUTES
app.use('/users', require('./routes/auths'));
app.use('/api/web/auth/posts',require('./routes/posts'));
app.use('/api/web/auth/comments', require('./routes/comments'));
app.use('/roles', require('./routes/roles'));


//ROUTES
app.get('/',(req,res) => {
res.send('Welcome to home');

});

//connect to db
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

//listing to the server
app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});