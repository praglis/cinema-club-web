import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(user) {
    console.log(user);
    return this.http.post(`http://localhost:8200/register`, user, { withCredentials: true });
  }
}
