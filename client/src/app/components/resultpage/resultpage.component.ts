import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../services/task.service'; //task.service.ts
import { TitleService } from '../../services/title.service';
import * as moment from 'moment';
//import { AppComponent } from '../../app.component';
@Component({
  //how we select this component
  selector: 'result-page',
  //our html for this component
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css'],
  providers: [TaskService] // *** todo: Find out if these should be here or in route stuff *** why does adding TitleService to this array break it?
})
export class ResultPage implements OnInit {
  tmdbid: number;
  tvdbid: number;
  sub: any;
  airDate: string;
  episodesInfo = [];
  title: string;

  constructor(
    private route: ActivatedRoute, // for our route params
    private TaskService: TaskService,  //inject our taskService into our LandingPage
    private TitleService: TitleService
  ) { }



  ngOnInit(): void {
    //set our title from our service value
   this.title = this.TitleService.getTitle();
    // grab our ID 
    this.sub = this.route.params.subscribe(params => {
      this.tmdbid = params['id'];
      // In a real app: dispatch action to load the details here.
    });

    //send our id to our selectShow service, which returns our results
    this.TaskService.selectShow(this.tmdbid)
      .subscribe(res => {
        console.log(res);
        let pastArray = [];
        let futureArray = [];
        let futureTimes = [];
        this.episodesInfo = res.series;
        let now = moment().format('YYYY-MM-DD');
        this.episodesInfo.forEach(element => {
          if (moment(element.firstAired).isBefore(now)) {
            pastArray.push(element.firstAired);
          } else {
            futureArray.push(element.firstAired);
          }
        });

        //temporary solution for blank first values
        if (futureArray[0] === "") {
          for (let i = 1; i <= futureArray.length; i += 1) {
            if (futureArray[i] !== "") {
              console.log(futureArray[i]);
              console.log("test");
              this.airDate = moment(futureArray[i]).endOf('day').fromNow();
              break;
            }
          }
        } else this.airDate = moment(futureArray[0]).endOf('day').fromNow();
        console.log(futureArray);
      });
  }
}
