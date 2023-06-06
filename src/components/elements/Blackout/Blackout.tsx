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

            <div>
                <motion.div
                    initial={{ x: 1000 }}
                    animate={{ x: 0 }}
                    className={styles.blackout}
                />
                <div className={styles.blackoutContent}>
                    {children}
                </div>
            </div>
        </AnimatePresence>
    )
}