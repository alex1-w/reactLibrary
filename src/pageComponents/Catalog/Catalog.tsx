import styles from './Catalog.module.scss'
import { CartBookItem } from '../../components/elements/CartBookItem/CartBookItem'
import { booksData, categories } from '../../data/MainPage.data'
import { motion } from 'framer-motion';
import { useState, useRef } from 'react'
import { IBook } from '../../types/IBookItem';
import { ChangeEvent } from 'react'

interface IFilter {
    min: number;
    max: number;
    category?: IBook[]
}

// ////////////////////////////////SIDEBASAR
export const Catalog = () => {
    const [categoryBooks, setCategoryBooks] = useState<IBook[]>(booksData)
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const openFilterBlock = useRef<HTMLDivElement>(null)

    const [filterForm, setFilterForm] = useState<IFilter>({
        min: 0,
        max: 0,
        category: categoryBooks
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterForm({ ...filterForm, [e.target.name]: e.target.value })
    }

    const showDropdownFilter = () => {
        openFilterBlock.current?.classList.toggle(styles.opened)
        setShowFilter(!showFilter)
    }

    const resolveCategory = (category: number) => {
        const books = booksData.filter(book => book.categoryId === category)
        setCategoryBooks(books)
    }

    const applyFilter = () => {
        const books = booksData.filter(book => book.price >= filterForm.min && book.price <= filterForm.max)
        console.log(filterForm);
        setCategoryBooks(books)
    }

    return (
        <section className={styles.main}>
            <div className={styles.filterBlock}>

                <div className={styles.categoriesBlock}>
                    <ul>
                        {categories.map(category => (
                            <motion.li
                                key={category.categoryId}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => resolveCategory(category.categoryId)}
                            >
                                <p>{category.name}</p>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className={styles.filter}>

                    <div
                        onClick={showDropdownFilter}
                        ref={openFilterBlock}
                        className={styles.filter__btn}
                    >
                        <p>фильтр</p>
                        <motion.svg className={styles.filter__btnArrow} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></motion.svg>
                    </div>

                    <motion.div
                        initial={{ height: 0, visibility: 'hidden' }}
                        animate={showFilter === true ? { height: 'auto', visibility: 'visible' } : { height: 0, visibility: 'hidden' }}
                        className={styles.filter__dropdown}
                    >
                        <div className={styles.filter__inputBlock}>

                            <motion.input
                                whileFocus={{ background: 'white' }}
                                type="number"
                                min={120}
                                placeholder='MIN'
                                value={filterForm.min}
                                onChange={changeHandler}
                                name='min'
                            />

                            <motion.input
                                whileFocus={{ background: 'white' }}
                                type="number"
                                max={4000}
                                value={filterForm.max}
                                placeholder='MAX'
                                onChange={changeHandler}
                                name='max'
                            />

                        </div>
                        <button onClick={applyFilter}>применить</button>

                    </motion.div>

                </div>

            </div>

            <div className={styles.wrapper}>

                {categoryBooks.map(book => (
                    <CartBookItem book={book} key={book.id} />
                ))}

            </div>
        </section >
    )
}