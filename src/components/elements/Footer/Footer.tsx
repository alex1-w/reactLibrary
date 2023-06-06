import styles from './Footer.module.scss';
import footersLogo from '../../images/logo2.png';
import { motion } from 'framer-motion'
import { footersInfo } from './Footer.data'
import { Container } from '../../Container/Container';

export const Footer = () => {
    return (
        <footer>
            <div className={styles.wrapper} >

                <div className={styles.info}>

                    <div className={styles.logoBlock}>
                        <div>
                            <img src={footersLogo} alt="logo" />
                        </div>
                        <div className={styles.logoText}>
                            <p className={styles.logoText__bible}>БИБЛИОТЕЧНАЯ</p>
                            <p className={styles.secondText}>книжный магазин</p>
                        </div>
                    </div>

                    <div className={styles.mainInfo}> {footersInfo.map(item => (

                        <div className={styles.mainInfo__item} key={item.title}>
                            <h4>{item.title}</h4>
                            <ul>{
                                item.links.map(link => (
                                    <motion.li
                                        key={link.name}
                                        whileHover={{ scale: 1.1, color: 'rgb(220, 150, 22)' }}
                                    >
                                        <a href={link.link}><p className={styles.mainInfo__item__liText}>{link.name}</p></a>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                    
                    <div className={styles.phoneCall}>
                        <p>+38 (071) 339-16-26</p>
                        <motion.button whileHover={{ color: 'rgb(220, 150, 22)' }}>
                            <p>ЗАКАЗАТЬ ЗВОНОК</p>
                        </motion.button>
                    </div>
                </div>

                <div className={styles.rights}>
                    <p>Все права защищены © 2003-2021 БИБЛИОТЕЧНАЯ</p>
                    <p> Условия использования | Политика конфиденциальности</p>
                </div>
            </div>
        </footer>
    )
}