import {GuardianReview} from "./guardian.review.interface";

export interface GuardianResponse {
  response: GuardianResponseBody;
}

export interface GuardianResponseBody {
  status: string;
  userTier: string;
  total: number;
  content: GuardianReview;
}
