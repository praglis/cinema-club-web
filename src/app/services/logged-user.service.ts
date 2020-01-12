import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getLoggedUser(): Observable<any> {
    const url = 'http://localhost:8200/user';
    return this.httpClient.get<any>(url)
      .pipe();
  }
}
