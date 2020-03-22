import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsers(): Observable<any>{
    let url = "http://localhost:8200/admin/getUsers";
    return this.httpClient.get<any>(url, {withCredentials : true})
      .pipe();
  }

  banUser(userName: string): Observable<any>{
    let url = "http://localhost:8200/admin/ban?userName=" + userName;
    return this.httpClient.put<any>(url, userName, {withCredentials : true})
      .pipe();
  }
}
