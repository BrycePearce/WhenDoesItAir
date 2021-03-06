import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../services/task.service'; // task.service.ts
import { TitleService } from '../../services/title.service';
import * as moment from 'moment';
import momentTimezone from 'moment-timezone';
@Component({
  // how we select this component
  selector: 'app-result-page',
  // our html for this component
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css'],
  providers: [TaskService]
})
export class ResultPageComponent implements OnInit {
  tmdbid: number;
  tvdbid: number;
  sub: any;
  airDate: string;
  episodesInfo = [];
  genre = [];
  actor = [];
  tmdbDetails: any;
  initPosterW = 'w92';
  tvdbId: string;
  tvdbInfo: any;
  tvdbRating: string;
  airday: string;
  airtime: string;
  contentRating: string;
  backdrop: string;
  tvdbImage = '../../../assets/icon.png';
  tmdbImage = '../../../assets/tmdb.png';
  poster: string;
  tmdbRating: string;
  overview: string;
  language: string;
  finalAirtime: string;
  tempAirDate: string;
  localReleaseTime: string;
  userTimezone: string;
  isLoading: boolean;
  constructor(
    private route: ActivatedRoute, // for our route params
    private TaskService: TaskService,  // inject our taskService into our LandingPage
    private TitleService: TitleService
  ) { this.isLoading = true; }

  ngOnInit(): void {
    if (!this.TitleService.getBackground().includes('undefined')) {
      this.backdrop = this.TitleService.getBackground();
      document.body.style.backgroundImage = 'url(' + this.backdrop + ')';
    }
    // set our data from the landingpage/service to our details object
    this.tmdbDetails = this.TitleService.getTitle();
    // change the width of our poster
    if (this.tmdbDetails.poster !== undefined && this.tmdbDetails.poster.includes(this.initPosterW)) {
      // tslint:disable-next-line:max-line-length
      // I make this.tmdbDetails just so I can access this property here. Super sloppy, remove this after appending to response noted in tmdb route
      this.poster = this.tmdbDetails.poster.replace('w92', 'w300');
    }
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
          this.backdrop = 'https://image.tmdb.org/t/p/w1280' + res.data.backdrop_path;
          document.body.style.backgroundImage = 'url(' + this.backdrop + ')';
          this.tmdbDetails = res.data;
          this.poster = 'https://image.tmdb.org/t/p/w300/' + res.data.poster_path;
          this.tmdbRating = res.data.vote_average;
          this.overview = res.data.overview;
          this.language = res.data.original_language;
        });
    }
    // send our id to our selectShow service, which returns our results
    this.TaskService.selectShow(this.tmdbid)
      .subscribe(res => {
        this.tvdbId = res.tvdbId;
        const pastArray = [];
        const futureArray = [];

        this.episodesInfo = res.series;
        const now = moment().format('YYYY-MM-DD');
        this.episodesInfo.forEach(element => {
          if (moment(element.firstAired).isBefore(now)) {
            pastArray.push(element.firstAired);
          } else {
            futureArray.push(element.firstAired);
          }
        });
        this.tempAirDate = 'unknown';
        // temporary solution for blank first values
        if (futureArray[0] === '' || !futureArray[0]) {
          if (futureArray.length === 0) { this.airDate = 'No airtimes available.'; }
          for (let i = 1; i <= futureArray.length; i += 1) {
            if (futureArray[i] === '' || futureArray[i] === undefined || futureArray[i] === null) {
              this.airDate = 'No airtimes available.';
            } else {
              this.tempAirDate = futureArray[i];
              this.airDate = this.determineAirTime(this.tempAirDate, this.airday, this.airtime);
              break;
            }
          }
        } else {
          this.tempAirDate = futureArray[0];
          this.airDate = moment(futureArray[0]).endOf('day').fromNow();
        }

        this.TaskService.tvdbDetails(this.tvdbId)
          .subscribe(response => {
            this.isLoading = false;
            this.tvdbInfo = response.tvdbDetails;
            this.actor = response.actorInfo;
            this.genre = response.tvdbDetails.genre;
            this.airday = response.tvdbDetails.airsDayOfWeek;
            this.airtime = response.tvdbDetails.airsTime;
            this.finalAirtime = this.determineAirTime(this.tempAirDate, this.airday, this.airtime);
            this.localReleaseTime = this.localRelease(this.tempAirDate, this.airday, this.airtime);
            this.userTimezone = this.userTimezones();
          });
      });
  }

  // takes a name like 'some / name / here' or 'some | name | here'
  // returns only 'some'
  firstRole(roles) {
    if (roles.charAt(0) === '|') {
      roles = roles.slice(1);
    }

    if (roles.includes('/')) {
      return roles.split('/')[0].trim();
    } else {
      return roles.split('|')[0].trim();
    }
  }

  // determines relative airtime fromNow, using NY as the default
  determineAirTime(date, day, time) {
    let dateTime;
    if (date === 'unknown') {
      dateTime = 'No airtimes available.';
      return dateTime;
    }
    date = moment(date).format('MMMM Do YYYY');
    dateTime = date + ' ' + time;
    // create a moment object in the NY time zone
    let eastCoast = momentTimezone.tz(dateTime, 'MMM Do YYYY h:mmA', 'America/New_York');
    eastCoast = moment(eastCoast).fromNow();
    return eastCoast;
  }

  // Sets the release time for New York as the default airing time,
  // and then converts it to your local timezone.
  localRelease(date, day, time) {
    let dateTime;
    if (date === 'unknown') {
      dateTime = 'Unknown';
      return dateTime;
    }

    time = time.replace(/\s+/, '') // remove whitespace from time
    date = moment(date).format('MMMM Do YYYY');
    dateTime = date + ' ' + time;

    // create a moment object in the NY time zone
    let local = momentTimezone.tz(dateTime, 'MMM Do YYYY h:mmA', 'America/New_York');
    // switch to the target time zone and format back to a string
    local = local.local().format('MMM Do YYYY h:mmA');
    return local;
  }

  userTimezones() {
    return momentTimezone.tz.guess();
  }
}
