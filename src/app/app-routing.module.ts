import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './components/movieslist/movieslist.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/authGuard';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { FindMovieComponent } from './components/find-movie/find-movie.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { LocationsComponent } from './components/locations/locations.component';
import { FavouriteMoviesComponent } from './components/favourite-movies/favourite-movies.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { PlanToWatchMoviesComponent } from './components/plan-to-watch-movies/plan-to-watch-movies.component';
import {DiscoverMoviesComponent} from './components/discover-movies/discover-movies.component';
import { CastComponent } from './components/cast/cast.component';
import { TopReviewsComponent } from './components/top-reviews/top-reviews.component';

const routes: Routes = [
  { path: 'movies', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'password', component: ChangePasswordComponent },
  { path: 'searchResult', component: FindMovieComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'regulation', component: RegulationsComponent },
  { path: 'help', component: HelpPageComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'preferences', component: PreferencesComponent },
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
  { path: 'my_profile', component: MyProfileComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'movies/favourite', component: FavouriteMoviesComponent },
  { path: 'movies/plan-to-watch', component: PlanToWatchMoviesComponent },
  { path: 'movies/discover', component: DiscoverMoviesComponent },
  { path: 'person/:id', component: CastComponent },
  { path: 'top-reviews', component: TopReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
