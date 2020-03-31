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

  // findLoggedUser(): Observable<any> {
  //   const url = 'http://localhost:8200/user';
  //   return this.httpClient.get<any>(url)
  //     .pipe();
  // }

  findLoggedUser(): Observable<any> {
    const url = 'http://localhost:8200/user';
    return this.httpClient.get<any>(url,  {withCredentials: true}).pipe();
  }

  getAllUsers(): Observable<any>{
    let url = 'http://localhost:8200/getUsers';
    return this.httpClient.get<any>(url, {withCredentials : true})
      .pipe();
  }
}
