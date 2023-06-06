import { useContext } from "react"
import { UserContext } from "../../providers/UserProvider"
import { BookItem } from "../../components/elements/BookItem/BookItem"
import { Container } from "../../components/Container/Container"
import styles from './FavoritesBlock.module.scss'

export const FavoritesBlock = () => {
    const { user } = useContext(UserContext)

    console.log(user.favorites);


    return (
        <Container>

            {user.favorites ?
                <div className={styles.favoriteBlock}>

                    {user.favorites.map(book => (
                        <div className={styles.main} key={book.id}>
                            <div className={styles.wrapper}>

                                <div className={styles.imgBlock}>
                                    <img src={book.image} alt={book.author} />
                                </div>

                                <div className={styles.description}>
                                    <h3>{book.title}</h3>
                                    <div className={styles.description__autorBlock}>
                                        <p>Автор: </p>
                                        <h4> {book.author}</h4>
                                    </div>
                                </div>

                                <div className={styles.price}>
                                    <p>{book.price}руб.</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div> :
                <div className={styles.empty}>
                    <h2>пусто...</h2>
                </div>
            }
        </Container>
    )
}