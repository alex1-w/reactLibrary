export interface IBook {
    id: number,
    title: string,
    author: string,
    image: string,
    price: number,
    categoryId: number,
    description: string;
}

export interface IUser {
    name: string;
    password: string;
    id: number;
    cash: number;
    favorites: IBook[];
    cart: IBook[];
}