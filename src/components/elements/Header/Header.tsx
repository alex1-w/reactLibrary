import styles from './Header.module.scss';
import logo from '../../images/logo.png';
import { useContext, useState } from "react"
import { BsSearch } from "react-icons/bs"
import { Navigation } from '../Navigation/Navigation';
import { LogIn } from '../LogIn/LogIn';
import { Blackout } from '../Blackout/Blackout';
import { BurgerMenu } from '../../UI/BurgerMenu/BurgerMenu';
import { UserAccount } from '../UserAccount/UserAccount';
import { UserContext } from '../../../providers/UserProvider';
import { Input } from '../Input/Input';
import { Container } from '../../Container/Container';

export const Header = () => {
    const { isLogin } = useContext(UserContext)
    const [opened, setOpened] = useState<boolean>(false)
    const loginOpened = () => setOpened(true)
    const closeBtn = () => setOpened(false)

    return (
        <header>
            <div className={styles.wrapper}>

                <div className={styles.logoBlock}>
                    <a href='/' className={styles.logoBlock__logo}>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className={styles.logoText}>
                            <p className={styles.logoText__bible}>БИБЛИОТЕЧНАЯ</p>
                            <p className={styles.secondText}>книжный магазин</p>
                        </div>
                    </a>
                </div>

                <Navigation />

                <Input />
                <div className={styles.userInterfaceBlock}>

                    <UserAccount loginOpened={loginOpened} />
                    {opened && !isLogin &&
                        <Blackout>
                            <LogIn closeBtn={closeBtn} />
                        </Blackout>
                    }

                </div>

                <div className={styles.burgerMenu}>
                    <BurgerMenu />
                </div>

                {/* <div>
                    <p className={styles.phoneNumber}>56435463546</p>
                </div> */}

            </div>
        </header >
    )
}