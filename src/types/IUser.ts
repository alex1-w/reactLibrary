import { IBook } from "./IBookItem";

export interface IUser {
    name: string;
    password: string;
    id: number;
    cash: number;
    favorites: IBook[];
    cart: IBook[];
}