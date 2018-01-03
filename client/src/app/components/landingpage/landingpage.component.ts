// this will be our landing page
import { Component, ViewEncapsulation, } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TitleService } from '../../services/title.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css'],
  providers: [TaskService]
})

export class LandingPageComponent implements OnInit {
  keystroke: string;
  shows = [];
  placeholderText: string;
  backgroundPlaceholder: any;
  arrowkeyLocation = -1;

  constructor(private TaskService: TaskService, private TitleService: TitleService, public router: Router) {
  }

  ngOnInit(): void {
    this.backgroundPlaceholder = this.TitleService.getBackdrop();
    document.body.style.backgroundImage = 'url(' + this.backgroundPlaceholder.info.name + ')';

    this.placeholderText = this.backgroundPlaceholder.info.placeholderText;
  }

  // send our keystroke to our addKey service, which returns our results
  getKey(keystroke) {
    if (keystroke) {
      this.TaskService.addKey(keystroke)
        .subscribe(res => {
          this.shows = res.data.splice(0, 6);
        });
    }
  }
  // set the show value
  setTitle(tmdbDetails) {
    this.TitleService.setTitle(tmdbDetails);
  }
  // set the backdrop value
  setBackground(backdrop) {
    this.TitleService.setBackground(backdrop);
  }

  onBlurMethod() {
    return this.backgroundPlaceholder.info.placeholderText;
  }

  // Allow the user to navigate through the results with a keyboard
  keyDown(event: KeyboardEvent) {
    if (event.keyCode === 40 && this.arrowkeyLocation < this.shows.length - 1) {
      // Arrow Down
      this.arrowkeyLocation++;
    } else if (event.keyCode === 38 && this.arrowkeyLocation > 0) {
      // Arrow Up
      this.arrowkeyLocation--;
    } else if (event.keyCode === 13) { // Enter
      if (this.shows.length === 0) {
        return null;
      }
      if (this.arrowkeyLocation === -1) {
        this.router.navigate(['/details', this.shows[0].id]);
        this.arrowkeyLocation = -1;
      }
      if (this.shows[this.arrowkeyLocation] === undefined) {
        return null;
      }
      this.router.navigate(['/details', this.shows[this.arrowkeyLocation].id]);
      this.arrowkeyLocation = -1;
    }
  }
}
