import styles from './CartBookItem.module.scss'
import { FC } from 'react'
import { motion } from 'framer-motion';
import { IBook } from '../../../types/IBookItem';


const plus =
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>

const minus = <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" /></svg>


export const CartBookItem: FC<{ book: IBook }> = ({ book }) => {

    return (
        <div className={styles.main}>
            <motion.div
                // initial={{ boxShadow: 'inset 0px 0px 14px rgba(139, 139, 139, 0.9)' }}
                // animate={{ boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.3)' }}
                transition={{ delay: 0.1 }}
                whileHover={{ boxShadow: '3px 3px 3px 3px rgba(0,0,0,0.3)', backgroundColor: '' }}
                className={styles.wrapper}
            >

                <div className={styles.imgBlock}>
                    <img src={book.image} alt={book.title} />
                </div>

                <div className={styles.description}>
                    <h3>{book.title}</h3>
                    <div className={styles.description__autorBlock}>
                        <p>Автор: </p>
                        <h4> {book.author}</h4>
                    </div>
                </div>

                <div className={styles.cardFooter}>
                    <div className={styles.sum}>
                        <motion.div whileHover={{ scale: 1.2 }}>
                            {minus}
                        </motion.div>

                        <p>0</p>

                        <motion.div whileHover={{ scale: 1.2, cursor: 'pointer' }}>
                            {plus}
                        </motion.div>
                    </div>

                    <div className={styles.price}>
                        <p>{book.price}руб.</p>
                    </div>
                </div>

            </motion.div>
        </div >
    )
}