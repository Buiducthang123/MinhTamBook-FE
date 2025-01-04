export interface IReview {
    id: number;
    user_id: number;
    book_id: number;
    rating: number;
    comment: string;
    created_at: Date;
}