var express = require('express');
var router = express.Router();
var request = require('superagent');


router.post('/episode', function (req, res, next) {
  request
    .get("https://api.themoviedb.org/3/tv/" + req.body.tmdbId + "/external_ids?api_key=" + req.app.get('tmdbkey') + "&language=en-US")
    .set('Accept', 'application/json')
    .end(function (err, response) {
      if (err || response.status != 200) {
        return null;
      } else {
        console.log(response.body.tvdb_id);
        request
          .get("https://api.thetvdb.com/series/" + response.body.tvdb_id + "/episodes")
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + req.app.get('jsontoken'))
          .end(function (err, response) {
            if (err || response.status != 200) {
              console.log(err);
              return null;
            } else {
              return res.json({ series: response.body.data });
            }
          });
      }
    });
});

module.exports = router;