//will need to call our token route here, get the token, and set it as a header in our api call
//now that we have token, just need keystrokes (probably need to nest our api calls)
var express = require('express');
var router = express.Router();
var request = require('superagent');


router.post('/episode', function (req, res, next) {
  //get our token (this will run on startup, need to put it in the router.get, then next the tvdb call)
  request
    .get("https://api.themoviedb.org/3/tv/" + req.body.tmdbId + "/external_ids?api_key=" + req.app.get('tmdbkey') + "&language=en-US")
    .set('Accept', 'application/json')
    .end(function (err, response) {
      if (err || response.status != 200) {
        return null;
      } else {
        console.log(response.body.tvdb_id);
        request
          .get("https://api.thetvdb.com/series/" + response.body.tvdb_id)
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + req.app.get('jsontoken'))
          .end(function (err, response) {
            if (err || response.status != 200) {
              console.log("problem " + err);
              return null;
            } else {
              return res.json({ series: response.body.data });
            }
          });
      }
    });
});

module.exports = router;