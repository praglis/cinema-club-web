import { OnInit, Component, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleMovieResult } from '../../interfaces/singlemovie.interface';
import { MoviesList } from '../../interfaces/movieslist.interface';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
    selector: 'popular-movies',
    templateUrl: './popularmovies.component.html',
    styleUrls: ['./popularmovies.component.css']
  })
@Injectable({
providedIn: 'root'
})
export class PopularMoviesComponent implements OnInit {

    @Input() movies: SingleMovieResult[];
    @Input() actualPage: number; 
    @Input() prevPage: number;
    @Input() nextPage: number; 
    @Input() lastPage: number; 
    @Input() indices: number[]; 

    constructor(private activatedRoute: ActivatedRoute,
                private movieService: MovieService) { }

    ngOnInit() {
      let requestedPageNo : number;

      this.activatedRoute.queryParams.subscribe(params => {
        requestedPageNo = params['page'];
        if(requestedPageNo == null) {
          requestedPageNo = 1; 
        }
      });

      this.movieService.getPopularMovies(requestedPageNo).subscribe((data: any) => {
        let jsonObject: any = JSON.parse(JSON.stringify(data));
        this.movies = (<MoviesList>jsonObject).results;
        this.actualPage = (<MoviesList>jsonObject).page;
        this.lastPage = (<MoviesList>jsonObject).total_pages; 

        this.prevPage = this.actualPage - 1;
        this.nextPage = this.actualPage + 1;

        let firstIndex = this.actualPage - 2; 
        let lastIndex = this.actualPage + 2;

        if(this.lastPage < 5) {
          firstIndex = this.actualPage - 1;
          lastIndex = this.actualPage + 1; 
        }

        if(this.lastPage < 3) {
          firstIndex = 1; 
          lastIndex = this.lastPage;
        }

        if(firstIndex < 1) {
          while(firstIndex < 1) {
            firstIndex++;
            lastIndex++; 
          }
        }

        if(lastIndex > this.lastPage) {
          firstIndex--;
          lastIndex--; 
        }

        this.indices = new Array(lastIndex - firstIndex + 1); 
        for(var i = 0; i < lastIndex - firstIndex + 1; i++) {
          this.indices[i] = firstIndex + i; 
        }
      });
    }
}