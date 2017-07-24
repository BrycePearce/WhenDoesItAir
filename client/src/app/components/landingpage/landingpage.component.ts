// this will be our landing page
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TitleService } from '../../services/title.service';
//import * as  particlesJS from 'particles.js';
import { Router } from '@angular/router';
declare var particlesJS: any;

@Component({
  selector: 'landing-page',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],

  providers: [TaskService]
})

export class LandingPage {
  keystroke: string;
  shows = [];
  placeholderText: string;
  backgroundPlaceholder: any;
  arrowkeyLocation = -1;

  constructor(private TaskService: TaskService, private TitleService: TitleService, public router: Router) { // providers inject our taskService/TitleService into our LandingPage, normally we'd put this in the router area as a provider?
  }

  ngOnInit(): void {
    // particles
    particlesJS.load('particles-js', 'particles.json', null);

    // for placeholder text
    this.backgroundPlaceholder = this.TitleService.getBackdrop()
    document.body.style.background = "url(" + this.backgroundPlaceholder.info.name + ")";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
  }

  // send our keystroke to our addKey service, which returns our results
  getKey(keystroke) {
    if (keystroke) {
      this.TaskService.addKey(keystroke)
        .subscribe(res => {
          this.shows = res.data.splice(0, 6);
        });
    }
  }
  // set the show value
  setTitle(tmdbDetails) {
    this.TitleService.setTitle(tmdbDetails);
  }
  // set the backdrop value
  setBackground(backdrop) {
    this.TitleService.setBackground(backdrop);
  }

  keyDown(event: KeyboardEvent) {
    if (event.keyCode === 40 && this.arrowkeyLocation < this.shows.length - 1) {
      // Arrow Down
      this.arrowkeyLocation++;
    } else if (event.keyCode === 38 && this.arrowkeyLocation > 0) {
      // Arrow Up
      this.arrowkeyLocation--;
    } else if (event.keyCode === 13) { // Enter
      if (this.arrowkeyLocation === -1) {
        this.router.navigate(['/details', this.shows[0].id]);
      }
      if (this.shows[this.arrowkeyLocation] === undefined) {
        return null;
      }
      this.router.navigate(['/details', this.shows[this.arrowkeyLocation].id]);
    }
  }
}