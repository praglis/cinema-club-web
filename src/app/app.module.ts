import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieCardComponent } from './components/home/movie-card/movie-card.component';
import { HomeComponent } from './components/home/home.component';
import { BestMoviesComponent } from './components/bestmovies/bestmovies.component';
import { PopularMoviesComponent } from './components/popularmovies/popularmovies.component';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    BestMoviesComponent,
    PopularMoviesComponent,
    MainLayoutComponent,
    NavbarComponent,
    MovieCardComponent,
    HomeComponent,
    MovieComponent
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
