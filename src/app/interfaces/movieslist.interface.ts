import {SingleMovieResult} from './singlemovie.interface';

export interface MoviesList {
  page: number;
  total_results: number;
  total_pages: number;
  results: SingleMovieResult[];
}
