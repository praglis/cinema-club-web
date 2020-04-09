import { Component, OnInit } from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {SingleMovieResult} from "../../interfaces/singlemovie.interface";
import {FavouritesService} from "../../services/favourites.service";
import {MovieDetails} from "../../interfaces/moviedetails.interface";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-favourite-movies',
  templateUrl: './favourite-movies.component.html',
  styleUrls: ['./favourite-movies.component.css']
})
export class FavouriteMoviesComponent implements OnInit {

  favouriteMovies: SingleMovieResult[];
  userId: number;

  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private userService: UserService,
              private favouriteService: FavouritesService,
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
        this.movieService.getUserFavourites(user.id.toString())
          .subscribe((jsonObject: SingleMovieResult []) => {
            this.favouriteMovies = (jsonObject as SingleMovieResult []);
            this.userId = user.id;
          });
      });
    });
  }

  onRemoveMovieFromFavourites(movieTitle : string, movieUrl: string) {
    this.favouriteService.removeUserFavourite({
      "userId": this.userId,
      "movieTitle": movieTitle,
      "movieUrl": movieUrl
    }).subscribe((response) => {
      window.location.reload();
    })
  }
}
