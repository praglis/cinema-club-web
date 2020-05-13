import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Cast } from 'src/app/interfaces/cast.interface';
import { Crew } from 'src/app/interfaces/crew.interface';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  person: Person;
  cast: Cast[] = [];
  crew: Crew[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getPerson(id).subscribe(data => {
      this.person = data;
    });
    this.movieService.getPersonCredits(id).subscribe(data => {
      this.cast = data.cast;
      this.crew = data.crew;
    })
  }

}
