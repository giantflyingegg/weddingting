import React from 'react';
import { motion } from 'framer-motion';

interface PlantElementProps {
  growthProgress: number;
  growthThreshold: number;
  children: React.ReactNode;
  type: 'stem' | 'leaves';
}

const PlantElement: React.FC<PlantElementProps> = ({ 
  growthProgress, 
  growthThreshold, 
  children,
  type 
}) => {
  // Determine if this element should be visible based on growth threshold
  const isVisible = growthProgress >= growthThreshold;
  
  // Different animation for stems vs leaves
  const animation = type === 'stem' 
    ? {
        // For stems, use pathLength for drawing effect
        initial: { pathLength: 0, opacity: 0 },
        animate: { 
          pathLength: isVisible ? Math.min(1, (growthProgress - growthThreshold) * 5) : 0,
          opacity: isVisible ? 1 : 0 
        },
        transition: { duration: 0.5 }
      }
    : {
        // For leaves, use scale and opacity
        initial: { scale: 0, opacity: 0 },
        animate: { 
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0 
        },
        transition: { duration: 0.4 }
      };
      
  return (
    <motion.g {...animation}>
      {children}
    </motion.g>
  );
};

export default PlantElement;