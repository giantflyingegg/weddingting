'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './Sections.module.css'
import photoStyles from './PhotosSection.module.css'

interface SectionProps {
  isActive: boolean;
}

// Define event types
interface PhotoEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  photos: Photo[];
}

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

// Photo data organized by events
const photoEvents: PhotoEvent[] = [
  {
    id: 'ceremony',
    title: 'The Ceremony',
    date: '13/09/2024',
    description: 'Our beautiful church ceremony surrounded by family and friends.',
    photos: [
      { id: 1, src: '/images/placeholder-1.jpg', alt: 'Ceremony photo 1', caption: 'Wedding Ceremony' },
      { id: 2, src: '/images/placeholder-2.jpg', alt: 'Ceremony photo 2', caption: 'First Kiss' },
      { id: 3, src: '/images/placeholder-3.jpg', alt: 'Ceremony photo 3', caption: 'Walking Down the Aisle' },
      { id: 4, src: '/images/placeholder-4.jpg', alt: 'Ceremony photo 4', caption: 'Family Photo' },
      { id: 5, src: '/images/placeholder-5.jpg', alt: 'Ceremony photo 5', caption: 'Flower Girls' },
      { id: 6, src: '/images/placeholder-6.jpg', alt: 'Ceremony photo 6', caption: 'Ceremony Exit' },
    ]
  },
  {
    id: 'civil',
    title: 'Civil Wedding',
    date: '13/12/2024',
    description: 'Our intimate civil ceremony at the town hall.',
    photos: [
      { id: 7, src: '/images/placeholder-1.jpg', alt: 'Civil photo 1', caption: 'Signing Papers' },
      { id: 8, src: '/images/placeholder-2.jpg', alt: 'Civil photo 2', caption: 'Official Ceremony' },
      { id: 9, src: '/images/placeholder-3.jpg', alt: 'Civil photo 3', caption: 'With the Registrar' },
      { id: 10, src: '/images/placeholder-4.jpg', alt: 'Civil photo 4', caption: 'Small Reception' },
      { id: 11, src: '/images/placeholder-5.jpg', alt: 'Civil photo 5', caption: 'Family Witnesses' },
      { id: 12, src: '/images/placeholder-6.jpg', alt: 'Civil photo 6', caption: 'Celebratory Toast' },
    ]
  },
  {
    id: 'reception',
    title: 'The Reception',
    date: '28/04/2025',
    description: 'Our joyful celebration with dancing, dining and memories.',
    photos: [
      { id: 13, src: '/images/placeholder-1.jpg', alt: 'Reception photo 1', caption: 'Venue Entrance' },
      { id: 14, src: '/images/placeholder-2.jpg', alt: 'Reception photo 2', caption: 'First Dance' },
      { id: 15, src: '/images/placeholder-3.jpg', alt: 'Reception photo 3', caption: 'Cake Cutting' },
      { id: 16, src: '/images/placeholder-4.jpg', alt: 'Reception photo 4', caption: 'Evening Guests' },
      { id: 17, src: '/images/placeholder-5.jpg', alt: 'Reception photo 5', caption: 'Dancing' },
      { id: 18, src: '/images/placeholder-6.jpg', alt: 'Reception photo 6', caption: 'Farewell Send-off' },
    ]
  }
];

