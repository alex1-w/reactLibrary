import styles from './Input.module.scss'
import { BsSearch } from "react-icons/bs"
import { useEffect, useState, ChangeEvent, useRef, KeyboardEvent, useContext } from 'react'
import { booksData } from '../../../data/MainPage.data'
import { motion, AnimatePresence } from 'framer-motion';
import { IBook } from '../../../types/IBookItem';
import { Link } from 'react-router-dom';
import { InputDropdown } from './InputDropdown/InputDropdown';
import { UserContext } from '../../../providers/UserProvider';

export const Input = () => {
    const { openDropdownName, setOpenDropdownName } = useContext(UserContext)

    const [searchValue, setSearchValue] = useState<string>('');
    const [searchBooks, setSearchFilms] = useState<IBook[]>([]);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

    const getSearchBooks = () => {
        setSearchFilms(booksData.filter(elements => elements.title.toLowerCase().indexOf(searchValue) !== -1));
        if (searchBooks.length) setOpenDropdownName('searchDropdown')
    };

    useEffect(() => {
        if (searchValue.length >= 2) getSearchBooks();
        if (searchValue === '') setOpenDropdownName(null)
    }, [searchValue]);

    const escapeEvent = (e: any) => { if (e.key === 'Escape') setOpenDropdownName(null) }

    return (

        <div className={styles.main} >

            <div
                // whileFocus={{ backgroundColor: 'white' }}
                className={styles.inputBlock}
                onKeyDown={escapeEvent}
            >
                <BsSearch />
                <motion.input
                    type="text"
                    placeholder='Поиск'
                    value={searchValue}
                    onChange={changeHandler}
                    whileFocus={{ backgroundColor: 'white' }}
                />
            </div>
            {openDropdownName === 'searchDropdown' &&
                <motion.div

                    className={styles.inputDropdown}>

                    <InputDropdown searchBooks={searchBooks} />

                </motion.div>
            }
        </div>
    )
}