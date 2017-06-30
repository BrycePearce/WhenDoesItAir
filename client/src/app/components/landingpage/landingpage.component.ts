//every angular 2 application has a core app component
//this will be our landing page
import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service'; //task.service.ts
@Component({
  selector: 'landing-page',
  templateUrl: './landingpage.component.html',
  providers: [TaskService]
})
export class LandingPage {
  header = 'WhenDoesItAir';
  keystroke: string;
  shows = [];

  constructor(private TaskService: TaskService) { //inject our taskService into our LandingPage
  }

  getKey(keystroke) {
    //send our keystroke to our addKey service, which returns our results
    this.TaskService.addKey(keystroke)
      .subscribe(res => {
        this.shows = res.data;
      });
  }

  selectShow(id) {
    console.log("The show you selected has an id of " + id);
  }
}