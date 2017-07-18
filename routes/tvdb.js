//will need to call our token route here, get the token, and set it as a header in our api call
//now that we have token, just need keystrokes (probably need to nest our api calls)
var express = require('express');
var router = express.Router();
var request = require('superagent');


router.post('/tvdb', function (req, res, next) {
  //get our token (this will run on startup, need to put it in the router.get, then next the tvdb call)
  request
    .post("https://api.themoviedb.org/3/search/tv?api_key=" + req.app.get('tmdbkey') + "&language=en-US&query=" + req.body.keystroke)
    .set('Accept', 'application/json')
    .end(function (err, response) {
      if (err || response.status != 200) {
        return null;
      } else {
        if (response.body.results[0] === undefined) {
          console.log("problem");
          return null;
        }
        let resultItems = response.body.results.map((show, index) => {
          // TODO: cleanup not found results here 
          return { id: show.id, poster: show.poster_path, rating: show.vote_average, backdrop: show.backdrop_path, country: show.origin_country, orglanguage: show.original_language, show: show.name, overview: show.overview, year: show.first_air_date.substring(0,4)};
        });
        //service is expecting a json result, and we want it as one object, so send it back like so
        return res.json({ data: resultItems });
      }
    });
});

module.exports = router;