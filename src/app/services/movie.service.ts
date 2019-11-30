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
  
  getMovie(id: string): Observable<any> {
    let url = "http://localhost:8200/movies/get";
    url += "?id=" + id;
    return this.httpClient.get<any>(url)
      .pipe();
  }
}
