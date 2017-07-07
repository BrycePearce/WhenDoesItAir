import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

//import { Session } from './session.model';
//import { SessionService } from './session.service';


// this gives us the name of the clicked show, which we send to TitleResolver
@Injectable()
export class TitleService {
  tmdbDetails: Object = [];

  setTitle(tmdbDetails) {
    this.tmdbDetails = tmdbDetails;
  }

  getTitle() {
    return this.tmdbDetails;
  }

  getBackdrop() {
    const backgrounds = [
      { name: "Bob's Burgers", image: 'https://image.tmdb.org/t/p/w1920/uFR8WVPh1eynE3TyzIo2b4ndd4r.jpg' },
      { name: 'Mr. Robot', image: 'https://image.tmdb.org/t/p/w1920/toZQ9IN51cQMzy6fruBZ6024No3.jpg' },
      { name: 'Silicon Valley', image: 'https://image.tmdb.org/t/p/w1920/8vk5R31KG5UQTAwTVEBxn65NSB.jpg' },
      { name: 'Steven Universe', image: 'https://image.tmdb.org/t/p/w1920/yN92gZjw4hxWOPzkWrOXMlDesP2.jpg' },
      { name: 'My Hero Academia', image: 'https://image.tmdb.org/t/p/w1920/wokDQZwuY7VxKQ8vbANh4nJrKTi.jpg' },
      { name: 'Game of Thrones', image: 'https://image.tmdb.org/t/p/w1920/kdV0qUQYczM3eL82q4pIgP51lNT.jpg' },
      { name: 'House of Cards', image: 'https://image.tmdb.org/t/p/w1920/3RognQsjLyE50cy5VMo28auGe9q.jpg' },
      { name: 'The Walking Dead', image: 'https://image.tmdb.org/t/p/w1920/zYFQM9G5j9cRsMNMuZAX64nmUMf.jpg' },
      { name: 'Stranger Things', image: 'https://image.tmdb.org/t/p/w1920/6c4weB3UycHwPgzv31Awt7nku9y.jpg' },
      { name: 'Rick and Morty', image: 'https://image.tmdb.org/t/p/w1920/pfTlxypaLQ8KHecKrD7EFcAzEUs.jpg' },
      { name: "Marvel's Luke Cage", image: 'https://image.tmdb.org/t/p/w1920/jM31AtkE5QEfateaLXjc0gkY8Ih.jpg' },
      { name: 'Doctor Who', image: 'https://image.tmdb.org/t/p/w1920/tQkigP2fItdzJWvtIhBvHxgs5yE.jpg' },
      { name: 'Westworld', image: 'https://image.tmdb.org/t/p/w1920/45rk1PQjiTvEPzi0yBfYl0bdzz3.jpg' },
      { name: 'Better Call Saul', image: 'https://image.tmdb.org/t/p/w1920/ljik3PqnobCL9fNYJRrDD8eTuFe.jpg' },
      { name: 'The Flash', image: 'https://image.tmdb.org/t/p/w1920/9NzRllYCJyvn8SUnif6HyHPvLNH.jpg' }
    ];

    const index = Math.floor(Math.random() * (backgrounds.length - 1 - 0) + 0);
    let nameBackground = {
      info:
      {
        name: backgrounds[index].image,
        placeholderText: backgrounds[index].name
      }
    }
    return nameBackground;
  }

}