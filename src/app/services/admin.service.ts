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

  banUser(userName: string): Observable<any>{
    let url = "http://localhost:8200/admin/ban?userName=" + userName;
    return this.httpClient.put<any>(url, userName, {withCredentials : true})
      .pipe();
  }
}
