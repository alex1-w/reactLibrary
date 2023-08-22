import styles from './UserAccount.module.scss';
import { useContext, useState } from 'react'
import { FiLogIn } from "react-icons/fi"
import { FavoritesDropdown } from '../FavoritesDropdown/FavoritesDropdown';
import { arrowDown, cartIcon, exitIcon, likeIcon } from './UserIcons';
import { UserContext } from '../../../providers/UserProvider';
import { enqueueSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

export const UserAccount = ({ loginOpened }: { loginOpened: () => void }) => {
    const { isLogin, setIsLogin, user, openDropdownName, setOpenDropdownName } = useContext(UserContext)
    const [openedFav, setOpenedFav] = useState<boolean>(false)
    console.log(user.cash);

    const exitFunc = () => {
        localStorage.removeItem('user')
        setIsLogin(false)
        return enqueueSnackbar('Вы вышли из системы', { variant: "info" })
    }

    const showFav = () => {
        setOpenDropdownName('favoritesDropdown')
        console.log(openDropdownName);
        setOpenedFav(!openedFav)
        if (openDropdownName === 'searchDropdown') setOpenedFav(false)
    }

    return (
        <div>
            {!isLogin
                ?
                <div onClick={() => loginOpened()} className={styles.enter}>

                    <p>Вход</p>
                    <FiLogIn size={30} color='#241400' />

                </div>
                :
                <div className={styles.userInterface}>

                    <div className={styles.cashBlock}>
                        {arrowDown}
                        <p>{`${user?.cash} руб.`}</p>
                    </div>

                    <div className={styles.likeIconBlock} onClick={showFav}>
                        {likeIcon}

                        {openedFav && user.favorites.length > 0 && <FavoritesDropdown />}
                        {openedFav && user.favorites.length === 0 && <FavoritesDropdown />}
                    </div>

                    <Link to={'/cart'} className={styles.cartIcon}>
                        {cartIcon}
                    </Link>

                    <div className={styles.exit} onClick={exitFunc}>
                        {exitIcon}
                    </div>

                </div>}
        </div>

    )
}