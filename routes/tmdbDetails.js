// tmdb details for external loads
// todo: don't actually need this route, can append it as a response to  "/tvdb"
var express = require('express');
var router = express.Router();
var request = require('superagent');


router.post('/tmdb', function (req, res, next) {
  request
    .get("https://api.themoviedb.org/3/tv/" + req.body.tmdbId + "?api_key=" + req.app.get('tmdbkey') + "&language=en-US")
    .set('Accept', 'application/json')
    .end(function (err, response) {
      if (err || response.status != 200) {
        console.log(err);
        return res.status({
          success: false
        });
      } else {
        return res.json({
          data: response.body
        });
      }
    });
});

module.exports = router;