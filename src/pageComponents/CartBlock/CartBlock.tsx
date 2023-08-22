import styles from './CartBlock.module.scss'
import { FC, useContext, useEffect, useState } from 'react'
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
            <section className={styles.wrapper}>
                <div className={styles.amountPrice}>
                    <h2>Итого:</h2>
                    <h3>{amount} руб.</h3>
                </div>

                <>
                    {user.cart.length
                        ?
                        <div className={styles.booksBlock}> {
                            page.map(book => (
                                <CartBookItem book={book} key={book.id} />
                            ))}
                        </div>
                        :
                        <div className={styles.empty}>
                            <p>Пусто</p>
                        </div>
                    }
                </>


                <Pagination books={user.cart} setPage={setPage} bookInPage={5} />
            </section>

        </Container >
    )
}