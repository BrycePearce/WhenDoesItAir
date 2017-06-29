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
        console.log(":( " + response.status);
        return res.status(response.status).json({ status: response.status });
      } else {

        let resultItems = response.body.results.map((show, index) => {
          return { id: show.id, show: show.name };
        });
        //service is expecting a json result, and we want it as one object, so send it back like so
        return res.json({ data: resultItems });
      }
    });
});





/*
  //get our token (this will run on startup, need to put it in the router.get, then next the tvdb call)
  request
    .get("http://127.0.0.1:8080/api/token")
    .set('Accept', 'application/json')
    .end(function (err, response) {
      if (err || response.status != 200) {
        console.log(":(");
        // return res.status(response.status).json({ success: false, status: response.status });
      } else {
        console.log(response.body);
        console.log(":)" + response.body);
        //  return res.status(response.status).json({ token: response.body.token, status: response.status });
      }
    });
*/

module.exports = router;