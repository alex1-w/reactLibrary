import { IBook } from '../../../types/IBookItem'
import styles from './Pagination.module.scss'
import { FC, useState } from 'react'

interface IPaginationProps {
    books: IBook[]
    setPage: (active: IBook[]) => void
    bookInPage: number
}

export const Pagination: FC<IPaginationProps> = ({ books, setPage, bookInPage }) => {

    const bookSlice = (index: number) => {
        const booksArr = books.slice(index * bookInPage, index * bookInPage + bookInPage);
        setPage(booksArr)
        console.log(Math.round(books.length / 5));
        console.log(books.length);
    }


    return (
        <div className={styles.main}>

            {books.length > 5
                ?
                <div className={styles.paginate}>
                    {books.slice(0, Math.ceil(books.length / 5)).map((item, index) => (
                        <div onClick={() => bookSlice(index)} key={index}>
                            {index + 1}
                        </div>
                    ))}
                </div>
                :
                null}
        </div>
    )
}