import { OnInit, Component, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesList } from '../interfaces/movieslist.interface';
import { SingleMovieResult } from '../interfaces/singlemovie.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'best-movies',
    templateUrl: './bestmovies.component.html',
    styleUrls: ['./bestmovies.component.css']
  })
@Injectable({
providedIn: 'root'
})
export class BestMoviesComponent implements OnInit {

  @Input() movies: SingleMovieResult[];
  @Input() actualPage: number; 
  @Input() prevPage: number;
  @Input() nextPage: number; 
  @Input() lastPage: number; 
  @Input() indices: number[]; 

  constructor(private httpClient: HttpClient,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let requestedPageNo : number;

    this.activatedRoute.queryParams.subscribe(params => {
      requestedPageNo = params['page'];
      if(requestedPageNo == null) {
        requestedPageNo = 1; 
      }
    });

    this.httpClient.get('http://localhost:8200/movies/best?page=' + requestedPageNo)
    .subscribe((data: any) => {
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