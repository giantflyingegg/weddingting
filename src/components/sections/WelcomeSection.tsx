'use client'

import { motion } from 'framer-motion'
import styles from './Sections.module.css'

interface SectionProps {
  isActive: boolean;
}

export default function WelcomeSection({ isActive }: SectionProps) {
  return (
    <motion.div 
      className={styles.sectionContent}
      initial={{ opacity: 0, y: 20 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.5, y: 20 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={styles.sectionDecoration}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className={styles.decorativeLine} />
      </motion.div>
      
      <h1 className={styles.sectionTitle}>Thank You</h1>
      <h2 className={styles.sectionSubtitle}>For Celebrating Our Special Day</h2>
      
      <p className={styles.sectionText}>
        We're grateful that you were able to join us and make our wedding day so memorable.
        This site is a small token of our appreciation, featuring moments we shared together.
      </p>
      
      <div className={styles.videoPlaceholder}>
        <button className={styles.playButton} aria-label="Play welcome video">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
          </svg>
          Play Message
        </button>
      </div>
      
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
  )
}