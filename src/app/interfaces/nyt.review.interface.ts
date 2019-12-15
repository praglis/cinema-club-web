import {Link} from "./link.interface";
import {MultiMedia} from "./multimedia.interface";

export interface NYTReview {
  byline: string;
  critics_pick: number;
  date_updated: string;
  display_title: string;
  headline: string;
  link: Link;
  mppa_rating: string;
  multimedia: MultiMedia;
  opening_date: string;
  publication_date: string;
  summary_short: string;
}
