import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup } from '@angular/forms';
import { FindMovieService } from 'src/app/services/find-movie.service';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  query: string;
  currentUser: any;
  currentUserID: number;
  navForm: FormGroup;

    constructor (
        public findMovieService: FindMovieService,
        private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.userService.findLoggedUser().subscribe((jsonObject: User) => {
          this.currentUserID = jsonObject.id;
        });
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
