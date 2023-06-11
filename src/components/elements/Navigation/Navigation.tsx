import styles from '../Navigation/Navigation.module.scss';
import { AnimatePresence, motion } from 'framer-motion'
import { NavItem } from './NavItem/NavItem';

export interface INavLink {
    name: string,
    link: string
}

export const navLinks: INavLink[] = [
    {
        name: 'Акции',
        link: '/discount'
    },
    {
        name: 'Каталог',
        link: '/catalog'
    },
    {
        name: 'Доставка',
        link: '/delivery'
    },
    {
        name: 'О магазине',
        link: `/about`
    },
    {
        name: "Блог",
        link: `/blog`
    }
]

export const Navigation = () => {
    return (
        <nav className={styles.main}>

            <ul className={styles.linksBlock}>
                {navLinks.map(link => (
                    <NavItem link={link} key={link.name} />
                ))}
            </ul>

        </nav>
    )
}