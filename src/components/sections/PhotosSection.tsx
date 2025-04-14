'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Sections.module.css'
import photoStyles from './PhotosSection.module.css'

interface SectionProps {
  isActive: boolean;
}

// Placeholder photos data
const photos = [
  { id: 1, src: '/images/placeholder-1.jpg', alt: 'Wedding photo 1', caption: 'The Ceremony' },
  { id: 2, src: '/images/placeholder-2.jpg', alt: 'Wedding photo 2', caption: 'First Dance' },
  { id: 3, src: '/images/placeholder-3.jpg', alt: 'Wedding photo 3', caption: 'Cake Cutting' },
  { id: 4, src: '/images/placeholder-4.jpg', alt: 'Wedding photo 4', caption: 'Family Photo' },
  { id: 5, src: '/images/placeholder-5.jpg', alt: 'Wedding photo 5', caption: 'Evening Reception' },
  { id: 6, src: '/images/placeholder-6.jpg', alt: 'Wedding photo 6', caption: 'Farewell' },
];

export default function PhotosSection({ isActive }: SectionProps) {
  const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);
  
  const closeExpandedPhoto = () => {
    setExpandedPhoto(null);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const photoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };
  
  return (
    <motion.div 
      className={styles.sectionContent}
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className={styles.sectionTitle}>Our Memories</h2>
      
      <motion.div 
        className={photoStyles.photoGrid}
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {photos.map((photo, index) => (
          <motion.div 
            key={photo.id}
            className={photoStyles.photoContainer}
            variants={photoVariants}
            style={{ 
              // Position photos along curved paths
              transform: `translateX(${Math.sin(index * 0.5) * 50}px) translateY(${Math.cos(index * 0.7) * 30}px)`,
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            onClick={() => setExpandedPhoto(photo.id)}
          >
            <div className={photoStyles.photoPlaceholder}>
              <span>{photo.caption}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {expandedPhoto && (
        <div className={photoStyles.expandedPhotoOverlay} onClick={closeExpandedPhoto}>
          <motion.div 
            className={photoStyles.expandedPhotoContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={photoStyles.closeButton} onClick={closeExpandedPhoto} aria-label="Close photo">
              &times;
            </button>
            <div className={photoStyles.expandedPhotoPlaceholder}>
              <span>{photos.find(p => p.id === expandedPhoto)?.caption}</span>
            </div>
            <div className={photoStyles.photoCaption}>
              {photos.find(p => p.id === expandedPhoto)?.caption}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}