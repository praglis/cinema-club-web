import { OnInit, Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'popular-movies',
    templateUrl: './popularmovies.component.html',
    styleUrls: ['./popularmovies.component.css']
  })
@Injectable({
providedIn: 'root'
})
export class PopularMoviesComponent implements OnInit {

    movies_raw = "";

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.httpClient.get('http://localhost:8200/movies/popular')
        .subscribe((data: any) => {
          this.movies_raw = JSON.stringify(data);
        });
      }
}