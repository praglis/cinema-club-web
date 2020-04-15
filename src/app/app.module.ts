import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieCardComponent } from './components/home/movie-card/movie-card.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MoviesListComponent } from './components/movieslist/movieslist.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './helpers/interceptor';
import { ErrorInterceptor } from './helpers/errorInterceptor';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { FindMovieComponent } from './components/find-movie/find-movie.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RegulationsComponent } from './components/regulations/regulations.component';
import { HelpPageComponent } from './components/help-page/help-page.component';
import { LocationsComponent } from './components/locations/locations.component';
import { MapComponent } from './components/locations/map/map.component';
import { FavouriteMoviesComponent } from './components/favourite-movies/favourite-movies.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { BugReportComponent } from './components/bug-report/bug-report.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    MainLayoutComponent,
    NavbarComponent,
    MovieCardComponent,
    HomeComponent,
    MyProfileComponent,
    MovieComponent,
    LoginComponent,
    RegisterComponent,
    VerificationComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    AdminPageComponent,
    FindMovieComponent,
    FooterComponent,
    PrivacyComponent,
    RegulationsComponent,
    HelpPageComponent,
    LocationsComponent,
    MapComponent,
    FavouriteMoviesComponent,
    PreferencesComponent,
    BugReportComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    MatDialogModule
  ],
  entryComponents: [
    BugReportComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
