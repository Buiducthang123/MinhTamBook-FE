import type { IBook } from "./book";
import type { IUser } from "./user";

export interface IReview {
    id: number;
    user_id: number;
    book_id: number;
    rating: number;
    comment: string;
    user?: IUser;
    book?: IBook;
    created_at: Date;
}