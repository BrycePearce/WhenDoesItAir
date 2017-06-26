const express = require('express');
const path = require('path');
let bodyParser = require('body-parser')

//load in our routes
var index = require('./routes/index');
var tvdb = require('./routes/tvdb');
var token = require('./routes/token');

const app = express();

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
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/client/dist/index.html'));
});

app.use('/', index);
app.use('/api', token);//http://localhost:8080/api/token
app.use('/api', tvdb); //http://localhost:8080/api/tvdb
//always last so you can make sure everything else is loaded before accepting connections.
app.listen(app.get('port'), function () {
  console.log("Express started on port: " + app.get('port'));
});