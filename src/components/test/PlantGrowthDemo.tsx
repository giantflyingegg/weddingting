'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './PlantGrowthDemo.module.css'
import MidjourneyPlantDemo from './MidjourneyPlantDemo'

interface PlantDemoProps {
  growthProgress: number;
}

export default function PlantGrowthDemo() {
  const [growthProgress, setGrowthProgress] = useState(0);
  const [activeDemo, setActiveDemo] = useState('midjourney'); // Changed default to midjourney
  
  // Simulate scroll progress with buttons
  const incrementGrowth = () => {
    setGrowthProgress(prev => Math.min(prev + 0.2, 1));
  };
  
  const resetGrowth = () => {
    setGrowthProgress(0);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button 
          className={styles.button} 
          onClick={incrementGrowth}
        >
          Grow Plant ({Math.round(growthProgress * 100)}%)
        </button>
        
        <button 
          className={styles.button} 
          onClick={resetGrowth}
        >
          Reset
        </button>
        
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeDemo === 'basic' ? styles.activeTab : ''}`} 
            onClick={() => setActiveDemo('basic')}
          >
            Basic Demo
          </button>
          <button 
            className={`${styles.tab} ${activeDemo === 'advanced' ? styles.activeTab : ''}`} 
            onClick={() => setActiveDemo('advanced')}
          >
            Advanced Demo
          </button>
          <button 
            className={`${styles.tab} ${activeDemo === 'midjourney' ? styles.activeTab : ''}`} 
            onClick={() => setActiveDemo('midjourney')}
          >
            Midjourney SVG
          </button>
        </div>
      </div>
      
      <div className={styles.demoArea}>
        {activeDemo === 'basic' ? (
          <BasicPlantDemo growthProgress={growthProgress} />
        ) : activeDemo === 'advanced' ? (
          <AdvancedPlantDemo growthProgress={growthProgress} />
        ) : (
          <MidjourneyPlantDemo growthProgress={growthProgress} />
        )}
      </div>
      
      <div className={styles.explanation}>
        <h3>Animation Parameters:</h3>
        <ul>
          {activeDemo === 'midjourney' ? (
            <>
              <li>Main Stem: pathLength animation from 0 to {growthProgress.toFixed(2)}</li>
              <li>Secondary Branches: Appear when growth > 0.4</li>
              <li>Upper Branches: Appear when growth > 0.5</li>
              <li>Leaf Details: Scale from 0 to 1 when growth > 0.7</li>
              <li>Final Details: Staggered appearance when growth > 0.9</li>
            </>
          ) : (
            <>
              <li>Stem: pathLength animation from 0 to {growthProgress.toFixed(2)}</li>
              <li>Leaves: Scale from 0 to 1 when growth > 0.4</li>
              <li>Flower: Appears when growth > 0.8</li>
              <li>Petals: Staggered appearance with 0.1s delay between each</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

const BasicPlantDemo: React.FC<PlantDemoProps> = ({ growthProgress }) => {
  return (
    <svg width="200" height="300" viewBox="0 0 200 300" className={styles.plantSvg}>
      {/* Stem */}
      <motion.path
        d="M100,250 Q95,200 100,150 Q105,100 100,50"
        stroke="#5A7D63"
        strokeWidth={3}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: growthProgress }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Left Leaf */}
      <motion.path
        d="M100,150 Q80,140 70,150 Q80,160 100,150"
        fill="#D1DCCF"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: growthProgress > 0.4 ? 1 : 0,
          opacity: growthProgress > 0.4 ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: '100px 150px' }}
      />
      
      {/* Right Leaf */}
      <motion.path
        d="M100,150 Q120,140 130,150 Q120,160 100,150"
        fill="#D1DCCF"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: growthProgress > 0.5 ? 1 : 0,
          opacity: growthProgress > 0.5 ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: '100px 150px' }}
      />
      
      {/* Flower Center */}
      <motion.circle
        cx="100"
        cy="50"
        r="10"
        fill="#F0DFE0"
        initial={{ scale: 0 }}
        animate={{ scale: growthProgress > 0.8 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: '100px 50px' }}
      />
      
      {/* Flower Petals */}
      {[
        { id: "petal-1", cx: 85, cy: 45 },
        { id: "petal-2", cx: 115, cy: 45 },
        { id: "petal-3", cx: 95, cy: 35 },
        { id: "petal-4", cx: 105, cy: 35 }
      ].map((petal, index) => (
        <motion.circle
          key={petal.id}
          cx={petal.cx}
          cy={petal.cy}
          r="10"
          fill="#F0DFE0"
          initial={{ scale: 0 }}
          animate={{ 
            scale: growthProgress > 0.9 ? 1 : 0 
          }}
          transition={{ 
            duration: 0.3,
            delay: index * 0.1
          }}
          style={{ transformOrigin: `${petal.cx}px ${petal.cy}px` }}
        />
      ))}
    </svg>
  );
}

const AdvancedPlantDemo: React.FC<PlantDemoProps> = ({ growthProgress }) => {
  return (
    <svg width="240" height="320" viewBox="0 0 240 320" className={styles.plantSvg}>
      {/* Main Stem */}
      <motion.path
        d="M120,280 C120,240 125,200 120,160 C115,120 125,80 120,40"
        stroke="#5A7D63"
        strokeWidth={3}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: growthProgress }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Branch 1 - Left */}
      <motion.path
        d="M120,160 C100,150 80,155 60,150"
        stroke="#5A7D63"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: growthProgress > 0.4 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Branch 2 - Right */}
      <motion.path
        d="M120,100 C140,90 160,95 180,90"
        stroke="#5A7D63"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: growthProgress > 0.5 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Leaves will appear here */}
      <motion.path
        d="M60,150 C50,140 45,130 55,120 C65,110 75,120 60,150"
        fill="#D1DCCF"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: growthProgress > 0.6 ? 1 : 0,
          opacity: growthProgress > 0.6 ? 1 : 0 
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: '60px 150px' }}
      />
      
      <motion.path
        d="M180,90 C190,80 195,70 185,60 C175,50 165,60 180,90"
        fill="#D1DCCF"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: growthProgress > 0.7 ? 1 : 0,
          opacity: growthProgress > 0.7 ? 1 : 0 
        }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: '180px 90px' }}
      />
      
      {/* Flower */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: growthProgress > 0.9 ? 1 : 0 }}
        style={{ transformOrigin: '120px 40px' }}
        transition={{ duration: 0.5 }}
      >
        <circle cx="120" cy="40" r="15" fill="#F0DFE0" />
        <circle cx="105" cy="30" r="10" fill="#F0DFE0" />
        <circle cx="135" cy="30" r="10" fill="#F0DFE0" />
        <circle cx="105" cy="50" r="10" fill="#F0DFE0" />
        <circle cx="135" cy="50" r="10" fill="#F0DFE0" />
      </motion.g>
    </svg>
  );
}