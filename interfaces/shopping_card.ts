import type { IBook } from "./book";

export interface IShoppingCardItem extends IBook {
    pivot?: {
        quantity?: number;
    },
    isApplyingDiscount?: boolean;

}