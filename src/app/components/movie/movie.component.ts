import { Component, Input, OnInit, ViewChild, ViewContainerRef, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDetails } from "../../interfaces/moviedetails.interface";
import { NYTResponse } from "../../interfaces/nytresponse.interface";
import { NYTReview } from "../../interfaces/nyt.review.interface";
import { GuardianResponse } from "../../interfaces/guardianresponse.interface";
import { GuardianReview } from "../../interfaces/guardian.review.interface";
import { UserReview } from "../../interfaces/userreview.interface";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @ViewChildren("commentForm")
  commentForms: any;

  @Input() movie: MovieDetails;
  @Input() reviewNYT: NYTReview;
  @Input() reviewGuardian: GuardianReview;

  showCommentForm: boolean = false;
  comments: any = [];
  success_msg: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id).subscribe((jsonObject: MovieDetails) => {
      this.movie = (<MovieDetails>jsonObject);
      this.movieService.getMovieNYTReview(this.movie.title).subscribe((jsonObject: NYTResponse) => {
        let response = (<NYTResponse>jsonObject);

        for (let review of response.results) {
          if (review.display_title === this.movie.title) {
            this.reviewNYT = review;
            break;
          }
        }
      });

      this.movieService.getMovieGuardianReview(this.movie.title).subscribe((jsonObject: GuardianResponse) => {
        console.log(jsonObject);
        console.log(jsonObject.response);
        console.log(jsonObject.response.content);
        this.reviewGuardian = jsonObject.response.content;
      })
    });
    this.reloadComments();
  }

  reloadComments() {
    this.movieService.getComments(this.route.snapshot.paramMap.get('id')).subscribe((object) => {
      this.comments = object;
      console.log(object);
    })
  }

  onAddReviewClick() {
    this.showCommentForm = true;
    this.commentForms.changes.subscribe(comps => {
      if (comps.length != 0) {
        comps.first.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    })
  }

  submitComment() {
    this.movieService.postComment({
      "movieId": Number(this.route.snapshot.paramMap.get('id')),
      "reviewBody": this.commentForms.first.nativeElement.value
    }).subscribe((data) => {
      this.success_msg = "Commend has been added";
      this.showCommentForm = false;
      this.reloadComments();
    })
  }

  likeComment(commentId: string) {
    this.movieService.likeComment(commentId)
      .subscribe(response => {
        this.reloadComments();
      })
  }
}
