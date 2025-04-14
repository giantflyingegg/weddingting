// src/components/Botanical.tsx
'use client'

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './Botanical.module.css'

interface BotanicalProps {
  activeSection: number;
}

export default function Botanical({ activeSection }: BotanicalProps) {
  const controls = useAnimation();
  const finalElementControls = useAnimation();
  
  // Animation for sections 2-3 (now using cornerbunch.svg)
  useEffect(() => {
    const animatePosition = async () => {
      if (activeSection < 1) {
        await controls.start({ 
          y: '150vh',
          opacity: 0,
          transition: { duration: 0.8, ease: 'easeInOut' }
        });
      } 
      else if (activeSection === 1) {
        await controls.start({ 
          y: '75vh',
          opacity: 1,
          transition: { duration: 0.8, ease: 'easeOut' }
        });
      } 
      else if (activeSection === 2) {
        await controls.start({ 
          y: '25vh',
          opacity: 1,
          transition: { duration: 0.8, ease: 'easeInOut' }
        });
      } 
      else if (activeSection >= 3) {
        await controls.start({ 
          y: '-50vh',
          opacity: 0,
          transition: { duration: 0.8, ease: 'easeIn' }
        });
      }
    };

    animatePosition();
  }, [activeSection, controls]);

  // Animation for section 4 (now using colourstemflower.svg)
  useEffect(() => {
    const animateFinalElement = async () => {
      if (activeSection === 3) {
        await finalElementControls.start({
          y: '75vh',
          opacity: 1,
          transition: { duration: 0.8, ease: 'easeOut' }
        });
      } else {
        await finalElementControls.start({
          y: '150vh',
          opacity: 0,
          transition: { duration: 0.8, ease: 'easeIn' }
        });
      }
    };

    animateFinalElement();
  }, [activeSection, finalElementControls]);

  return (
    <>
      {/* Static top corner element */}
      <div className={styles.topCornerContainer}>
        <img 
          src="/images/topcornerbunch.svg" 
          alt="Decorative floral element - top" 
          className={styles.topCornerImage}
        />
      </div>

      {/* Static bottom left element */}
      <div className={styles.bottomLeftContainer}>
        <img 
          src="/images/topcornerbunch.svg" 
          alt="Decorative floral element - bottom left" 
          className={styles.bottomLeftImage}
        />
      </div>

      {/* Animated element for pages 2-3 (now cornerbunch.svg) */}
      <motion.div 
        className={styles.container}
        animate={controls}
        initial={{ y: '150vh', opacity: 0 }}
      >
        <img 
          src="/images/cornerbunch.svg" 
          alt="Decorative floral element - animated" 
          className={styles.image}
        />
      </motion.div>

      {/* Final animated element for page 4 (now colourstemflower.svg) */}
      <motion.div
        className={styles.finalContainer}
        animate={finalElementControls}
        initial={{ y: '150vh', opacity: 0 }}
      >
        <img
          src="/images/colourstemflower.svg"
          alt="Decorative floral element - final page"
          className={styles.finalImage}
        />
      </motion.div>
    </>
  );
}