import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

//import { Session } from './session.model';
//import { SessionService } from './session.service';


// this gives us the name of the clicked show, which we send to TitleResolver
@Injectable()
export class TitleService {
  title: string = "";

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

}