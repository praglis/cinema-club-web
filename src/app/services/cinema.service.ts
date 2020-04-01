import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CinemaInterface} from '../interfaces/cinema.interface';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCinema(query: string[]): Observable<any> {
  // getCinema(): Observable<CinemaInterface[]> {
    let url = 'http://localhost:8200/cinema/find?';
    if(query[0] !== '') {
      url += 'name=';
      query.forEach(function(value) {
        url += value + ' ';
      });
    }
    return this.httpClient.get<CinemaInterface[]>(url)
      .pipe();
  }

  // getPremieres(cinemaId: string): Observable<any> {
  //   const url = 'http://localhost:8200/' + cinemaId + '/premiers';
  //   return this.httpClient.get<any>(url)
  //     .pipe();
  // }
}
