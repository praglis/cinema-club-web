import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CinemaInterface } from '../interfaces/cinema.interface';
import { RateInterface } from '../interfaces/rate.interface';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getCinema(cinemaQuery: any, orderBy: string): Observable<any> {
    let url = 'http://localhost:8200/cinema/find?';

    Object.keys(cinemaQuery).forEach((key: string) => {
      if (cinemaQuery[key] !== undefined) { url += key + '=' + cinemaQuery[key] + '&'; }
    });
    if (orderBy !== undefined) {
      url += "orderBy=" + orderBy;
    }

    if (url[-1] === '&') { url = url.substring(0, url.length - 1); }

    return this.httpClient.get<CinemaInterface[]>(url, { withCredentials: true })
      .pipe();
  }

  postRate(id: number, rate: RateInterface): Observable<any> {
    let url = 'http://localhost:8200/cinema/' + id + '/rate';
    return this.httpClient.post<any>(url, rate, { withCredentials: true }).pipe();
  }

  getCinemaById(cinemaId: number): Observable<CinemaInterface> {
    let url = 'http://localhost:8200/cinema/' + cinemaId;
    return this.httpClient.get<CinemaInterface>(url, { withCredentials: true })
      .pipe();
  }

  // getPremieres(cinemaId: string): Observable<any> {
  //   const url = 'http://localhost:8200/' + cinemaId + '/premiers';
  //   return this.httpClient.get<any>(url)
  //     .pipe();
  // }
}
