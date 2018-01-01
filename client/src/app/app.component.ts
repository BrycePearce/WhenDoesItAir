import { Component, ViewEncapsulation } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // allows us to select the background of the whole app, and not this specific component.
})
export class AppComponent implements OnInit {
  tmdbpic = '../../assets/logofooter.png';

  constructor() { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'particles.json', null);
    const particles = document.getElementById('particles-js');
  }
}
