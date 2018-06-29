const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/movies');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/movieDatabase', error => {
//mongoose.connect('mongodb://oto_masz:netguru1@ds221631.mlab.com:21631/moviedatabase', error => {
if (error) {
        console.log(`Database is not connected! Program needs to be restarted after connecting with database.`)
    }
    else {
         console.log('App is listening (port 5000)')
    }
})

mongoose.Promise = global.Promise

app.use(express.static('public'))

app.use(routes);

app.listen(5000); 

