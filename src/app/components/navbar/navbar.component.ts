import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {FindMovieService} from 'src/app/services/find-movie.service';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user.interface';
import {MoviesList} from 'src/app/interfaces/movieslist.interface';
import {SingleMovieResult} from 'src/app/interfaces/singlemovie.interface';
import {MovieService} from 'src/app/services/movie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  query: string;
  currentUser: any;
  currentUserID: number;
  hintedMovies: SingleMovieResult[] = [];

  constructor(
    public findMovieService: FindMovieService,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private movieService: MovieService
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

  saveQuery() {
    this.findMovieService.query = this.query;
  }

  prepareHints() {
    if (this.query.length > 3) {
      this.saveQuery();
      this.getMoviesObserver(this.query).subscribe((jsonObject: MoviesList) => {
        this.hintedMovies = (jsonObject as MoviesList).results;
      });
    } else {
      this.hintedMovies = null;
    }
  }

  private getMoviesObserver(query: string) {
    return this.movieService.getMovieByQuery(query);
  }
}
