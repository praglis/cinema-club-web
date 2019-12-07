import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
      return this.currentUserSubject.value;
  }

  login(username, password) {
      return this.http.post<any>(`http://localhost:8200/login`, { username, password }, {withCredentials: true})
          .pipe(map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  activeAccount(token, username) {
      let link = 'http://localhost:8200/verifyuser?'
      link += "token=" + token;
      link += "&username=" + username; 
      return this.http.get<any>(link)
      .pipe();
  }

  logout() {
      // remove user from local storage and set current user to null
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
