// this will be our landing page
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TitleService } from '../../services/title.service';
//import * as  particlesJS from 'particles.js';
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

  constructor(private TaskService: TaskService, private TitleService: TitleService) { // providers inject our taskService/TitleService into our LandingPage, normally we'd put this in the router area as a provider?
  }

  ngOnInit(): void {
    // particles
     particlesJS.load('particles-js', 'particles.json', null);

    // for placeholder text
    this.backgroundPlaceholder = this.TitleService.getBackdrop()
    document.body.style.background = "url(" + this.backgroundPlaceholder.info.name + ")";
  }

  // send our keystroke to our addKey service, which returns our results
  getKey(keystroke) {
    this.TaskService.addKey(keystroke)
      .subscribe(res => {
        this.shows = res.data.splice(0,6);
      });
  }
  // set the show value
  setTitle(tmdbDetails) {
    this.TitleService.setTitle(tmdbDetails);
  }
    // set the backdrop value
  setBackground(backdrop) {
    this.TitleService.setBackground(backdrop);
  }
}