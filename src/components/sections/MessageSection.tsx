'use client'

import { motion } from 'framer-motion'
import styles from './Sections.module.css'
import messageStyles from './MessageSection.module.css'

interface SectionProps {
  isActive: boolean;
}

export default function MessageSection({ isActive }: SectionProps) {
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
      
      <h2 className={styles.sectionTitle}>Our Message</h2>
      
      <div className={messageStyles.messageCard}>
        <motion.div
          className={messageStyles.messageBorder}
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        <p className={messageStyles.messageText}>
          Dear friends and family,
        </p>
        
        <p className={messageStyles.messageText}>
          We wanted to take a moment to express our deepest gratitude for your presence 
          and participation in our wedding celebration. Your love, support, and joyful 
          energy made our special day truly magical and unforgettable.
        </p>
        
        <p className={messageStyles.messageText}>
          Each of you brought something unique and meaningful to our celebration. 
          Whether you traveled from afar or helped with preparations, your contribution 
          to our day was invaluable and deeply appreciated.
        </p>
        
        <p className={messageStyles.messageText}>
          As we begin this new chapter of our lives together, we're grateful to have 
          all of you as part of our story. Your ongoing love and support mean the world to us.
        </p>
        
        <p className={messageStyles.messageSignature}>
          With love and appreciation,
        </p>
        
        <p className={messageStyles.messageSignature}>
          [Your Names]
        </p>
      </div>
    </motion.div>
  )
}