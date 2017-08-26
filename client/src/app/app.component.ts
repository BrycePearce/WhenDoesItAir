import { Component } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tmdbpic: string;

  ngOnInit(): void {
    this.tmdbpic = '../../assets/logofooter.png';
    particlesJS.load('particles-js', 'particles.json', null);
    let can = document.getElementById('particles-js');

    can.addEventListener('contextmenu', function (e) {
      if (e.button === 2) {
        e.preventDefault();
        return false;
      }
    }, false);
  }

}
