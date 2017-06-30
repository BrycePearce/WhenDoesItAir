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
        console.log(response.body.imdb_id);

        /*
        todo:
        request tvdb episode info here with the imdbid
        */





        /*let showInfo = response.body.results.map((show, index) => {
          return { id: show.id, show: show.name };
        });*/
        //service is expecting a json result, and we want it as one object, so send it back like so
        /*return res.json({ data: showInfo });*/
      }
    });
});

//our tvdb call
/*
  request
    .post(" https://api.thetvdb.com/seach/series")
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer ' + req.app.get('jsontoken'))
    .end(function (err, response) {
      console.log("you dun goofed. http error " + err);
      if (err || response.status != 200) {
        return null;
      } else {
        console.log("successssssssssssssssssssss!!");
        let showInfo = response.body.results.map((show, index) => {
          return { id: show.id, show: show.name };
        });
        //service is expecting a json result, and we want it as one object, so send it back like so
        return res.json({ data: showInfo });
      }
    });
*/

module.exports = router;