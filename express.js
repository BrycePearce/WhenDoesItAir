const express = require('express');
const path = require('path');
let bodyParser = require('body-parser')
let request = require('superagent');
require('dotenv').config();

//load in our routes
var tvdb = require('./routes/tvdb');
let episode = require('./routes/episodeDetails');
let tvdbDetails = require('./routes/tvdbDetails');
let tmdb = require('./routes/tmdbDetails');

let prevTime = 0;

const app = express();

//set our env token & tmdb key
app.set('jsontoken', process.env.token);
app.set('tmdbkey', process.env.TMDBkey);
//set port (local environment variable is set as PORT=80)
app.set('port', process.env.PORT || 8080);

//static folder for angular
app.use(express.static(path.join(__dirname, 'client/dist/')));

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// This function is executed every time the app receives a request.
// Handles our token, see's if it needs to be renewed, and if so, renews it

function getToken() {
  request
    .get("https://api.thetvdb.com/refresh_token")
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + app.get('jsontoken'))
    .end(function (err, response) {
      if (err || !response.ok) {
        console.log("getting a new token", response.status);
        request
          .post("https://api.thetvdb.com/login")
          .send({
            "apikey": process.env.apikey,
            "userkey": process.env.userkey,
            "username": process.env.user
          })
          .set('Accept', 'application/json')
          .end(function (err, response) {
            if (err || !response.ok) {
              console.log("problem");
              console.log(err.body);
              //return res.status(response.status);
            } else {
              console.log("Token created");
              app.set('jsontoken', response.body.token);
            }
          });
      } else {
        console.log("Token refreshed");
        app.set('jsontoken', response.body.token);
      }
    });
}
getToken();
setInterval(getToken, 1000 * 60 * 60 * 20);


app.use('/api', tvdb); //http://localhost:8080/api/tvdb
app.use('/api', episode); //http://localhost:8080/api/episode
app.use('/api', tvdbDetails); //http://localhost:8080/api/episode
app.use('/api', tmdb); //http://localhost:8080/api/tmdb

//send main page if bad route hit (need this for Angular 2 render components correctly sorta)
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/client/dist/index.html'));
});

//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on port: " + app.get('port'));
});