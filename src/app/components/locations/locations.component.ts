import { Component, DoCheck, OnInit, ViewChildren } from '@angular/core';
import { CinemaService } from '../../services/cinema.service';
import { CinemaInterface } from 'src/app/interfaces/cinema.interface';
import { ActivatedRoute } from '@angular/router';
import {MovieDetails} from '../../interfaces/moviedetails.interface';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit, DoCheck {
  @ViewChildren('rateForm')
  rateForms: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cinemaService: CinemaService,
    private movieService: MovieService,
  ) { }
  newQuery: string;
  query: string;
  cinemas: CinemaInterface[];
  searchText: string;
  wybor: CinemaInterface;
  showRateForm = false;
  success_msg: string;
  error: string;
  orderBy: string;
  premieres: any = [];
  posters: any = [];

  ngOnInit() {
    this.query = '';
    this.newQuery = '';
    this.activatedRoute.queryParams.subscribe(params => {
      this.orderBy = params['orderBy'];
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
    this.cinemaService.getPremieres(this.wybor.id).subscribe((object) => {
      this.premieres = object;
      for (let i = 0; i < this.premieres.length; i++) {
        this.movieService.getMovie(this.premieres[i].movie.apiUrl).subscribe((jsonObject: MovieDetails) => {
          this.posters[i] = (jsonObject as MovieDetails).poster_path;
        });
      }
    });
  }

  saveSearchQuery() {
    this.newQuery = this.searchText;
  }

  private getCinemasObserver(query: string) {
    return this.cinemaService.getCinema(this.prepareBasicCinemaQuery(query), this.orderBy);
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

  submitRate(rate: number) {
    this.cinemaService.postRate(
      this.wybor.id, { rate }).subscribe((data) => {
        this.success_msg = 'Rate has been added';
        this.showRateForm = false;
        this.cinemaService.getCinemaById(this.wybor.id).subscribe((data: CinemaInterface) => {
          let position = 0;
          for (let index = 1; index < this.cinemas.length; index++) {
            const element = this.cinemas[index];
            if (element.id === data.id) {
              position = index;
              break;
            }
          }
          this.wybor = data;
          this.cinemas[position] = data;
        })
      },
        error => {
          this.error = error.message;
        });
  }

  onAddRateClick() {
    this.showRateForm = true;
    this.rateForms.changes.subscribe(comps => {
      if (comps.length != 0) {
        comps.first.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
