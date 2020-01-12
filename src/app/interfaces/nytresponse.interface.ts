import {NYTReview} from "./nyt.review.interface";

export interface NYTResponse {
  copyright: string;
  has_more: boolean;
  num_results: number;
  results: NYTReview[];
  status: string;
}
