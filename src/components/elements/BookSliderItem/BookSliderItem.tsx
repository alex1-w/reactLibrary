import styles from './BookItem.module.scss';
import { FC, useContext, useState } from 'react';
import { Button } from '../../UI/Button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { enqueueSnackbar } from 'notistack';
import { IBook } from '../../../types/IBookItem';
import { UserContext } from '../../../providers/UserProvider';
import { Link } from 'react-router-dom';
import { cartIcon } from '../UserAccount/UserIcons';

export const BookSliderItem: FC<{ book: IBook }> = ({ book }) => {
    const { user, setUser } = useContext(UserContext)
    const [isLike, setIsLike] = useState<boolean>(Boolean(user.favorites?.find(item => item.id === book.id)))
    const [isBookInCart, setIsBookInCart] = useState<boolean>(Boolean(user.cart?.find(item => item.id === book.id)))

    const putInPlace = (book: IBook, place: 'favorites' | 'cart') => {
        const isUserInLS = localStorage.getItem('user')
        const usersLS = (JSON.parse(localStorage.getItem('users') ?? '[]'))
        const userInUsersLS = usersLS.find((item: any) => item.name === user.name)

        if (!userInUsersLS) return enqueueSnackbar(`Вы не авторизованы`, { variant: 'info' })

        if (isUserInLS) {
            const userLS = JSON.parse(isUserInLS)
            const isBookInPlace = user[place].find((item: any) => item.id === book.id)

            if (!isBookInPlace) {
                userLS[place].unshift(book)
                userInUsersLS[place].unshift(book)

                const newUsersLS = usersLS.filter((item: any) => item.name !== userInUsersLS.name)
                newUsersLS.push(userInUsersLS)
                localStorage.setItem('users', JSON.stringify(newUsersLS))

                if (place === 'favorites') {
                    setIsLike(true)
                }
                if (place === 'cart') {
                    setIsBookInCart(true)
                }
                localStorage.setItem('user', JSON.stringify(userLS))

                setUser({
                    ...user,
                    [place]: [...user[place], book]
                })

                return enqueueSnackbar(`Добавлена в ${place === 'cart' ? 'корзину' : 'избранное'}`, { variant: 'info' })
            }

            if (place === 'favorites') {
                setIsLike(false)
            }
            if (place === 'cart') {
                setIsBookInCart(false)
            }

            setUser({
                ...user,
                [place]: user[place].filter((item: IBook) => item.id !== book.id)
            })

            userLS[place] = userLS[place].filter((item: IBook) => item.id !== book.id)
            localStorage.setItem('user', JSON.stringify(userLS))

            const newUsersLs = usersLS.filter((item: any) => item.name !== userInUsersLS.name)
            newUsersLs.push(userLS)
            localStorage.setItem('users', JSON.stringify(newUsersLs))
            return enqueueSnackbar('Удалена из избранного', { variant: 'info' })
        }
    }

    return (


        <motion.div whileHover={{ boxShadow: '0px 7px 30px rgba(0, 0, 0, 0.30)' }} className={styles.card}>

            <div className={styles.imgBlock}>
                <Link to={`/book/${book.id}`}>
                    <img src={book.image} alt={book.title} className={styles.image} />
                </Link>
            </div>

            <div className={styles.card__price}>
                <p>{book.price} грн.</p>
            </div>

            <div className={styles.card__info}>
                <p className={styles.card__title}>{book.title}</p>
                <p className={styles.card__author}>{book.author}</p>
            </div>

            <div className={styles.card__footer}>

                <AnimatePresence>
                    {!isBookInCart &&
                        <motion.div
                            className={styles.cartBlock}
                            onClick={() => putInPlace(book, 'cart')}
                            initial={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            // exit={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Button name='В корзину' variant='bookSliderItemBtn' />
                        </motion.div>}
                </AnimatePresence >

                <AnimatePresence>

                    {isBookInCart &&
                        <motion.div
                            className={styles.card__footer__cartIcon}
                            onClick={() => putInPlace(book, 'cart')}
                            initial={{ opacity: 0 }}
                            // exit={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            animate={{ opacity: 1 }}
                        >
                            {cartIcon}
                            {/* <p>добавлено в корзину</p> */}
                        </motion.div>
                    }

                </AnimatePresence>

                <motion.svg
                    onClick={() => putInPlace(book, 'favorites')}
                    whileHover={{ scale: 1.2 }}
                    className={styles.likeSvg}
                    // fill={isLike ? 'red' : 'black'}
                    // style={{ fill: isLike ? 'red' : 'black' }}
                    // className={({ isLike }) => isLike === true ? `colorLiked` : ''}
                    width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                </motion.svg>


            </div>

        </motion.div>


    )
}


// export const BookItem = () =>{
//     return (
//         <div></div>
//     )
// }