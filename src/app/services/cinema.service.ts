import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CinemaInterface} from '../interfaces/cinema.interface';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getCinema(cinemaQuery: any): Observable<any> {
    let url = 'http://localhost:8200/cinema/find?';

    Object.keys(cinemaQuery).forEach((key: string) => {
      if (cinemaQuery[key] !== undefined) {
        url += key + '=' + cinemaQuery[key] + '&';
      }
    });

    if (url[-1] === '&') {
      url = url.substring(0, url.length - 1);
    }

    return this.httpClient.get<CinemaInterface[]>(url, {withCredentials: true})
      .pipe();
  }
}
