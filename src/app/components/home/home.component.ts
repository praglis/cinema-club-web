import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public text: string;
  constructor() { }

  ngOnInit() {
    console.log('Hello' + localStorage.currentUser);
    this.text = 'home init test';
  }

  onCliked(text: string) {
    alert(text);
  }
}
