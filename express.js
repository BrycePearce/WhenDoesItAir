const express = require('express');
const path = require('path');
let bodyParser = require('body-parser')
var request = require('superagent');
require('dotenv').config();

//load in our routes
var index = require('./routes/index');
var tvdb = require('./routes/tvdb');
var token = require('./routes/token');
let prevTime = 0;

const app = express();

//get our env token
app.set('atoken', process.env.token);

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
app.use(function (req, res, next) {
  var currTime = Date.now();
  if (currTime - prevTime >= 84600) { //23.5 hours in seconds 
    prevTime = currTime;
    request
      .get("https://api.thetvdb.com/refresh_token")
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + app.get('atoken'))
      .end(function (err, response) {
        if (err || !response.ok) {
          console.log("feelsbadman");
          return res.status(response.status).json({ success: false, status: response.status });
        } else {
          console.log("feelsgoodman, our token refreshed as " + response.body.token);
          app.set('atoken', response.body.token);
          return res.status(response.status).json({ success: true, status: response.status });
        }
      });
  }
})
app.use('/', index);
app.use('/api', token);//http://localhost:8080/api/token
app.use('/api', tvdb); //http://localhost:8080/api/tvdb/:keystroke
//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on port: " + app.get('port'));
});