//will need to call our token route here, get the token, and set it as a header in our api call

var express = require('express');
var router = express.Router();
var request = require('superagent');
require('dotenv').config();
router.get('/tvdb', function (req, res, next) {
  request
    .post("https://api.thetvdb.com/")
    .send({
      "apikey": process.env.apikey,
      "userasdkey": process.env.userkey,
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