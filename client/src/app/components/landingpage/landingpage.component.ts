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
  header = 'WhenDoesItAir';
  keystroke: string;
  shows = [];
  placeholderText: string;
  backgroundPlaceholder: object;

  constructor(private TaskService: TaskService, private TitleService: TitleService) { // providers inject our taskService/TitleService into our LandingPage, normally we'd put this in the router area as a provider?
  }

  ngOnInit(): void {
    //particles
    particlesJS.load('particles-js', 'particles.json', null);

    //for placeholder text
    this.backgroundPlaceholder = this.TitleService.getBackdrop()
  }

  // send our keystroke to our addKey service, which returns our results
  getKey(keystroke) {
    this.TaskService.addKey(keystroke)
      .subscribe(res => {
        this.shows = res.data;
      });
  }
  // set the show value
  setTitle(tmdbDetails) {
    this.TitleService.setTitle(tmdbDetails)
  }
}