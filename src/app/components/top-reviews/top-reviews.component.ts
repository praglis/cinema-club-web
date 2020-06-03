import {Component, OnInit, ViewChildren} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {UserReportComponent} from '../user-report/user-report.component';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ReportService} from '../../services/report.service';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../interfaces/user.interface';
import {UserreportInterface} from '../../interfaces/userreport.interface';
import {UserReview} from '../../interfaces/userreview.interface';

@Component({
  selector: 'app-top-reviews',
  templateUrl: './top-reviews.component.html',
  styleUrls: ['./top-reviews.component.css']
})
export class TopReviewsComponent implements OnInit {

  @ViewChildren('commentForm')
  commentForms: any;
  showRateForm = false;
  successMsg: string;
  error: string;
  userId: number;
  loading = false;
  reportReason = '';
  isAdmin: boolean;
  editedReviewId: number;
  showCommentForm = false;
  parentCommentId: number;
  commentFormTitle = 'My comment';
  comments: any = [];
  editCommentMode = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private movieService: MovieService,
    private reportService: ReportService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.userService.findLoggedUser().subscribe((user: User) => {
      this.userId = user.id;
      this.userService.isAdminUser().subscribe((isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      });
    });
    this.reloadComments();
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

  prepareUserReport(commentId: string, reason: string): UserreportInterface {
    return {
      commentId,
      reportDate: new Date(),
      reportReason: reason
    };
  }

  reloadComments() {
    this.movieService.getAllComments().subscribe((comments) => {
      this.comments = comments;
    });
  }

  onAddComment(parentComment?: number) {
    this.closeCommentWritingForm();
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
    this.closeCommentWritingForm();
    this.commentFormTitle = 'Edit comment';
    this.showCommentForm = true;
    this.editCommentMode = true;
    this.commentForms.changes.subscribe(() => {
      if (this.editCommentMode) {
        this.commentForms.first.nativeElement.value = review.statement;
        this.editedReviewId = review.id;
        this.parentCommentId = parentCommentId;
      }
    });
  }

  // submitComment() {
  //   this.movieService.postComment({
  //     movieId: Number(this.route.snapshot.paramMap.get('id')),
  //     reviewBody: this.commentForms.first.nativeElement.value,
  //     parentReviewId: this.parentCommentId,
  //     reviewId: this.editedReviewId
  //   }).subscribe((data) => {
  //       if (this.editCommentMode) {
  //         this.successMsg = 'Comment has been edited';
  //         this.editCommentMode = false;
  //       } else {
  //         this.successMsg = 'Comment has been added';
  //       }
  //       this.showCommentForm = false;
  //       this.reloadComments();
  //     },
  //     error => {
  //       this.error = error.message;
  //       this.loading = false;
  //     });
  // }

  submitComment() {

    let userReview: UserReview;
    userReview = {
      movieId: Number(this.route.snapshot.paramMap.get('id')),
      reviewBody: this.commentForms.first.nativeElement.value,
      parentReviewId: this.parentCommentId,
      reviewId: this.editedReviewId
    };

    this.movieService.postComment(userReview).subscribe(() => {
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
      .subscribe(response => {
        this.reloadComments();
      });
  }

  closeCommentWritingForm() {
    this.showCommentForm = false;
    this.editCommentMode = false;
    this.editedReviewId = undefined;
  }
}
