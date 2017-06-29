const express = require('express');
const path = require('path');
let bodyParser = require('body-parser')
var request = require('superagent');
require('dotenv').config();

//load in our routes
var tvdb = require('./routes/tvdb');
var token = require('./routes/token');

let prevTime = 0;

const app = express();

//set our env token & tmdb key
app.set('jsontoken', process.env.token);
app.set('tmdbkey', process.env.TMDBkey);
//set port (local environment variable is set as PORT=80)
app.set('port', process.env.PORT || 8080);

//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//static folder for angular
app.use(express.static(path.join(__dirname, 'client/dist/')));

//Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//I think this will intercept all routes
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/client/dist/index.html'));
});

// This function is executed every time the app receives a request.
// Handles our token, see's if it needs to be renewed, and if so, renews it
/*app.use(function (req, res, next) {
  var currTime = Date.now();
  if (currTime - prevTime >= 84600) { //23.5 hours in seconds 
    prevTime = currTime;
    request
      .get("https://api.thetvdb.com/refresh_token")
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + app.get('jsontoken'))
      .end(function (err, response) {
        if (err || !response.ok) {
          console.log("refreshing token did not succeed");
          console.log("call our token route here?");
          next();
        } else {
          console.log("Token refreshed");
          app.set('jsontoken', response.body.token);
          next();
        }
      });
  }
});*/

app.use('/api', token);//http://localhost:8080/api/token
app.use('/api', tvdb); //http://localhost:8080/api/tvdb
//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on port: " + app.get('port'));
});