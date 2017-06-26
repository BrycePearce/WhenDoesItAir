import { Injectable } from '@angular/core'; //inject this service as a dependency
import { Http, Headers } from '@angular/http'; //http module to make requests to our api, Headers to manipulate headers
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
  constructor(private http: Http) {
    console.log("Task service initialized...");
  }
  //get our result for each keystroke, return it as an observable (json)
  getResults(){
    return this.http.get('http://localhost:8080/api/tvdb')
          .map(res => res.json());
  }
}