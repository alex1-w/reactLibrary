import styles from "./InputDropdown.module.scss";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IBook } from "../../../../types/IBookItem";

export const InputDropdown: FC<{ searchBooks: IBook[] }> = ({
  searchBooks,
}) => {
  return (
    <ul className={styles.bookList}>
      {searchBooks.map((book) => (
        <li key={book.id} className={styles.bookItem}>
          <Link to={"book/" + book.id} className={styles.bookItem__content}>
            <div>
              <p className={styles.bookItem__title}>{book.title}</p>
              <p className={styles.bookItem__author}>{book.author}</p>
            </div>
            <img src={book.image} alt={book.title} width={40} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
