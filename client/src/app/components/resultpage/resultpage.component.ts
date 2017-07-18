import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../services/task.service'; //task.service.ts
import { TitleService } from '../../services/title.service';
import * as moment from 'moment';
import momentTimezone from 'moment-timezone';
declare var particlesJS: any;
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
  genre = [];
  actor = [];
  characters = [];
  tmdbDetails: any;
  country = "";
  tvdbId: string;
  tvdbInfo: Object;
  tvdbRating: string;
  status: string;
  airday: string;
  airtime: string;
  contentRating: string;
  network: string;
  runtime: string;
  backdrop: string;
  tvdbImage: string;
  tmdbImage: string;
  poster: string;
  tmdbRating: string;
  overview: string;
  language: string;
  finalAirtime: string;
  tempAirDate: string;
  localReleaseTime: string;
  userTimezone: string;

  constructor(
    private route: ActivatedRoute, // for our route params
    private TaskService: TaskService,  //inject our taskService into our LandingPage
    private TitleService: TitleService
  ) { } 

  ngOnInit(): void {
    this.backdrop = this.TitleService.getBackground();
    document.body.style.background = "url(" + this.backdrop + ")";
    this.tvdbImage = '../../../assets/icon.png';
    this.tmdbImage = '../../../assets/tmdb.png';
    //set our data from the landingpage/service to our details object
    this.tmdbDetails = this.TitleService.getTitle();
    console.log(this.tmdbDetails);
    this.poster = this.tmdbDetails.poster; // I make this.tmdbDetails just so I can access this property here. Super sloppy, remove this when we append to response noted in tmdb route
    this.tmdbRating = this.tmdbDetails.rating; // same as above
    this.overview = this.tmdbDetails.overview; // ^
    this.language = this.tmdbDetails.orglanguage; // ^
    // grab our ID
    this.sub = this.route.params.subscribe(params => {
      this.tmdbid = params['id'];
      // In a real app: dispatch action to load the details here.
    });
    
    // handle external load
    if ((this.tmdbDetails && (Object.keys(this.tmdbDetails).length === 0))) {
    this.TaskService.tmdbDetails(this.tmdbid)
      .subscribe(res => {
        this.backdrop = "https://image.tmdb.org/t/p/w1920" + res.data.backdrop_path; 
        document.body.style.background = "url(" + this.backdrop + ")";
        particlesJS.load('particles-js', 'particles.json', null);
        this.tmdbDetails = res.data;
        this.poster = res.data.poster_path;
        this.tmdbRating = res.data.vote_average;
        this.overview = res.data.overview;
        this.language = res.data.original_language;
      });
    }
    //send our id to our selectShow service, which returns our results
    this.TaskService.selectShow(this.tmdbid)
      .subscribe(res => {
        this.tvdbId = res.tvdbId;
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
        this.tempAirDate = "unknown";
        //temporary solution for blank first values
        if (futureArray[0] === "" || !futureArray[0]) {
          if (futureArray.length === 0) { this.airDate = "No airtimes available.";}
          for (let i = 1; i <= futureArray.length; i += 1) {
            if (futureArray[i] === "" || futureArray[i] === undefined || futureArray[i] === null) {
              this.airDate = "No airtimes available.";
            } else {
              this.tempAirDate = futureArray[i];
              this.finalAirtime = this.determineAirTime(this.tempAirDate, this.airday, this.airtime);

              break;
            }
          }
        } else { 
          this.tempAirDate = futureArray[0];
          console.log("this is the string for fromNow " +  this.tempAirDate);
          this.airDate = moment(futureArray[0]).endOf('day').fromNow(); }


        this.tvdbInfo = this.TaskService.tvdbDetails(this.tvdbId)
          .subscribe(res => {
            this.tvdbInfo = res;
            this.genre = res.tvdbDetails.genre;
            this.actor = res.actorInfo;
            this.tvdbRating = res.tvdbDetails.siteRating;
            this.contentRating = res.tvdbDetails.rating;
            this.status = res.tvdbDetails.status;
            this.airday = res.tvdbDetails.airsDayOfWeek;
            this.airtime = res.tvdbDetails.airsTime;
            this.network = res.tvdbDetails.network;
            this.runtime = res.tvdbDetails.runtime;
            this.finalAirtime = this.determineAirTime(this.tempAirDate, this.airday, this.airtime);
            this.localReleaseTime = this.localRelease(this.tempAirDate, this.airday, this.airtime);
            this.userTimezone = this.userTimezones();

            console.log(this.finalAirtime);
          });
      });
  }

  // takes a name like 'some / name / here'
  // returns only 'some'
  firstRole(roles) {
    return roles.split('/')[0].trim();
  }

  // determines relative airtime fromNow, using NY as the default
  determineAirTime(date,day,time) {
    let dateTime;
    if (date === "unknown") {
      dateTime = "No airtimes available.";
      return dateTime;
    }
    time = time.replace(/\s+/, ""); // remove whitespace from time
    date = moment(date).format('MMMM Do YYYY');
    dateTime = date + " " + time;
    // create a moment object in the NY time zone
    let eastCoast = momentTimezone.tz(dateTime, 'MMM Do YYYY h:mmA', 'America/New_York');
    eastCoast = moment(eastCoast).fromNow();
   // eastCoast = eastCoast.format('MMM Do YYYY h:mmA');
   // console.log("after " + moment(eastCoast).fromNow());
    // valculate the time fromNow, from the eastCoast

    return eastCoast;
  }

  // Sets the release time for New York as the default airing time,
  // and then converts it to your local timezone.
  localRelease(date,day,time) {
    console.log("yee");
    console.log(date,day,time);
    let dateTime;
        if (date === "unknown") {
      dateTime = "Unknown";
      return dateTime;
    }
    
    time = time.replace(/\s+/, ""); // remove whitespace from time
    date = moment(date).format('MMMM Do YYYY');
    dateTime = date + " " + time;
    
    // create a moment object in the NY time zone
    let local = momentTimezone.tz(dateTime, 'MMM Do YYYY h:mmA', 'America/New_York');
    // switch to the target time zone and format back to a string
    local = local.local().format('MMM Do YYYY h:mmA');
    return local;
  }

  userTimezones () {
  return momentTimezone.tz.guess();
  }
}