import { Component, OnInit, DoCheck } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})

export class MainLayoutComponent implements OnInit {

  public movies: Observable<string[]>;
  constructor() { }

  ngOnInit() {
  }

}
