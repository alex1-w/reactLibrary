import styles from "./Catalog.module.scss";
import { CartBookItem } from "../../components/elements/CartBookItem/CartBookItem";
import { booksData, categories } from "../../data/MainPage.data";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { IBook } from "../../types/IBookItem";
import { ChangeEvent } from "react";

interface IFilter {
    min: number;
    max: number;
    category?: IBook[];
}

export const Catalog = () => {
    const [categoryBooks, setCategoryBooks] = useState<IBook[]>(booksData);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const openFilterBlock = useRef<HTMLDivElement>(null);

    const [filterForm, setFilterForm] = useState<IFilter>({
        min: 0,
        max: 0,
        category: categoryBooks,
    });

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
        setFilterForm({ ...filterForm, [e.target.name]: e.target.value });

    const showDropdownFilter = () => {
        openFilterBlock.current?.classList.toggle(styles.opened);
        setShowFilter(!showFilter);
    };

    const resolveCategory = (category: number) => {
        const books = booksData.filter((book) => book.categoryId === category);
        setCategoryBooks(books);
    };

    const applyFilter = () => {
        const books = booksData.filter(
            (book) => book.price >= filterForm.min && book.price <= filterForm.max
        );
        setCategoryBooks(books);
    };

    const resetFilter = () => {
        setFilterForm({ max: 0, min: 0 });
        setCategoryBooks(booksData);
    };

    return (
        <section className={styles.main}>
            <div className={styles.filterBlock}>
                <div className={styles.categoriesBlock}>
                    <ul>
                        {categories.map((category) => (
                            <li
                                key={category.categoryId}
                                onClick={() => resolveCategory(category.categoryId)}
                            >
                                <p>{category.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.filter}>
                    <motion.div
                        initial={{ height: 0, visibility: "hidden", y: -30, opacity: 0 }}
                        exit={{ height: 0, visibility: "hidden", y: -30, opacity: 0 }}
                        animate={
                            showFilter === true
                                ? { height: "auto", visibility: "visible", y: 0, opacity: 1 }
                                : { height: 0, visibility: "hidden", y: -30, opacity: 0 }
                        }
                        className={styles.filter__dropdown}
                    >
                        <div className={styles.filter__inputBlock}>
                            <input
                                type="number"
                                min={120}
                                placeholder="MIN"
                                value={filterForm.min}
                                onChange={changeHandler}
                                name="min"
                            />
                            <input
                                type="number"
                                max={4000}
                                value={filterForm.max}
                                placeholder="MAX"
                                onChange={changeHandler}
                                name="max"
                            />
                        </div>
                        <div className={styles.filter__btnsBlock}>
                            <button onClick={applyFilter}>применить</button>
                            <button onClick={resetFilter}>сбросить фильтр</button>
                        </div>
                    </motion.div>
                    <div
                        onClick={showDropdownFilter}
                        ref={openFilterBlock}
                        className={styles.filter__btn}
                    >
                        <p>фильтр</p>
                        <motion.svg
                            className={styles.filter__btnArrow}
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 512 512"
                        >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                        </motion.svg>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                {categoryBooks.map((book) => (
                    <CartBookItem book={book} key={book.id} />
                ))}
            </div>
        </section>
    );
};
