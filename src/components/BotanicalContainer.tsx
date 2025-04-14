'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import BotanicalElement from './BotanicalElement'
import styles from './BotanicalContainer.module.css'

export default function BotanicalContainer() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Add a small delay before displaying the botanical elements
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <BotanicalElement position="left" isVisible={isVisible} />
        <BotanicalElement position="left" isVisible={isVisible} />
        <BotanicalElement position="left" isVisible={isVisible} />
      </div>
      <div className={styles.right}>
        <BotanicalElement position="right" isVisible={isVisible} />
        <BotanicalElement position="right" isVisible={isVisible} />
        <BotanicalElement position="right" isVisible={isVisible} />
      </div>
      
      {/* Corner piece - fixed at bottom left */}
      <div className={styles.cornerPiece}>
        <Image 
          src="/images/corner.svg" 
          alt="Decorative corner piece" 
          width={200} 
          height={200}
          priority
        />
      </div>
    </div>
  );
}
