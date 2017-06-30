import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../services/task.service'; //task.service.ts

//import { AppComponent } from '../../app.component';
@Component({
  //how we select this component
  selector: 'result-page',
  //our html for this component
  templateUrl: './resultpage.component.html',
  providers: [TaskService]
})
export class ResultPage implements OnInit {
  id: number;
  sub: any;
  episodeInfo = [];


  constructor(
    private route: ActivatedRoute, // for our route params
    private TaskService: TaskService  //inject our taskService into our LandingPage
  ) { }



  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      // In a real app: dispatch action to load the details here.
    });
    //send our id to our selectShow service, which returns our results
    this.TaskService.selectShow(this.id)
      .subscribe(res => {
        this.episodeInfo = res.data;
      });
  }
}
