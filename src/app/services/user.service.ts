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

  findLoggedUser(): Observable<any> {
    const url = 'http://localhost:8200/user';
    return this.httpClient.get<any>(url, { withCredentials: true }).pipe();
  }

  updateProfile(user): Observable<any> {
    const url = 'http://localhost:8200/user/update';
    return this.httpClient.post(url, user, { withCredentials: true });
  }

  getAllUsers(): Observable<any> {
    const url = 'http://localhost:8200/getUsers';
    return this.httpClient.get<any>(url, { withCredentials: true })
      .pipe();
  }
}
