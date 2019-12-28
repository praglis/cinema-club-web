export interface GuardianReview {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: Field;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
}

export interface Field {
  trailText: string;
  byline: string;
}
