import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BestMoviesComponent } from './components/bestmovies/bestmovies.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { PopularMoviesComponent } from './components/popularmovies/popularmovies.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/authGuard';
import { VerificationComponent } from './components/verification/verification.component';

const routes: Routes = [
  { path: 'movies/best', component: BestMoviesComponent },
  { path: 'movies/popular', component: PopularMoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: VerificationComponent},
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
    ], canActivate: [AuthGuard]
  },
  { path: 'home', component: MainLayoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
