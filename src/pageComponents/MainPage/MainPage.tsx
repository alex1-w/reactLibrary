import styles from './MainPage.module.scss'
import { motion } from 'framer-motion'
import { Tooltip as Socialtooltip } from 'react-tooltip'
import { Fragment } from 'react'
import { catalog, socialLinks, reciepts, aboutStore } from '../../data/MainPage.data'
import { Slider } from '../../components/elements/Slider/Slider'
import { Container } from '../../components/Container/Container'
import { PromoSwiper } from '../../components/elements/PromoSwiper/PromoSwiper'
import { Link } from 'react-router-dom'

export const MainPage = () => {

    return (
        <Container>
            <main>

                <section className={styles.promo}>

                    <div className={styles.promo__text}>
                        <h1>Книги от А&nbsp;до&nbsp;Я</h1>
                        <p className={styles.promo__subtext}>В нашем магазине можно найти книгу на любой вкус. Большой ассортимент. Приятные цены. Интересные сюжеты.</p>
                        <Link to={`/catalog`} className={styles.catalogBtn}>
                            <p>Перейти в каталог</p>
                        </Link>
                    </div>

                    <div className={styles.promo__slider}>
                        <PromoSwiper />
                    </div>
                </section>

                <section className={styles.recieptSliderBlock}>

                    <div className={styles.recieptSliderBlock__head}>
                        <h4>Горячие&nbsp;поступления</h4>
                        <ul className={styles.recieptSliderBlock__list}>
                            {reciepts.map(reciept => (
                                <li key={reciept.name}>
                                    <a href={reciept.link}>
                                        <p>{reciept.name}</p>
                                    </a>
                                </li>))}
                        </ul>
                    </div>

                    <Slider />

                </section>

                <section className={styles.catalogBlock}>

                    <h2>Каталог</h2>
                    <div className={styles.catalogBlock__grid}>
                        {catalog.map(item => (
                            <Link to={item.link} key={item.name}>
                                <motion.div
                                    className={styles.catalogBlock__item}
                                    whileHover={{ scale: 1.3 }}
                                >
                                    <p>{item.name}</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                </section>

                <section className={styles.about}>

                    <div className={styles.about__storeBlock}>
                        <h3>О магазине</h3>
                        <div className={styles.about__storeBlock__store}>
                            {aboutStore.map(item => (
                                <div className={styles.about__storeBlock__item} key={item.name}>
                                    <p className={styles.about__storeBlock__amount}>{item.amount}</p>
                                    <p className={styles.about__storeBlock__name}>{item.name}</p>
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className={styles.delivery}>

                        <h3>Доставка</h3>
                        <p>
                            Работаем без праздников и выходных! Жители Киева могут получить заказ уже в день его оформления.
                            Клиенты из других городов Украины могут получить заказ в течение 1-5 дней в зависимости от местонахождения населенного пункта и выбранного способа доставки. Заказы на сумму свыше 1000 грн доставляются бесплатно*.
                            Доступные способы, точные сроки и стоимость доставки Вы можете увидеть во время оформления заказа в корзине заказа, после выбора города доставки.
                        </p>
                        <Link to="/">Подробнее</Link>

                    </div>

                    <div className={styles.social}>

                        <h3>Следите за нами в социальных сетях</h3>

                        <div className={styles.socialLinks}>
                            {socialLinks.map(item => (
                                <Fragment key={item.name}>
                                    <Link to={item.link}
                                    >
                                        <motion.div
                                            className="my-anchor-element"
                                            data-tooltip-content={item.name}
                                            data-tooltip-id='name'
                                            whileHover={{ scale: 1.3 }}
                                        >
                                            <img src={item.logo} alt={item.name} />
                                        </motion.div>
                                    </Link>
                                    <Socialtooltip id='name' className={styles.socialLinks__tooltip} />
                                </Fragment>
                            ))}
                        </div>
                    </div>

                </section>
            </main>
        </Container>
    )
}