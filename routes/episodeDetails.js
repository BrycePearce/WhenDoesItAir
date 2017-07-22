var express = require('express');
var router = express.Router();
var request = require('superagent');


router.post('/episode', function (req, res, next) {
  request
    .get("https://api.themoviedb.org/3/tv/" + req.body.tmdbId + "/external_ids?api_key=" + req.app.get('tmdbkey') + "&language=en-US")
    .set('Accept', 'application/json')
    .end(function (err, firstResponse) {
      if (err || firstResponse.status != 200) {
        console.log("problem in /episode route");
        return firstResponse.status;
      } else {
        console.log(firstResponse.body);
        request
          .get("https://api.thetvdb.com/series/" + firstResponse.body.tvdb_id + "/episodes")
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + req.app.get('jsontoken'))
          .end(function (err, response) {
            if (err || response.status != 200) {
              return res.status({
                success: false
              });
            } else {
              return res.json({
                series: response.body.data,
                tvdbId: firstResponse.body.tvdb_id
              });
            }
          });
      }
    });
});

module.exports = router;