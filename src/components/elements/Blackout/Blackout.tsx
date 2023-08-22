import styles from './Blackout.module.scss';
import { motion, AnimatePresence } from 'framer-motion'

interface BlackoutProps {
    title?: string
    children?: React.ReactNode
}

export const Blackout = ({ children }: BlackoutProps) => {
    return (

            <div className={styles.main}>
                <motion.div
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.blackout}
                >
                    <div className={styles.blackoutContent}>
                        {children}
                    </div>
                </motion.div>
            </div>
    )
}