import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  findById(id: string): Observable<any> {
    const url = 'http://localhost:8200/user/get?id=' + id;
    return this.httpClient.get<any>(url)
      .pipe();
  }

  findByUsername(username: string): Observable<any> {
    const url = 'http://localhost:8200/user/get?username=' + username;
    return this.httpClient.get<any>(url)
      .pipe();
  }
}
