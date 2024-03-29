import styles from "./FavoritesDropdown.module.scss";
import { FC, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../../providers/UserProvider";
import { Link } from "react-router-dom";
// const arrowRight = (
//     <svg height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
//         <path d="M350 334.5c3.8 8.8 2 19-4.6 26l-136 144c-4.5 4.8-10.8 7.5-17.4 7.5s-12.9-2.7-17.4-7.5l-136-144c-6.6-7-8.4-17.2-4.6-26s12.5-14.5 22-14.5h88l0-192c0-17.7-14.3-32-32-32H32C14.3 96 0 81.7 0 64V32C0 14.3 14.3 0 32 0l80 0c70.7 0 128 57.3 128 128l0 192h88c9.6 0 18.2 5.7 22 14.5z" />
//     </svg>
// );

export const FavoritesDropdown: FC = () => {
    const { user } = useContext(UserContext);

    return (
        <AnimatePresence>
            <motion.div
                className={styles.main}
                initial={{ opacity: 0, display: "none" }}
                animate={{ opacity: 1, display: "block" }}
                exit={{ opacity: 0, display: "none" }}
            >
                {user.favorites.length ? (
                    <div className={styles.wrapper}>
                        <Link className={styles.restFavorites} to={`/favorites`}>
                            <div>
                                <motion.p whileHover={{ color: "red" }}> смотреть все</motion.p>
                            </div>
                        </Link>

                        <ul className={styles.bookList}>
                            {user.favorites.slice(0, 7).map((book) => (
                                <li key={book.id} className={styles.bookItem}>
                                    <div>
                                        <p className={styles.bookItem__title}>{book.title}</p>
                                        <p className={styles.bookItem__author}>{book.author}</p>
                                    </div>
                                    <img src={book.image} alt={book.title} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>пусто</p>
                )}
            </motion.div>
        </AnimatePresence>
    );
};
