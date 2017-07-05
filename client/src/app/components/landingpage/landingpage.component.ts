//this will be our landing page
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service'; //task.service.ts
import { TitleService } from '../../services/title.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landingpage.component.html',
  providers: [TaskService]
})

export class LandingPage {
  header = 'WhenDoesItAir';
  keystroke: string;
  shows = [];
  title = "";

  constructor(private TaskService: TaskService, private TitleService: TitleService) { //providers inject our taskService/TitleService into our LandingPage, normally we'd put this in the router area as a provider?
  }


  getKey(keystroke) {
    //send our keystroke to our addKey service, which returns our results
    this.TaskService.addKey(keystroke)
      .subscribe(res => {
        this.shows = res.data;
      });
  }
  // set the show value
  setTitle(show) {
    this.TitleService.setTitle(show)
  }
}