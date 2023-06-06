import { FC, useState } from "react";
import { INavLink } from "../Navigation";
import { AnimatePresence, motion } from 'framer-motion'
import styles from './NavItem.module.scss'
// import {}


interface INavProps {
    link: INavLink
}

export const NavItem: FC<INavProps> = ({ link }) => {

    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)


    return (
        <motion.li
        className={styles.liBlock}
            whileHover={{ scale: 1.3 }}
            onMouseEnter={() => setIsOpenDropdown(true)}
            onMouseLeave={() => setIsOpenDropdown(false)}
        >
            <a href={link.link}>
                <p>{link.name}</p>
            </a>

            <AnimatePresence>
                {isOpenDropdown &&
                    <motion.div
                        className={styles.navDropdown}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}

                    >
                        <p>grrg </p>
                    </motion.div>}
            </AnimatePresence>

        </motion.li >

    )
}