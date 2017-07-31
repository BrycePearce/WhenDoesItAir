var express = require('express');
var router = express.Router();
var request = require('superagent');

router.post('/tvdbDetails', function (req, res, next) {
  request
    .get("https://api.thetvdb.com/series/" + req.body.tvdbId)
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + req.app.get('jsontoken'))
    .end(function (err, response) {
      if (err || response.status != 200) {
        console.log(err);
        return response.status({
          success: false
        });
      } else {
        request
          .get("https://api.thetvdb.com/series/" + req.body.tvdbId + "/actors")
          .set('Accept', 'application/json')
          .set('Authorization', 'Bearer ' + req.app.get('jsontoken'))
          .end(function (err, responseNext) {
            if (err || responseNext.status != 200) {
              console.log(err);
              return res.status({
                success: false
              });
            } else {
              let actors = [];
              if (responseNext.body.data) {
                actors = responseNext.body.data.slice(0, 5)
              }
              return res.json({
                tvdbDetails: response.body.data,
                actorInfo: actors
              });
            }
          });
      }
    });
});

module.exports = router;