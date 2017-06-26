//create the route for creating and updating our token here
//remember to-do a 24 hour timer on the backend so it refreshes

//https://github.com/kelektiv/node-cron this for the 24 hour thing?
//https://github.com/node-schedule/node-schedule or this
var express = require('express');
var router = express.Router();
var request = require('superagent');
require('dotenv').config();
router.get('/token', function (req, res, next) {
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
        return res.status(response.status).json({ success: false, status: response.status });
      } else {
        return res.status(response.status).json({ token: response.body.token, status: response.status });
      }
    });
});

module.exports = router;