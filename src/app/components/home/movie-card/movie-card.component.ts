import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {

  public text = 'movie card test';

  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public onClick() {
    this.clicked.emit(this.text);
  }
}
