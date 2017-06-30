import { Injectable } from '@angular/core'; //inject this service as a dependency
import { Http, Headers } from '@angular/http'; //http module to make requests to our api, Headers to manipulate headers
import 'rxjs/add/operator/map';
@Injectable()
export class TaskService {
  constructor(private http: Http) {
    console.log("Task service initialized...");
  }
  //add the new keystrokes from getResults() in app.component.ts, make api call to get results
  //post our newkeystroke to our tbdb route to query
  addKey(newKey) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //keystroke here is going to be our req.body data in the recieving route
    return this.http.post("http://localhost:8080/api/tvdb", { keystroke: newKey }, { headers: headers })
      .map(res => res.json());
  }

  selectShow(id) {
    console.log("select show being called");
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //keystroke here is going to be our req.body data in the recieving route
    return this.http.post("http://localhost:8080/api/episode", { tmdbId: id }, { headers: headers })
      .map(res => res.json());
  }
}