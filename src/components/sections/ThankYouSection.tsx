'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from '../sections/Sections.module.css'
import thankYouStyles from './ThankYouSection.module.css'

interface SectionProps {
  isActive: boolean;
}

export default function ThankYouSection({ isActive }: SectionProps) {
  // Use state to store generated heart positions
  const [hearts, setHearts] = useState<{ left: string, width: string, height: string }[]>([]);
  
  // Generate heart positions on client-side only
  useEffect(() => {
    const generateHearts = () => {
      return [...Array(15)].map(() => ({
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 20 + 10}px`,
        height: `${Math.random() * 20 + 10}px`
      }));
    };
    
    setHearts(generateHearts());
  }, []);

  return (
    <motion.div 
      className={styles.sectionContent}
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className={thankYouStyles.container}>
        <div className={thankYouStyles.hearts}>
          {hearts.map((heart, i) => (
            <motion.div
              key={i}
              className={thankYouStyles.heart}
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={isActive ? {
                opacity: 1,
                scale: 1,
                y: [0, -100, -200],
              } : { opacity: 0 }}
              transition={{
                duration: 10,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{
                left: heart.left,
                width: heart.width,
                height: heart.height
              }}
            />
          ))}
        </div>
        
        <motion.div
          className={thankYouStyles.contentContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className={thankYouStyles.names}>Abby and Kieran Sweetman</h2>
          <p className={thankYouStyles.date}>13/09/2024</p>
          <p className={thankYouStyles.date}>13/12/2024</p>
          <p className={thankYouStyles.date}>28/04/2025</p>
          <p className={thankYouStyles.thankYouText}>
            Thank you once again for being part of our special day. We hope these memories bring you as much joy as they bring us.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}