import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpClient: HttpClient
  ) { }

  reportBug(bugReport) {
    console.log('bugReport:', bugReport)
    const url = 'http://localhost:8200/report/bug';
    return this.httpClient.post<any>(url, bugReport, { withCredentials: true })
      .subscribe();
  }

  reportUser(username) {
    const url = 'http://localhost:8200/report/user';
    return this.httpClient.post<any>(url, username, { withCredentials: true })
      .subscribe();
  }
}
