'use client'

import { motion } from 'framer-motion'
import styles from './IntroSection.module.css'

interface SectionProps {
  isActive: boolean;
}

export default function IntroSection({ isActive }: SectionProps) {
  return (
    <motion.div 
      className={styles.introContainer}
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={styles.introContent}
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className={styles.introTitle}>Welcome</h1>
        <p className={styles.introText}>
          Thank you for visiting our wedding thank you site
        </p>
        
        <motion.div 
          className={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }} 
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut" 
          }}
        >
          <span>Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}