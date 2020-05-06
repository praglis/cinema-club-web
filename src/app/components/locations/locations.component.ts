import { Component, DoCheck, OnInit } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { CinemaInterface } from 'src/app/interfaces/cinema.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, DoCheck {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cinemaService: CinemaService
  ) { }
  newQuery: string;
  query: string;
  cinemas: CinemaInterface[];
  searchText: string;
  wybor: CinemaInterface;

  ngOnInit() {
    this.query = '';
    this.newQuery = '';
    this.activatedRoute.queryParams.subscribe(params => {
      this.smoothScrollToTop();
      this.getCinemasObserver(this.query).subscribe((jsonObject: CinemaInterface[]) => {
        this.cinemas = (jsonObject as CinemaInterface[]);
      });
    }
    );
  }

  ngDoCheck() {
    if (this.query !== this.newQuery) {
      this.query = this.newQuery;
      this.getCinemasObserver(this.query).subscribe((jsonObject: CinemaInterface[]) => {
        this.cinemas = (jsonObject as CinemaInterface[]);
      });
    }
  }

  private smoothScrollToTop() {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 200); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  wybierz(wybor: CinemaInterface) {
    this.wybor = wybor;
  }

  saveSearchQuery() {
    this.newQuery = this.searchText;
  }

  private getCinemasObserver(query: string) {
    return this.cinemaService.getCinema(this.prepareBasicCinemaQuery(query));
  }

  private prepareBasicCinemaQuery(query: string) {
    return {
      name: query,
      country: query,
      state: query,
      city: query,
      streetName: query,
      houseNumber: query,
    };
  }

}
