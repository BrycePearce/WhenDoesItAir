import { Component } from '@angular/core';


//import * as  particlesJS from 'particles.js';

//declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  ngOnInit(): void {
    //particlesJS.load('particles-js', 'particles.json', null);

      console.log("yee");
var can = document.getElementById('particles-js');

  can.addEventListener('contextmenu', function(e) {
      console.log("test");
      if (e.button === 2) {
       e.preventDefault();
        return false;
      }
  }, false);
  }

}
