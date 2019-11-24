import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GreetingComponent } from './components/greeting/greeting.component';
import { BestMoviesComponent } from './components/bestmovies/bestmovies.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { PopularMoviesComponent } from './components/popularmovies/popularmovies.component';


const routes: Routes = [
  { path: 'greeting', component: GreetingComponent },
  { path: 'best', component: BestMoviesComponent },
  { path: 'popular', component: PopularMoviesComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },
  { path: 'home', component: MainLayoutComponent },
  { path: 'my_profile', component: MyProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
