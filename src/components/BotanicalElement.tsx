'use client'

import { motion } from 'framer-motion'
import styles from './BotanicalElement.module.css'

interface BotanicalElementProps {
  position: 'left' | 'right';
  isVisible?: boolean;
}

export default function BotanicalElement({ 
  position, 
  isVisible = true 
}: BotanicalElementProps) {
  // Define the animation variants
  const variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  // Define the animation variants for the individual leaves
  const leafVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  // Different paths for left and right positions
  const svgPath = position === 'left' 
    ? "M10,100 Q40,70 30,40 Q20,20 40,10 M30,40 Q50,30 70,40 M30,40 Q35,60 50,65" 
    : "M90,100 Q60,70 70,40 Q80,20 60,10 M70,40 Q50,30 30,40 M70,40 Q65,60 50,65";

  return (
    <div className={`${styles.container} ${styles[position]}`}>
      <motion.svg
        className={styles.svg}
        width="100"
        height="200"
        viewBox="0 0 100 200"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={variants}
      >
        {/* Main stem */}
        <motion.path
          d={svgPath}
          stroke="var(--color-interactive)"
          strokeWidth="1.5"
          fill="none"
          variants={leafVariants}
          custom={0}
        />
        
        {/* Leaves */}
        {position === 'left' ? (
          <>
            <motion.ellipse
              cx="40"
              cy="10"
              rx="5"
              ry="8"
              transform="rotate(-30 40 10)"
              fill="var(--color-accent-sage)"
              variants={leafVariants}
              custom={1}
            />
            <motion.ellipse
              cx="70"
              cy="40"
              rx="6"
              ry="9"
              transform="rotate(20 70 40)"
              fill="var(--color-accent-sage)"
              variants={leafVariants}
              custom={2}
            />
            <motion.ellipse
              cx="50"
              cy="65"
              rx="5"
              ry="8"
              transform="rotate(-10 50 65)"
              fill="var(--color-accent-sage)"
              variants={leafVariants}
              custom={3}
            />
          </>
        ) : (
          <>
            <motion.ellipse
              cx="60"
              cy="10"
              rx="5"
              ry="8"
              transform="rotate(30 60 10)"
              fill="var(--color-accent-sage)"
              variants={leafVariants}
              custom={1}
            />
            <motion.ellipse
              cx="30"
              cy="40"
              rx="6"
              ry="9"
              transform="rotate(-20 30 40)"
              fill="var(--color-accent-sage)"
              variants={leafVariants}
              custom={2}
            />
            <motion.ellipse
              cx="50"
              cy="65"
              rx="5"
              ry="8"
              transform="rotate(10 50 65)"
              fill="var(--color-accent-sage)"
              variants={leafVariants}
              custom={3}
            />
          </>
        )}
      </motion.svg>
    </div>
  );
}