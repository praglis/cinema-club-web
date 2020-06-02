import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../interfaces/user.interface";
import {Badge} from "../interfaces/badge.interface";
import {SingleMovieResult} from "../interfaces/singlemovie.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  findLoggedUser(): Observable<User> {
    const url = 'http://localhost:8200/user';
    return this.httpClient.get<User>(url, {withCredentials: true}).pipe();
  }

  updateProfile(user) {
    const url = 'http://localhost:8200/user/update';
    return this.httpClient.post<any>(url, user, {withCredentials: true})
      .pipe();
  }

  getAllUsers(): Observable<any> {
    const url = 'http://localhost:8200/users';
    return this.httpClient.get<any>(url, {withCredentials: true})
      .pipe();
  }

  checkIfUserIsLogged(): Observable<any> {
    const url = 'http://localhost:8200/check';
    return this.httpClient.get<boolean>(url, {withCredentials: true})
      .pipe();
  }

  getRecommendation(type: string, page: string): Observable<any> {
    const url = 'http://localhost:8200/user/preferences?type=' + type + "&page=" + page;
    return this.httpClient.get<any>(url, {withCredentials: true}).pipe();
  }

  refreshPreferences() {
    const url = 'http://localhost:8200/user/preferences/refresh'
    return this.httpClient.post<any>(url, '', {withCredentials: true}).pipe();
  }

  getUserBadge(name: string): Observable<Badge> {
    const url = 'http://localhost:8200/badge?userName=' + name;
    return this.httpClient.get<Badge>(url, {withCredentials: true}).pipe();
  }

  isAdminUser(): Observable<boolean> {
    let url = "http://localhost:8200/isAdmin";
    return this.httpClient.get<boolean>(url, {withCredentials: true}).pipe();
  }

  sendQuestionaireResults(movies) {
    const url = 'http://localhost:8200/user/questionnaire';
    return this.httpClient.post<any>(url, movies, { withCredentials: true })
      .pipe();
  }

}
