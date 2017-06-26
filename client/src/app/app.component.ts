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
  constructor(private TaskService: TaskService) { //inject our taskService into our AppComponent
    this.TaskService.getResults() //reference our function in task.service.ts to get our api call result
      .subscribe(res => {
        console.log(res);
       });
  }
  title = 'WhenDoesItAir';
  keystroke = '';
}