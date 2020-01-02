import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPopularMovies(page: number): Observable<any> {
    let url = "http://localhost:8200/movies/popular?page=" + page;
    return this.httpClient.get<any>(url)
      .pipe();
  }

  getBestMovies(page: number): Observable<any> {
    let url = "http://localhost:8200/movies/best?page=" + page;
    return this.httpClient.get<any>(url)
      .pipe();
  }

  getMovie(id: number): Observable<any> {
    let url = "http://localhost:8200/movie/get";
    url += "?id=" + id;
    return this.httpClient.get<any>(url)
      .pipe();
  }

  getMovieNYTReview(title: string): Observable<any> {
    let url = "http://localhost:8200/movie/get/reviews/nyt";
    url += "?title=" + title;

    return this.httpClient.get<any>(url).pipe();
  }

  getMovieGuardianReview(title: string): Observable<any> {
    let url = "http://localhost:8200/movie/get/reviews/guardian";
    url += "?title=" + title;

    return this.httpClient.get<any>(url).pipe();
  }

  getMovieByQuery(query: string): Observable<any> {
    let url = 'http://localhost:8200/movie/get/search';
    url += '?query=' + query;
    return this.httpClient.get<any>(url)
      .pipe();
  }

}
