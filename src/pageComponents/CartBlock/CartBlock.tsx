import { FC, useContext } from 'react'
import styles from './CartBlock.module.scss'
import { UserContext } from '../../providers/UserProvider'
import { BookItem } from '../../components/elements/BookItem/BookItem'
import { Container } from '../../components/Container/Container'
import { CartBookItem } from '../../components/elements/CartBookItem/CartBookItem'

export const CartBlock: FC = () => {
    const { user } = useContext(UserContext)
    // console.log(user.cart);


    const amount = user.cart.reduce((total, nextPrice) => total + nextPrice.price, 0)


    // console.log(user.cart);

    return (
        <Container>
            <section className={styles.mainBlock}>
                <div className={styles.amountPrice}>
                    <h2>Итого:</h2>
                    <h3>{amount} руб.</h3>
                </div>

                <div className={styles.wrapper}>

                    {user.cart.length > 0 ? user.cart.map(book => (
                        // <BookItem book={book} key={book.id} />
                        <CartBookItem book={book} key={book.id} />
                    )) :
                        <div>
                            <p>Пусто</p>
                        </div>
                    }

                </div>
            </section>
        </Container>
    )
}