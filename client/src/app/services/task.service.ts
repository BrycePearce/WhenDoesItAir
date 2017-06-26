import { Injectable } from '@angular/core'; //inject this service as a dependency
import { Http, Headers } from '@angular/http'; //http module to make requests to our api, Headers to manipulate headers
import 'rxjs/add/operator/map';
@Injectable()
export class TaskService {
  constructor(private http: Http) {
    console.log("Task service initialized...");
  }
  //use this for something else
  getResults() {
    console.log("getResults in task.service.ts");
    return this.http.get('http://localhost:8080/api/tvdb')
      .map(res => res.json());
  }
  //add the new keystrokes from getResults() in app.component.ts, make api call to get results
  addKey(newKey) {
    console.log("addKey" + newKey.keystroke);
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://localhost:3000/api/tvdb", JSON.stringify(newKey), {headers: headers})
      .map(res => res.json());
  }
}