import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GreetingComponent } from './components/greeting/greeting.component';
import { BestMoviesComponent } from './components/bestmovies/bestmovies.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { PopularMoviesComponent } from './components/popularmovies/popularmovies.component';
import { MovieComponent } from './components/movie/movie.component';

const routes: Routes = [
  { path: 'greeting', component: GreetingComponent },
  { path: 'movies/best', component: BestMoviesComponent },
  { path: 'movies/popular', component: PopularMoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
