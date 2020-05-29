import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from 'src/app/services/movie.service';
import {MovieDetails} from '../../interfaces/moviedetails.interface';
import {NYTReview} from '../../interfaces/nyt.review.interface';
import {GuardianReview} from '../../interfaces/guardian.review.interface';
import {UserService} from '../../services/user.service';
import {User} from '../../interfaces/user.interface';
import {FavouritesService} from '../../services/favourites.service';
import {Favourites} from '../../interfaces/favourites.interface';
import {PlanToWatchService} from '../../services/plantowatch.service';
import {UserReportComponent} from '../user-report/user-report.component';
import {ReportService} from 'src/app/services/report.service';
import {MatDialog} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

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
  @ViewChild('commentsSwiperContainer', {static: true}) commentsSwiperContainer: ElementRef;
  @ViewChild('commentsSwiperButtonNext', {static: true}) commentsSwiperButtonNext: ElementRef;
  @ViewChild('commentsSwiperButtonPrev', {static: true}) commentsSwiperButtonPrev: ElementRef;

  showRateForm = false;
  successMsg: string;
  trailerKey: any;
  badgeName: string;
  error: string;
  isMovieInFavourites: boolean;
  isMovieInPlanToWatch: boolean;
  userId: number;
  loading = false;
  allDataFetched = false;
  reportReason = '';
  public safeURL: SafeResourceUrl;
  isAdmin: boolean;

  editedReviewId: number;
  commentsSwiper: any;
  showCommentForm = false;
  parentCommentId: number;
  commentFormTitle: string = 'My comment';
  comments: any = [];
  editCommentMode = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private favouriteService: FavouritesService,
    private movieService: MovieService,
    private reportService: ReportService,
    private dialog: MatDialog,
    private planToWatchService: PlanToWatchService,
    private _sanitizer: DomSanitizer
  ) {
    this.movieService.getTrailerKey(String(this.route.snapshot.paramMap.get('id'))).subscribe((key) => {
        this.trailerKey = 'https://www.youtube.com/embed/' + key.key;
        this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.trailerKey);
      }
    );
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id).subscribe((jsonObject: MovieDetails) => {
      this.movie = (jsonObject as MovieDetails);
      this.movieService.getMovieNYTReview(this.movie.title).subscribe((jsonObject: NYTReview) => {
        const response = (jsonObject as NYTReview);

        if (response !== null) {
          this.reviewNYT = response;
        }
      });

      this.movieService.getMovieGuardianReview(this.movie.title).subscribe((jsonObject: GuardianReview) => {
        if (jsonObject !== null) {
          this.reviewGuardian = jsonObject;
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

        this.userService.isAdminUser().subscribe((obj: boolean) => {
          this.isAdmin = obj;
        });
      });
      this.userService.getUserBadge().subscribe((data) => {
        this.badgeName = data.name;
      });
    });

    this.reloadComments();
  }

  ngAfterViewInit() {
    this.commentsSwiper = this.initCommentsSwiper();
    this.commentsChildren.changes.subscribe(t => {
      this.commentsSwiper.update();
    });
  }

  private initCommentsSwiper() {
    return this.commentsSwiper = new Swiper(this.commentsSwiperContainer.nativeElement, {
      slidesPerView: 'auto',
      spaceBetween: 30,
      slidesPerGroup: 2,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: this.commentsSwiperButtonNext.nativeElement,
        prevEl: this.commentsSwiperButtonPrev.nativeElement
      }
    });
  }

  onAddRateClick() {
    this.showCommentForm = false;
    this.showRateForm = true;
    this.rateForms.changes.subscribe(comps => {
      if (comps.length != 0) {
        comps.first.nativeElement.scrollIntoView({behavior: 'smooth'});
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

  submitRate(rate: number) {
    this.movieService.postRate(
      Number(this.route.snapshot.paramMap.get('id')),
      {rate}).subscribe((data) => {
        this.successMsg = 'Rate has been added';
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

  reportUser(commentId: string) {
    const dialogRef = this.dialog.open(UserReportComponent, {
      hasBackdrop: true,
      data: this.reportReason
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.doSend == true) {
        this.reportService.reportUser(this.prepareUserReport(commentId, result.description));
      }
    });
  }

  prepareUserReport(commentId: string, reason: string) {
    return {
      commentId,
      reportDate: new Date(),
      reportReason: reason
    };
  }

  reloadComments() {
    this.movieService.getComments(this.route.snapshot.paramMap.get('id')).subscribe((object) => {
      this.comments = object;
    });
  }

  onAddComment(parentComment?: number) {
    this.closeCommentWritingForm();
    console.log('onAddComment():parentComment?:', parentComment);
    this.showRateForm = false;
    this.showCommentForm = true;
    this.parentCommentId = parentComment;
    if (parentComment != undefined) {
      let comment;
      for (let index = 0; index < this.comments.length; index++) {
        const element = this.comments[index];
        if (element.id === parentComment) {
          comment = element;
          break;
        }
      }
      this.commentFormTitle = 'Reply on ' + comment.infoCU.username + '\'s comment';
    } else {
      this.commentFormTitle = 'Write your comment';
    }
    this.commentForms.changes.subscribe(comps => {
      if (comps.length != 0) {
        comps.first.nativeElement.scrollIntoView({behavior: 'smooth'});
      }
    });
  }

  onEditComment(review: any, parentCommentId?: any) {
    console.log(review);

    this.closeCommentWritingForm();
    this.commentFormTitle = 'Edit comment';
    this.showCommentForm = true;
    this.editCommentMode = true;
    this.commentForms.changes.subscribe(() => {
      if (this.editCommentMode) {
        this.commentForms.first.nativeElement.value = review.statement;
        this.editedReviewId = review.id;
        this.parentCommentId = parentCommentId;
        console.log('onEditComment()SUB:this.parentCommentId:', this.parentCommentId);
        console.log('onEditComment()SUB:this.editedReviewId:', this.editedReviewId);
      }
    });
    console.log('onEditComment()END:this.parentCommentId:', this.parentCommentId);
    console.log('onEditComment()END:this.editedReviewId:', this.editedReviewId);
  }

  submitComment() {
    console.log('submitComment():this.parentCommentId:', this.parentCommentId);
    console.log('submitComment():this.editedReviewId:', this.editedReviewId);
    this.movieService.postComment({
      movieId: Number(this.route.snapshot.paramMap.get('id')),
      reviewBody: this.commentForms.first.nativeElement.value,
      parentReviewId: this.parentCommentId,
      reviewId: this.editedReviewId
    }).subscribe(() => {
        console.log(this.commentForms.first.nativeElement.value);
        if (this.editCommentMode) {
          this.successMsg = 'Comment has been edited';
          this.editCommentMode = false;
        } else {
          this.successMsg = 'Comment has been added';
        }
        this.showCommentForm = false;
        this.reloadComments();
      },
      error => {
        this.error = error.message;
        this.loading = false;
      });
  }

  onDeleteComment(reviewId: number) {
    this.movieService.deleteComment(reviewId).subscribe(() => {
      this.reloadComments();
    });
  }

  likeComment(commentId: string) {
    this.movieService.likeComment(commentId)
      .subscribe(response => {
        this.reloadComments();
      });
  }

  onHighlightComment(commentId: number) {
    this.movieService.highlightComment(commentId)
      .subscribe(() => {
        this.reloadComments();
      });
  }

  closeCommentWritingForm() {
    this.showCommentForm = false;
    this.editCommentMode = false;
    this.editedReviewId = undefined;
  }
}
