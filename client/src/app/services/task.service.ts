import { Injectable } from '@angular/core'; // inject this service as a dependency
import { Http, Headers } from '@angular/http'; // http module to make requests to our api, Headers to manipulate headers
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
  constructor(private http: Http) {
  }
  // add the new keystrokes from getResults() in app.component.ts, make api call to get results
  // post our newkeystroke to our tbdb route to query
  addKey(keystroke): Observable<any> { // todo: change this to an http request, as it is best practice, instead of fetch
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let poster;

    const query = 'https://api.themoviedb.org/3/search/tv?api_key=';
    return this.http.get(query + 'f016113c794da0ca4fc69f2cbeaca136' + '&language=en-US&query=' + keystroke)
      .map(show => {
        const res = show.json();
        // grab the items we want from the response
        const resultItems = res.results.map((show2, index) => {
          if (res.results[index].poster_path) {
            poster = 'https://image.tmdb.org/t/p/w92/' + res.results[index].poster_path;
          } else { poster = '../../../assets/posternotfound.png'; }
          return {
            id: show2.id,
            poster: poster,
            rating: show2.vote_average,
            backdrop: show2.backdrop_path,
            country: show2.origin_country,
            orglanguage: show2.original_language,
            show: show2.name,
            overview: show2.overview,
            year: show2.first_air_date.substring(0, 4)
          };
        });
        // return our newly formed object
        return { data: resultItems }
      });
  }

  selectShow(id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('attempting to POST to /episode');
    return this.http.post('http://localhost:8080/api/episode', { tmdbId: id }, { headers: headers })
      .map(res => res.json());
  }

  tvdbDetails(tvdbId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/api/tvdbDetails', { tvdbId: tvdbId }, { headers: headers })
      .map(res => res.json());
  }

  // tmdb details for external load
  tmdbDetails(tmdbId) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // keystroke here is going to be our req.body data in the recieving route
    return this.http.post('http://localhost:8080/api/tmdb', { tmdbId: tmdbId }, { headers: headers })
      .map(res => res.json());
  }
}