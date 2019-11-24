import { OnInit, Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'best-movies',
    templateUrl: './bestmovies.component.html',
    styleUrls: ['./bestmovies.component.css']
  })
@Injectable({
providedIn: 'root'
})
export class BestMoviesComponent implements OnInit {

    movies_raw = "";

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.httpClient.get('http://localhost:8200/movies/best')
        .subscribe((data: any) => {
          this.movies_raw = JSON.stringify(data);
        });
      }
}