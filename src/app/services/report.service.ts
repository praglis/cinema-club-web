import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  reportBug(bugReport) {
    const url = 'http://localhost:8200/report/bug';
    return this.httpClient.post<any>(url, bugReport, {withCredentials: true})
      .subscribe();
  }

  reportUser(userReport) {
    console.log('userReport: ', userReport)
    const url = 'http://localhost:8200/report/user';
    return this.httpClient.post<any>(url, userReport, {withCredentials: true})
      .subscribe();
  }
}
