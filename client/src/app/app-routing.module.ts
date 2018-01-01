import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landingpage/landingpage.component';
import { ResultPageComponent } from './components/resultpage/resultpage.component';

import { TitleService } from './services/title.service';

const routes: Routes = [

  { path: '', component: LandingPageComponent },
  {
    path: 'details/:id', component: ResultPageComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TitleService]
})
export class AppRoutingModule { }
