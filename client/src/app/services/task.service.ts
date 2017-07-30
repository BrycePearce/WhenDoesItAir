import { Injectable } from '@angular/core'; //inject this service as a dependency
import { Http, Headers } from '@angular/http'; //http module to make requests to our api, Headers to manipulate headers
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
  constructor(private http: Http) {
    console.log("Task service initialized...");
  }
  //add the new keystrokes from getResults() in app.component.ts, make api call to get results
  //post our newkeystroke to our tbdb route to query
  addKey(keystroke): Observable<any> { // todo: change this to an http request, as it is best practice, instead of fetch
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let poster;

    const query = "https://api.themoviedb.org/3/search/tv?api_key=";
    return this.http.get(query + 'f016113c794da0ca4fc69f2cbeaca136' + '&language=en-US&query=' + keystroke)
      .map(show => {
        let res = show.json();
        // grab the items we want from the response
        let resultItems = res.results.map((show, index) => {
          if (res.results[index].poster_path) {
            poster = "https://image.tmdb.org/t/p/w92/" + res.results[index].poster_path;
          } else { poster = "../../../assets/posternotfound.png"; }

          return {
            id: show.id,
            poster: poster,
            rating: show.vote_average,
            backdrop: show.backdrop_path,
            country: show.origin_country,
            orglanguage: show.original_language,
            show: show.name,
            overview: show.overview,
            year: show.first_air_date.substring(0, 4)
          };
        });
        // return our newly formed object
        return { data: resultItems }
      });
  }

  selectShow(id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("attempting to POST to /episode"); // but it never gets sent
    return this.http.post("http://localhost:8080/api/episode", { tmdbId: id }, { headers: headers })
      .map(res => res.json());
  }

  tvdbDetails(tvdbId) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:8080/api/tvdbDetails", { tvdbId: tvdbId }, { headers: headers })
      .map(res => res.json());
  }

  // tmdb details for external load
  tmdbDetails(tmdbId) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //keystroke here is going to be our req.body data in the recieving route
    return this.http.post("http://localhost:8080/api/tmdb", { tmdbId: tmdbId }, { headers: headers })
      .map(res => res.json());
  }
}