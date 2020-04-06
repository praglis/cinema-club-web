import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ContentChild, Directive, AfterContentChecked, QueryList, ViewChildren } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
declare let Swiper: any;

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit, AfterViewInit {

  // Popular movies swiper
  @ViewChildren('popularMoviesChildren') popularMoviesChildren: QueryList<any>;
  @ViewChild('popularSwiperContainer', { static: true }) popularSwiperContainer: ElementRef;
  @ViewChild('popularSwiperButtonNext', { static: true }) popularSwiperButtonNext: ElementRef;
  @ViewChild('popularSwiperButtonPrev', { static: true }) popularSwiperButtonPrev: ElementRef;

  //Best movies swiper
  @ViewChildren('bestMoviesChildren') bestMoviesChildren: QueryList<any>;
  @ViewChild('bestSwiperContainer', { static: true }) bestSwiperContainer: ElementRef;
  @ViewChild('bestSwiperButtonNext', { static: true }) bestSwiperButtonNext: ElementRef;
  @ViewChild('bestSwiperButtonPrev', { static: true }) bestSwiperButtonPrev: ElementRef;

  @Output() clicked = new EventEmitter<string>();

  popularMovies: any[];
  bestMovies: any[];
  popularMoviesSwiper: any;
  bestMoviesSwiper: any;
  x: any;

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private router: Router,
    private santizator: DomSanitizer,
    private authenticationService: AuthenticationService
  ) {
    this.userService.checkIfUserIsLogged().subscribe(res => {
      if (!res) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  ngAfterViewInit() {
    this.popularMoviesSwiper = this.initPopularMoviesSwiper()
    this.bestMoviesSwiper = this.initBestMoviesSwiper();
    this.popularMoviesChildren.changes.subscribe(t => { this.popularMoviesSwiper.update(); })
    this.bestMoviesChildren.changes.subscribe(t => { this.bestMoviesSwiper.update(); })
  }

  ngOnInit() {

    this.popularMovies = this.pupulateSlides();
    this.bestMovies = this.pupulateSlides();
    this.movieService.getPopularMovies(1)
      .subscribe(res => {
        res.results.forEach(element => { this.bypassSecurityForPoster(element); });
        this.popularMovies = res.results;
      });
    this.movieService.getBestMovies(1)
      .subscribe(res => {
        res.results.forEach(element => { this.bypassSecurityForPoster(element); });
        this.bestMovies = res.results;
      });
  }

  private bypassSecurityForPoster(element: any) {
    element.poster_path = "https://image.tmdb.org/t/p/w500" + element.poster_path;
    element.poster_path = this.santizator.bypassSecurityTrustUrl(element.poster_path);
  }

  private initBestMoviesSwiper() {
    return new Swiper(this.bestSwiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,
      // loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: this.bestSwiperButtonNext.nativeElement,
        prevEl: this.bestSwiperButtonPrev.nativeElement
      }
    });
  }

  private initPopularMoviesSwiper() {
    return this.popularMoviesSwiper = new Swiper(this.popularSwiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,
      // loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: this.popularSwiperButtonNext.nativeElement,
        prevEl: this.popularSwiperButtonPrev.nativeElement
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
