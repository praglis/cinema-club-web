import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { MovieDetails } from "../../interfaces/moviedetails.interface";
import {NYTResponse} from "../../interfaces/nytresponse.interface";
import {NYTReview} from "../../interfaces/nyt.review.interface";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movie: MovieDetails;
  @Input() reviews: NYTReview[];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id).subscribe((jsonObject: MovieDetails) => {
      this.movie = (<MovieDetails>jsonObject);
      this.movieService.getMovieNYTReview(this.movie.title).subscribe((jsonObject : NYTResponse) => {
        let response = (<NYTResponse>jsonObject);

        this.reviews = new Array(response.num_results);
        for(let review of response.results) {
          if(review.display_title === this.movie.title) {
            this.reviews.push(review);
          }
        }
      })
    });
  }
}
