import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {SingleMovieResult} from "../../interfaces/singlemovie.interface";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../interfaces/user.interface";
import {PlanToWatchService} from "../../services/plantowatch.service";

@Component({
  selector: 'app-plan-to-watch-movies',
  templateUrl: './plan-to-watch-movies.component.html',
  styleUrls: ['./plan-to-watch-movies.component.css']
})
export class PlanToWatchMoviesComponent implements OnInit {

  planToWatchMovies: SingleMovieResult[];
  userId: number;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private userService: UserService,
              private planToWatchService: PlanToWatchService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.userService.checkIfUserIsLogged().subscribe(res => {
      if (!res) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userService.findLoggedUser().subscribe((user : User) => {
        this.movieService.getUserPlanToWatch(user.id.toString())
          .subscribe((jsonObject: SingleMovieResult []) => {
            this.planToWatchMovies = (jsonObject as SingleMovieResult []);
            this.userId = user.id;
          });
      });
    });
  }

  onRemoveMovieFromList(movieTitle : string, movieUrl: string) {
    this.planToWatchService.removeUserPlanToWatch({
      "userId": this.userId,
      "movieTitle": movieTitle,
      "movieUrl": movieUrl
    }).subscribe((response) => {
      window.location.reload();
    })
  }
}
