//every angular 2 application has a core app component
//this will be our landing page
import { Component } from '@angular/core';
import { TaskService } from './services/task.service'; //task.service.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService]
})
export class AppComponent {
  title = 'WhenDoesItAir';
  keystroke: string;
  keystrokeRes: string;

  constructor(private TaskService: TaskService) { //inject our taskService into our AppComponent
    this.TaskService.getResults() //reference our function in task.service.ts to get our keystroke api call result
      .subscribe(res => {
        console.log("getResults call in app.component.ts");
        console.log(res);
      });
  }

  getResults(event) {
    //event.preventDefault(); // so it won't submit
    console.log(event);
    let newKeystroke = {
      keystroke: this.keystroke
    }

    this.TaskService.addKey(newKeystroke)
    .subscribe(key => {
      this.keystroke = key;
    });
  }

}