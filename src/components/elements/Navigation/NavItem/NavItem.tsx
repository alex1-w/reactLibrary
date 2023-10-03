import { FC, useState } from "react";
import { INavLink } from "../Navigation";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./NavItem.module.scss";
import { NavLink } from "react-router-dom";

interface INavProps {
    link: INavLink;
    description: string;
}

export const NavItem: FC<INavProps> = ({ link, description }) => {
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);

    return (
        <motion.li
            className={styles.liBlock}
            whileHover={{ scale: 1.3 }}
            onMouseEnter={() => setIsOpenDropdown(true)}
            onMouseLeave={() => setIsOpenDropdown(false)}
        >
            <NavLink
                to={link.link}
                className={({ isActive }) => (isActive ? "active" : "")}
            >
                <p>{link.name}</p>
            </NavLink>

            <AnimatePresence>
                {isOpenDropdown && (
                    <motion.div
                        className={styles.navDropdown}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <p>{description}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.li>
    );
};
