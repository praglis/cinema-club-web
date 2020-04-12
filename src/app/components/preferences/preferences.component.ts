import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ContentChild, Directive, AfterContentChecked, QueryList, ViewChildren } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
declare let Swiper: any;

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit, AfterViewInit {

  // Genres Movies Swiper
  @ViewChildren('genresMoviesChildren') genresMoviesChildren: QueryList<any>;
  @ViewChild('genresSwiperContainer', { static: true }) genresSwiperContainer: ElementRef;
  @ViewChild('genresSwiperButtonNext', { static: true }) genresSwiperButtonNext: ElementRef;
  @ViewChild('genresSwiperButtonPrev', { static: true }) genresSwiperButtonPrev: ElementRef;

  // Casts Movies Swiper
  @ViewChildren('castsMoviesChildren') castsMoviesChildren: QueryList<any>;
  @ViewChild('castsSwiperContainer', { static: true }) castsSwiperContainer: ElementRef;
  @ViewChild('castsSwiperButtonNext', { static: true }) castsSwiperButtonNext: ElementRef;
  @ViewChild('castsSwiperButtonPrev', { static: true }) castsSwiperButtonPrev: ElementRef;

  // Crews Movies Swiper
  @ViewChildren('crewsMoviesChildren') crewsMoviesChildren: QueryList<any>;
  @ViewChild('crewsSwiperContainer', { static: true }) crewsSwiperContainer: ElementRef;
  @ViewChild('crewsSwiperButtonNext', { static: true }) crewsSwiperButtonNext: ElementRef;
  @ViewChild('crewsSwiperButtonPrev', { static: true }) crewsSwiperButtonPrev: ElementRef;

  @Output() clicked = new EventEmitter<string>();

  genresMoviesSwiper: any;
  castsMoviesSwiper: any;
  crewsMoviesSwiper: any;
  x: any;

  genresMovies;
  genres: String[];
  castsMovies;
  casts: String[];
  crewsMovies;
  crews: String[];

  constructor(
    private userService: UserService,
    private santizator: DomSanitizer,
  ) { }

  ngOnInit() {
    this.userService.getRecommendation("C", "1").subscribe(data => {
      this.genres = data.recommendation_values;
      data.movies.results.forEach(element => {this.bypassSecurityForPoster(element);});
      this.genresMovies = data.movies.results;
    });
    this.userService.getRecommendation("A", "1").subscribe(data => {
      this.crews = data.recommendation_values;
      data.movies.results.forEach(element => {this.bypassSecurityForPoster(element);});
      this.crewsMovies = data.movies.results;
    });
    this.userService.getRecommendation("D", "1").subscribe(data => {
      this.casts = data.recommendation_values;
      data.movies.results.forEach(element => {this.bypassSecurityForPoster(element);});
      this.castsMovies = data.movies.results;
    });
  }

  ngAfterViewInit() {
    this.genresMoviesSwiper = this.initGenresMoviesSwiper()
    this.castsMoviesSwiper = this.initCastsMoviesSwiper();
    this.crewsMoviesSwiper = this.initCrewsMoviesSwiper();
    this.genresMoviesChildren.changes.subscribe(t => { this.genresMoviesSwiper.update(); })
    this.castsMoviesChildren.changes.subscribe(t => { this.castsMoviesSwiper.update(); })
    this.crewsMoviesChildren.changes.subscribe(t => { this.crewsMoviesSwiper.update(); })
  }

  private bypassSecurityForPoster(element: any) {
    element.poster_path = "https://image.tmdb.org/t/p/w500" + element.poster_path;
    element.poster_path = this.santizator.bypassSecurityTrustUrl(element.poster_path);
  }

  private initCastsMoviesSwiper() {
    return new Swiper(this.castsSwiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: this.castsSwiperButtonNext.nativeElement,
        prevEl: this.castsSwiperButtonPrev.nativeElement
      }
    });
  }  
  private initCrewsMoviesSwiper() {
    return new Swiper(this.crewsSwiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: this.crewsSwiperButtonNext.nativeElement,
        prevEl: this.crewsSwiperButtonPrev.nativeElement
      }
    });
  }

  private initGenresMoviesSwiper() {
    return this.genresMoviesSwiper = new Swiper(this.genresSwiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: this.genresSwiperButtonNext.nativeElement,
        prevEl: this.genresSwiperButtonPrev.nativeElement
      }
    });
  }

  pupulateSlides() {
    let dummy = [];
    for (let i = 0; i < 8; i++) {
      dummy.push({
        title: "-",
        poster_path: "/assets/gifs/loading-gif.gif"
      })
    }
    return dummy;
  }

}
