import { useContext } from "react"
import { UserContext } from "../../providers/UserProvider"
import { Container } from "../../components/Container/Container"
import styles from './FavoritesBlock.module.scss'
import { CartBookItem } from "../../components/elements/CartBookItem/CartBookItem"

export const FavoritesBlock = () => {
    const { user } = useContext(UserContext)

    console.log(user.favorites);


    return (
        <Container>

       <div className={styles.main}>
                
                {user.favorites ?
                    <div className={styles.favoriteBlock}>
                        {user.favorites.map(book => (<CartBookItem book={book} />))}
                    </div>
                    :
                    <div className={styles.empty}>
                        <h2>пусто...</h2>
                    </div>
                }
    
       </div>
        </Container>
    )
}