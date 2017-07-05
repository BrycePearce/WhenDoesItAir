import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LandingPage } from './components/landingpage/landingpage.component';
import { ResultPage } from './components/resultpage/resultpage.component';

import { TitleService } from './services/title.service';

const routes: Routes = [
  { path: '', component: LandingPage },
  {
    path: 'details/:id', component: ResultPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TitleService]
})
export class AppRoutingModule { }