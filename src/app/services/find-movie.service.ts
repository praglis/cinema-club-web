import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genres } from '../interfaces/genres.interface';

@Injectable({
  providedIn: 'root'
})
export class FindMovieService {
  public query: string;

  constructor(
    private httpClient: HttpClient
  ) { }

  getGenres(): Observable<Genres> {
    const url = 'http://localhost:8200/movie/get/genres';
    return this.httpClient.get<any>(url, { withCredentials: true }).pipe();
  }
}
