import { Component, OnInit, Injectable, Input, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { SingleMovieResult } from 'src/app/interfaces/singlemovie.interface';
import { MoviesList } from 'src/app/interfaces/movieslist.interface';
import { FindMovieService } from 'src/app/services/find-movie.service';

@Component({
  selector: 'app-find-movie',
  templateUrl: './find-movie.component.html',
  styleUrls: ['./find-movie.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class FindMovieComponent implements OnInit, DoCheck {

  constructor(
    private router: Router,
    public findMovieService: FindMovieService,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService) { }

  movies: SingleMovieResult[] = [];
  query: string;

  ngOnInit() {
    this.query = this.findMovieService.query;
    this.activatedRoute.queryParams.subscribe(params => {
      this.smoothScrollToTop();
      this.getMoviesObserver(this.query).subscribe((jsonObject: MoviesList) => {
        this.movies = (jsonObject as MoviesList).results;

      });
    }
    );
  }

  ngDoCheck() {
    if (this.query !== this.findMovieService.query || typeof this.query === undefined) {
      this.query = this.findMovieService.query;
      this.getMoviesObserver(this.query).subscribe((jsonObject: MoviesList) => {
        this.movies = (jsonObject as MoviesList).results;
      });
    }
  }

  private smoothScrollToTop() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 200); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  private getMoviesObserver(query: string) {
    return this.movieService.getMovieByQuery(query);
  }
}
