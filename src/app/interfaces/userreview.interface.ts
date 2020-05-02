export interface UserReview {
    movieId?: number,
    cinemaId?: number,
    movieTitle?: string,
    reviewBody?: string,
    reviewId?: number,
    parentReviewId?: number
    replies?: UserReview[]
}
