import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {QuestionairePropositions} from '../../interfaces/questionairePropositions';
import {SingleMovieResult} from "../../interfaces/singlemovie.interface";
import {User} from "../../interfaces/user.interface";
import {QuestionaireResult} from "../../interfaces/questionaireResult";

@Component({
  selector: 'app-quetionaire',
  templateUrl: './quetionaire.component.html',
  styleUrls: ['./quetionaire.component.css']
})
export class QuetionaireComponent implements OnInit {

  propositions: QuestionairePropositions;
  questionaireResult: QuestionaireResult = { results: []};
  movies: SingleMovieResult[];
  totalResults: number;
  user: User;
  successMsg: string;
  errorMsg: string;

  constructor( private movieService: MovieService,
               private userService: UserService,
               private router: Router,
               private authenticationService: AuthenticationService) {
    this.userService.checkIfUserIsLogged().subscribe(res => {
      if (!res) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.movieService.getQuestionairePropositions()
      .subscribe(res => {
        res.results.forEach(element => { this.bypassSecurityForPoster(element); });

        this.propositions = res;
        this.movies = res.results;
        this.totalResults = res.total_results;
      });

    this.userService.findLoggedUser().subscribe((jsonObject: User) => {
      this.user = jsonObject as User;
    });
  }

  private bypassSecurityForPoster(element: any) {
    element.poster_path = 'https://image.tmdb.org/t/p/w500' + element.poster_path;
  }

  addMovie(result: SingleMovieResult) {
    console.log(result);
    this.questionaireResult.results.push(result);
    this.removeMovie(result);
  }

  removeMovie(movie: SingleMovieResult): void {
    this.movies = this.movies.filter(item => item !== movie);
  }

  onDone() {
    this.userService.sendQuestionaireResults(this.questionaireResult).subscribe((data) => {
        this.successMsg = 'OK';
      },
      error => {
        this.errorMsg = error.message;
      });

    this.user.hasQuestionnaire = true;
    console.log( this.user);
    this.userService.updateProfile(this.user).subscribe((data) => {
        this.successMsg = 'OK';
      },
      error => {
        this.errorMsg = error.message;
      });
    this.router.navigate(['/home']);
  }
}
