import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserReview} from '../interfaces/userreview.interface';
import {MovieSearchCriteria} from "../interfaces/movie.search.criteria.interface";
import {MoviesList} from "../interfaces/movieslist.interface";
import {RateInterface} from '../interfaces/rate.interface';
import {Person} from '../interfaces/person';
import {MovieDetails} from "../interfaces/moviedetails.interface";
import {NYTReview} from "../interfaces/nyt.review.interface";
import {GuardianReview} from "../interfaces/guardian.review.interface";
import {Trailer} from "../interfaces/trailer.interface";
import {Credit} from "../interfaces/credit.interface";
import {QuestionairePropositions} from '../interfaces/questionairePropositions';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getCinemas() {
    this.httpClient.get<any>("http://localhost:8200/cinema/find", {withCredentials: true})
      .subscribe();
  }

  getPopularMovies(page: number): Observable<MoviesList> {
    this.getCinemas();
    let url = "http://localhost:8200/movies/popular?page=" + page;
    return this.httpClient.get<MoviesList>(url, {withCredentials: true})
      .pipe();
  }

  getQuestionairePropositions(): Observable<QuestionairePropositions> {
    const url = 'http://localhost:8200/movies/questionnaire';
    return this.httpClient.get<QuestionairePropositions>(url, { withCredentials: true })
      .pipe();
  }

  getBestMovies(page: number): Observable<MoviesList> {
    const url = "http://localhost:8200/movies/best?page=" + page;
    return this.httpClient.get<MoviesList>(url, {withCredentials: true})
      .pipe();
  }

  getMovie(id: number): Observable<MovieDetails> {
    let url = "http://localhost:8200/movie/get";
    url += "?id=" + id;
    return this.httpClient.get<MovieDetails>(url, {withCredentials: true})
      .pipe();
  }

  getMovieNYTReview(title: string): Observable<NYTReview> {
    let url = "http://localhost:8200/movie/get/reviews/nyt";
    url += "?title=" + title;

    return this.httpClient.get<NYTReview>(url, {withCredentials: true}).pipe();
  }

  getMovieGuardianReview(title: string): Observable<GuardianReview> {
    let url = "http://localhost:8200/movie/get/reviews/guardian";
    url += "?title=" + title;

    return this.httpClient.get<GuardianReview>(url, {withCredentials: true}).pipe();
  }

  getMovieByQuery(query: string): Observable<MoviesList> {
    let url = 'http://localhost:8200/movie/get/search';
    url += '?query=' + query;
    return this.httpClient.get<MoviesList>(url, {withCredentials: true})
      .pipe();
  }

  postComment(userReview: UserReview): Observable<any> {
    const url = 'http://localhost:8200/reviews/userReview';
    return this.httpClient.put<any>(url, userReview, { withCredentials: true }).pipe();
  }

  deleteComment(reviewId: number): Observable<any> {
    const url = 'http://localhost:8200/reviews/userReview/' + reviewId + '/remove';
    return this.httpClient.put<any>(url, null, { withCredentials: true }).pipe();
  }

  getComments(movieId: string): Observable<any> {
    const url = 'http://localhost:8200/reviews/userReview/' + movieId;
    return this.httpClient.get<any>(url, { withCredentials: true }).pipe();
  }

  likeComment(commentId: string): Observable<any> {
    const url = 'http://localhost:8200/reviews/userReview/' + commentId + '/like';
    return this.httpClient.put<any>(url, {}, { withCredentials: true }).pipe();
  }

  highlightComment(commentId: number): Observable<any> {
    const url = 'http://localhost:8200/admin/highlight/' + commentId;
    return this.httpClient.put<any>(url, {}, { withCredentials: true }).pipe();
  }

  getUserFavourites(userId: string): Observable<MoviesList> {
    const url = "http://localhost:8200/user/favourites?user=" + userId;
    return this.httpClient.get<MoviesList>(url, {withCredentials: true}).pipe();
  }

  getUserPlanToWatch(userId: string): Observable<MoviesList> {
    const url = "http://localhost:8200/user/plantowatch?user=" + userId;
    return this.httpClient.get<MoviesList>(url, {withCredentials: true}).pipe();
  }

  getMoviesByCriteria(criteria: MovieSearchCriteria): Observable<MoviesList> {
    const url = "http://localhost:8200/movies/get";
    return this.httpClient.post<MoviesList>(url, criteria, {withCredentials: true}).pipe();
  }

  postRate(id: number, rate: RateInterface): Observable<any> {
    const url = 'http://localhost:8200/movie/' + id + '/rate';
    return this.httpClient.post<any>(url, rate, {withCredentials: true}).pipe();
  }

  getTrailerKey(movieId: string): Observable<Trailer> {
    const url = "http://localhost:8200/movie/get/trailer?id=" + movieId;
    return this.httpClient.get<Trailer>(url, {withCredentials: true}).pipe();
  }

  getPerson(id: number): Observable<Person> {
    const url = 'http://localhost:8200/person/get/' + id;
    return this.httpClient.get<Person>(url, { withCredentials: true }).pipe();
  }

  getPersonCredits(id: number): Observable<Credit> {
    const url = "http://localhost:8200/person/get/" + id + "/credits";
    return this.httpClient.get<Credit>(url).pipe();
  }
}
