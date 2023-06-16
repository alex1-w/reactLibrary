import { FC, useContext, useEffect, useState } from 'react'
import styles from './CartBlock.module.scss'
import { UserContext } from '../../providers/UserProvider'
import { Container } from '../../components/Container/Container'
import { CartBookItem } from '../../components/elements/CartBookItem/CartBookItem'
import { IBook } from '../../types/IBookItem'
import { Pagination } from '../../components/elements/Pagination/Pagination'

export const CartBlock: FC = () => {
    const { user } = useContext(UserContext)
    const [page, setPage] = useState<IBook[]>([])

    const amount = user.cart.reduce((total, nextPrice) => total + nextPrice.price, 0)

    useEffect(() => { setPage(user.cart.slice(0, 5)) }, [])

    // const bookInPage = 5

    // const bookSlice = (index: number) => {
    //     const books = user.cart.slice(index * bookInPage, index * bookInPage + bookInPage);
    //     setPage(books)
    //     console.log(Math.round(user.cart.length / 5));
    //     console.log(user.cart.length);
    // }

    return (
        <Container>
            <section className={styles.mainBlock}>
                <div className={styles.amountPrice}>
                    <h2>Итого:</h2>
                    <h3>{amount} руб.</h3>
                </div>

                <div className={styles.wrapper}>

                    {user.cart.length > 0 ? page.map(book => (
                        // <BookItem book={book} key={book.id} />
                        <CartBookItem book={book} key={book.id} />
                    )) :
                        <div>
                            <p>Пусто</p>
                        </div>
                    }
                </div>

                {/* <div className={styles.paginationBlock}>

                    {user.cart.length > 5 ?
                        <div className={styles.paginationBlock__paginate}>
                            {user.cart.slice(0, Math.ceil(user.cart.length / 5)).map((item, index) => (
                                <div onClick={() => bookSlice(index)} key={index}>
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        : null}
                </div> */}
                <Pagination books={user.cart} setPage={setPage} bookInPage={5} />
            </section>

        </Container >
    )
}