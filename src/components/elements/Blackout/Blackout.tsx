import styles from './Blackout.module.scss';
import { motion, AnimatePresence } from 'framer-motion'

interface BlackoutProps {
    title?: string
    children?: React.ReactNode
    // loginClosed: () => void
}

export const Blackout = ({ children }: BlackoutProps) => {
    return (
        <AnimatePresence>

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
        </AnimatePresence>
    )
}