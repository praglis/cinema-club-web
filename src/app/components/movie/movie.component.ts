import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ContentChild, Directive, AfterContentChecked, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDetails } from '../../interfaces/moviedetails.interface';
import { NYTResponse } from '../../interfaces/nytresponse.interface';
import { NYTReview } from '../../interfaces/nyt.review.interface';
import { GuardianResponse } from '../../interfaces/guardianresponse.interface';
import { GuardianReview } from '../../interfaces/guardian.review.interface';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { FavouritesService } from '../../services/favourites.service';
import { Favourites } from '../../interfaces/favourites.interface';
import { PlanToWatchService } from '../../services/plantowatch.service';
import { UserReportComponent } from '../user-report/user-report.component';
import { ReportService } from 'src/app/services/report.service';
import { MatDialog } from '@angular/material/dialog';

declare let Swiper: any;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {

  @ViewChildren('commentForm')
  commentForms: any;

  @ViewChildren('rateForm')
  rateForms: any;

  @Input() movie: MovieDetails;
  @Input() reviewNYT: NYTReview;
  @Input() reviewGuardian: GuardianReview;

  // Comments swiper
  @ViewChildren('commentsChildren') commentsChildren: QueryList<any>;
  @ViewChild('commentsSwiperContainer', { static: true }) commentsSwiperContainer: ElementRef;
  @ViewChild('commentsSwiperButtonNext', { static: true }) commentsSwiperButtonNext: ElementRef;
  @ViewChild('commentsSwiperButtonPrev', { static: true }) commentsSwiperButtonPrev: ElementRef;

  commentsSwiper: any;
  showCommentForm = false;
  showRateForm = false;
  comments: any = [];
  success_msg: string;
  badgeName: string;
  error: string;
  isMovieInFavourites: boolean;
  isMovieInPlanToWatch: boolean;
  userId: number;
  loading = false;
  allDataFetched = false;
  reportReason = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private favouriteService: FavouritesService,
    private movieService: MovieService,
    private reportService: ReportService,
    private dialog: MatDialog,
    private planToWatchService: PlanToWatchService,
  ) { }

  ngAfterViewInit() {
    this.commentsSwiper = this.initCommentsSwiper();
    this.commentsChildren.changes.subscribe(t => { this.commentsSwiper.update(); });
  }

  private initCommentsSwiper() {
    return this.commentsSwiper = new Swiper(this.commentsSwiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,
      // loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: this.commentsSwiperButtonNext.nativeElement,
        prevEl: this.commentsSwiperButtonPrev.nativeElement
      }
    });
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id).subscribe((jsonObject: MovieDetails) => {
      this.movie = (jsonObject as MovieDetails);
      this.movieService.getMovieNYTReview(this.movie.title).subscribe((jsonObject: NYTResponse) => {
        const response = (jsonObject as NYTResponse);

        for (const review of response.results) {
          if (review.display_title === this.movie.title) {
            this.reviewNYT = review;
            break;
          }
        }
      });

      this.userService.getUserBadge().subscribe( (data) => {
        this.badgeName = data.name;
      });

      this.movieService.getMovieGuardianReview(this.movie.title).subscribe((jsonObject: GuardianResponse) => {
        if (jsonObject !== null) {
          this.reviewGuardian = jsonObject.response.content;
        }
      });

      this.userService.findLoggedUser().subscribe((jsonObject: User) => {
        this.userId = jsonObject.id;
        this.favouriteService.getUserFavourites(jsonObject.id).subscribe((favourites: Favourites[]) => {
          this.isMovieInFavourites = false;
          favourites.forEach(fav => {
            if (fav.movieUrl === this.movie.id.toString()) {
              this.isMovieInFavourites = true;
            }
          });
        });
        this.planToWatchService.getUserPlanToWatch(jsonObject.id).subscribe((favourites: Favourites[]) => {
          this.isMovieInPlanToWatch = false;
          favourites.forEach(fav => {
            if (fav.movieUrl === this.movie.id.toString()) {
              this.isMovieInPlanToWatch = true;
            }
          });
        });
        this.allDataFetched = true;
      });
    });

    this.reloadComments();
  }

  reloadComments() {
    this.movieService.getComments(this.route.snapshot.paramMap.get('id')).subscribe((object) => {
      this.comments = object;
    });
  }

  onAddReviewClick() {
    this.showRateForm = false;
    this.showCommentForm = true;
    this.commentForms.changes.subscribe(comps => {
      if (comps.length != 0) {
        comps.first.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  onAddRateClick() {
    this.showCommentForm = false;
    this.showRateForm = true;
    this.rateForms.changes.subscribe(comps => {
      if (comps.length != 0) {
        comps.first.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  onAddToFavourites() {
    this.favouriteService.addUserFavourite({
      userId: this.userId,
      movieTitle: this.movie.title,
      movieUrl: this.movie.id.toString()
    }).subscribe((data) => {
      window.location.reload();
    });
  }

  onAddToPlanToWatch() {
    this.planToWatchService.addUserPlanToWatch({
      userId: this.userId,
      movieTitle: this.movie.title,
      movieUrl: this.movie.id.toString()
    }).subscribe((data) => {
      window.location.reload();
    });
  }

  onRemoveMovieFromFavourites() {
    this.favouriteService.removeUserFavourite({
      userId: this.userId,
      movieTitle: this.movie.title,
      movieUrl: this.movie.id.toString()
    }).subscribe((response) => {
      window.location.reload();
    });
  }

  onRemoveMovieFromPlanToWatch() {
    this.planToWatchService.removeUserPlanToWatch({
      userId: this.userId,
      movieTitle: this.movie.title,
      movieUrl: this.movie.id.toString()
    }).subscribe((response) => {
      window.location.reload();
    });
  }

  submitComment() {
    this.movieService.postComment({
      movieId: Number(this.route.snapshot.paramMap.get('id')),
      reviewBody: this.commentForms.first.nativeElement.value
    }).subscribe((data) => {
      this.success_msg = 'Commend has been added';
      this.showCommentForm = false;
      this.reloadComments();
    },
      error => {
        this.error = error.message;
        this.loading = false;
      });
  }

  submitRate(rate: number) {
    this.movieService.postRate(
      Number(this.route.snapshot.paramMap.get('id')),
      { rate }).subscribe((data) => {
        this.success_msg = 'Rate has been added';
        this.showRateForm = false;
        const id = +this.route.snapshot.paramMap.get('id');
        this.movieService.getMovie(id).subscribe((jsonObject: MovieDetails) => {
          this.movie = (jsonObject as MovieDetails);
        });
        this.reloadComments();
      },
      error => {
        this.error = error.message;
        this.loading = false;
      });
  }

  likeComment(commentId: string) {
    this.movieService.likeComment(commentId)
      .subscribe(response => {
        this.reloadComments();
      });
  }

  reportUser(commentId: string) {
    const dialogRef = this.dialog.open(UserReportComponent, {
      hasBackdrop: true,
      data: this.reportReason
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result:', result);
      if (result.doSend === true) { this.reportService.reportUser(this.prepareUserReport(commentId, result.description)); }
    });
  }

  prepareUserReport(commentId: string, reason: string) {
    return {
      commentId,
      reportDate: new Date(),
      reportReason: reason
    };
  }
}
