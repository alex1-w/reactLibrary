import styles from '../Navigation/Navigation.module.scss';
import { AnimatePresence, motion } from 'framer-motion'
import { NavItem } from './NavItem/NavItem';

export interface INavLink {
    name: string,
    link: string
    description: string
}

export const navLinks: INavLink[] = [
    {
        name: 'Акции',
        link: '/discount',
        description: 'jirfegbviuwe erngetrhwetrgewrjkgewr gnrmeghrejkgre'
    },
    {
        name: 'Каталог',
        link: '/catalog',
        description: 'fknle bjgreboievr jvd jsdvk sdcvk lsdc kdscv'
    },
    {
        name: 'Доставка',
        link: '/delivery',
        description: 'fdbjgre ngre ngreiegjegriohregj ewv jksdv kosdv'
    },
    {
        name: 'О магазине',
        link: `/about`,
        description: '54bherg87fewfd dfshisf'
    },
    {
        name: "Блог",
        link: `/blog`,
        description: '32 43543534 fewef gnrmeghrejkgre'
    }
]

export const Navigation = () => {
    return (
        <nav className={styles.main}>

            <ul className={styles.linksBlock}>
                {navLinks.map(link => (
                    <NavItem link={link} key={link.name} description={link.description} />
                ))}
            </ul>

        </nav>
    )
}