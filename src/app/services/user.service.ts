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

  updateProfile(user) {
    const url = 'http://localhost:8200/user/update';
    return this.httpClient.post<any>(url, user, { withCredentials: true })
      .subscribe();
  }

  getAllUsers(): Observable<any> {
    const url = 'http://localhost:8200/getUsers';
    return this.httpClient.get<any>(url, { withCredentials: true })
      .pipe();
  }

  checkIfUserIsLogged(): Observable<any> {
    const url = 'http://localhost:8200/check';
    return this.httpClient.get<boolean>(url, { withCredentials: true })
      .pipe();
  }

  getRecommendation(type: string, page: string): Observable<any> {
    const url = 'http://localhost:8200/user/preferences?type=' + type + "&page=" + page;
    return this.httpClient.get<any>(url, { withCredentials: true }).pipe();
  }
}
