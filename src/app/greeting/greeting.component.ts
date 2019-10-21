import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class GreetingComponent implements OnInit {

  user = " (not working) ";

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get('http://localhost:8200/greeting')
    .subscribe((data: any) => {
      this.user = data.name;
    });
  }
}
