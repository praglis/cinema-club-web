import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { from } from 'rxjs';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieCardComponent } from './components/home/movie-card/movie-card.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { BestMoviesComponent } from './components/bestmovies/bestmovies.component';
import { PopularMoviesComponent } from './components/popularmovies/popularmovies.component';
import { UserModule } from './components/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    BestMoviesComponent,
    PopularMoviesComponent,
    MainLayoutComponent,
    NavbarComponent,
    MovieCardComponent,
    HomeComponent,
    MyProfileComponent,
    UserModule
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
