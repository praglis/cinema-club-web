import {Component, Input, OnInit} from '@angular/core';
import {Genre} from "../../interfaces/genre.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../services/authentication.service";
import {FindMovieService} from "../../services/find-movie.service";
import {Genres} from "../../interfaces/genres.interface";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SingleMovieResult} from "../../interfaces/singlemovie.interface";
import {MovieSearchCriteria} from "../../interfaces/movie.search.criteria.interface";
import {MoviesList} from "../../interfaces/movieslist.interface";

@Component({
  selector: 'app-discover-movies',
  templateUrl: './discover-movies.component.html',
  styleUrls: ['./discover-movies.component.css']
})
export class DiscoverMoviesComponent implements OnInit {

  movies: SingleMovieResult[];
  genres: Genre[];
  registerForm: FormGroup;
  searchCriteria: MovieSearchCriteria = null;
  loading = false;

  actualPage: number;
  prevPage: number;
  nextPage: number;
  lastPage: number;
  indices: number[];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private movieService: MovieService,
              private userService: UserService,
              private findMovieService: FindMovieService,
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
    this.findMovieService.getGenres().subscribe((value: Genres) => {
      this.genres = value.genres;
    });

    this.registerForm = this.formBuilder.group({
      genreID: ['',],
      yearFrom: ['',],
      yearTo: ['',],
      voteFrom: ['',],
      page: ['1',]
    });
  }

  onSubmit() {
    this.loading = true;
    this.convertToCriteriaValues(this.registerForm.value);
    this.movieService.getMoviesByCriteria(this.searchCriteria).subscribe((result: MoviesList) => {
      this.movies = result.results;

      this.actualPage = result.page;
      this.lastPage = result.total_pages;

      this.prevPage = this.actualPage - 1;
      this.nextPage = this.actualPage + 1;

      let firstIndex = this.actualPage - 2;
      let lastIndex = this.actualPage + 2;

      if (this.lastPage < 5) {
        firstIndex = this.actualPage - 1;
        lastIndex = this.actualPage + 1;
      }

      if (this.lastPage < 3) {
        firstIndex = 1;
        lastIndex = this.lastPage;
      }

      if (firstIndex < 1) {
        while (firstIndex < 1) {
          firstIndex++;
          lastIndex++;
        }
      }

      if (lastIndex > this.lastPage) {
        firstIndex--;
        lastIndex--;
      }

      this.indices = new Array(lastIndex - firstIndex + 1);
      for (var i = 0; i < lastIndex - firstIndex + 1; i++) {
        this.indices[i] = firstIndex + i;
      }
      this.loading = false;
    });
  }

  onPrevPage() {
    this.registerForm.value.page = this.actualPage - 1;
    this.onSubmit();
    window.scroll(0,0);
  }

  onNextPage() {
    this.registerForm.value.page = this.actualPage + 1;
    this.onSubmit();
    window.scroll(0,0);
  }

  onJumpPage(page: number) {
    this.registerForm.value.page = page;
    this.onSubmit();
    window.scroll(0,0);
  }

  convertToCriteriaValues(values) {
    this.searchCriteria = new class implements MovieSearchCriteria {
      genre = values.genreID;
      page = values.page;
      voteFrom = values.voteFrom;
      yearFrom = values.yearFrom;
      yearTo = values.yearTo;
    }
  }
}
