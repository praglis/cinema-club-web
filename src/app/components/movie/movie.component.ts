import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit() {
    //Do usunięcia gdy będzie działać metoda getMovie/ chwilowe obejście
    if (window.history.state != null) {
      this.movie = window.history.state;
      this.movie.poster_path = this.movie.poster_path.changingThisBreaksApplicationSecurity;
    }
    //

    console.log(this.movie);
    const id = this.route.snapshot.paramMap.get('nick');
    this.movieService.getMovie(id)
      .subscribe(data => {
          //TODO: this.movie = data
      });
  }

}