export default function PhotosSection({ isActive }: SectionProps) {
  const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const closeExpandedPhoto = () => {
    setExpandedPhoto(null);
  };

  // Handle snap scrolling within the PhotosSection
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    let touchStartY = 0;
    let touchEndY = 0;
    let isScrolling = false;
    let lastScrollTime = 0;
    const scrollCooldown = 1000; // ms to wait before allowing section change
    
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      // Get current time to track scroll frequency
      const now = Date.now();
      
      // Prevent the event from bubbling up to main scroll when in the middle of photo events
      if (activeEventIndex > 0 && activeEventIndex < photoEvents.length - 1) {
        e.preventDefault();
        e.stopPropagation();
      }
      
      // If at first photo event and scrolling up, allow main scroll to handle it
      if (activeEventIndex === 0 && e.deltaY < 0) {
        return;
      }
      
      // If at last photo event and scrolling down, check timing
      if (activeEventIndex === photoEvents.length - 1 && e.deltaY > 0) {
        // Only allow main scroll after cooldown period
        if (now - lastScrollTime < scrollCooldown) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          // Let the main scroll handle it
          lastScrollTime = now;
          return;
        }
      }
      
      // For all other cases, handle the scroll internally
      isScrolling = true;
      e.preventDefault(); // Prevent default scroll
      
      const direction = e.deltaY > 0 ? 1 : -1;
      
      setActiveEventIndex(prevIndex => {
        const newIndex = Math.max(0, Math.min(photoEvents.length - 1, prevIndex + direction));
        if (newIndex === photoEvents.length - 1 && direction > 0) {
          lastScrollTime = now; // Track when we reached the last photo event
        }
        return newIndex;
      });
      
      setTimeout(() => {
        isScrolling = false;
      }, 800); // Match duration with transition animation
    };
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      touchEndY = e.touches[0].clientY;
      
      // Similar logic to wheel event
      if (activeEventIndex > 0 && activeEventIndex < photoEvents.length - 1) {
        e.preventDefault();
      }
    };
    
    const handleTouchEnd = () => {
      if (isScrolling) return;
      
      const touchDiff = touchStartY - touchEndY;
      if (Math.abs(touchDiff) > 50) { // Minimum swipe distance
        // Direction (1 for down, -1 for up)
        const direction = touchDiff > 0 ? 1 : -1;
        
        // Similar logic to wheel event
        const now = Date.now();
        
        if (activeEventIndex === 0 && direction < 0) {
          return; // Allow main scroll to handle it
        }
        
        if (activeEventIndex === photoEvents.length - 1 && direction > 0) {
          if (now - lastScrollTime < scrollCooldown) {
            // Still in cooldown, handle internally
          } else {
            lastScrollTime = now;
            return; // Let the main scroll handle it
          }
        }
        
        isScrolling = true;
        
        setActiveEventIndex(prevIndex => {
          const newIndex = Math.max(0, Math.min(photoEvents.length - 1, prevIndex + direction));
          if (newIndex === photoEvents.length - 1 && direction > 0) {
            lastScrollTime = now;
          }
          return newIndex;
        });
        
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };
    
    // Add event listener with capture to intercept events before they bubble up
    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isActive, activeEventIndex]);
  
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

  // Parallax variants for transitioning between events
  const parallaxVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100vh' : '-100vh',
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease
      },
    },
    exit: (direction: number) => ({
      y: direction < 0 ? '100vh' : '-100vh',
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease
      },
    }),
  };

  // Handle direct navigation to specific event
  const navigateToEvent = (index: number) => {
    setActiveEventIndex(index);
  };
  
  return (
    <motion.div 
      className={styles.sectionContent}
      initial={{ opacity: 0 }}
      animate={isActive ? { opacity: 1 } : { opacity: 0.5 }}
      transition={{ duration: 0.8 }}
      ref={containerRef}
    >
      <h2 className={styles.sectionTitle}>Our Memories</h2>
      
      {/* Event indicator dots */}
      <div className={photoStyles.eventIndicators}>
        {photoEvents.map((event, index) => (
          <motion.div 
            key={event.id}
            className={photoStyles.eventIndicator}
            onClick={() => navigateToEvent(index)}
            animate={{ 
              scale: activeEventIndex === index ? 1.3 : 1,
              opacity: activeEventIndex === index ? 1 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      
      {/* Parallax container for photo events */}
      <div className={photoStyles.parallaxContainer}>
        {photoEvents.map((event, eventIndex) => (
          <motion.div
            key={event.id}
            className={photoStyles.eventContainer}
            custom={eventIndex - activeEventIndex}
            variants={parallaxVariants}
            initial="enter"
            animate={activeEventIndex === eventIndex ? "center" : "exit"}
            style={{ 
              display: Math.abs(eventIndex - activeEventIndex) <= 1 ? 'block' : 'none',
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <motion.h3 
              className={photoStyles.eventTitle}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {event.title}
              <span className={photoStyles.eventDate}>{event.date}</span>
            </motion.h3>
            
            <motion.p
              className={photoStyles.eventDescription}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {event.description}
            </motion.p>
            
            <motion.div 
              className={photoStyles.photoGrid}
              variants={containerVariants}
              initial="hidden"
              animate={isActive && activeEventIndex === eventIndex ? "visible" : "hidden"}
            >
              {event.photos.map((photo, index) => (
                <motion.div 
                  key={photo.id}
                  className={photoStyles.photoContainer}
                  variants={photoVariants}
                  style={{ 
                    // Position photos along curved paths with different patterns for each event
                    transform: `translateX(${Math.sin((index + (eventIndex * 2)) * 0.5) * 50}px) translateY(${Math.cos((index + (eventIndex * 3)) * 0.7) * 30}px)`,
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
          </motion.div>
        ))}
      </div>
      
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
              <span>
                {photoEvents.flatMap(event => event.photos).find(p => p.id === expandedPhoto)?.caption}
              </span>
            </div>
            <div className={photoStyles.photoCaption}>
              {photoEvents.flatMap(event => event.photos).find(p => p.id === expandedPhoto)?.caption}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}