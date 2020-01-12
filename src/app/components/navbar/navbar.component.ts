import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { FindMovieService } from 'src/app/services/find-movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  query: string;
  currentUser: any;
  navForm: FormGroup;

    constructor(
        public findMovieService: FindMovieService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  get navFormControls() { return this.navForm.controls; }

  saveQuery() {
    this.findMovieService.query = this.query;
  }
}
