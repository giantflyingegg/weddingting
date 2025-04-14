// MidjourneyPlantDemo.tsx
import React from 'react';
import { motion } from 'framer-motion';

// PlantElement component for stem animation
const StemElement = ({ 
  growthProgress, 
  growthThreshold,
  children
}) => {
  const isVisible = growthProgress >= growthThreshold;
  
  return (
    <motion.g
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: isVisible ? Math.min(1, (growthProgress - growthThreshold) * 3) : 0,
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.g>
  );
};

// LeafElement component with specific transform origin
const LeafElement = ({ 
  growthProgress, 
  growthThreshold,
  transformOrigin,
  children
}) => {
  const isVisible = growthProgress >= growthThreshold;
  
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isVisible ? 1 : 0,
        opacity: isVisible ? 1 : 0 
      }}
      style={{ transformOrigin }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.g>
  );
};

interface MidjourneyPlantDemoProps {
  growthProgress: number;
}

const MidjourneyPlantDemo: React.FC<MidjourneyPlantDemoProps> = ({ growthProgress }) => {
  return (
    <svg 
      width="700" 
      height="1200" 
      viewBox="180 300 700 1200" 
      xmlns="http://www.w3.org/2000/svg" 
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      {/* Main stem */}
      <StemElement
        growthProgress={growthProgress}
        growthThreshold={0}
      >
        <path
          d="M480.49,1210.17 C480.49,1210.17 480.64,1211.71 480.64,1211.71 C479.82,1209.35 479.39,1208.19 478.61,1206.24 C467.51,1179.03 451.81,1139.98 446.85,1126.19 C444.22,1118.49 441.44,1106.19 439.71,1096.47 C437.01,1081.37 431.46,1051.73 428.62,1037.19 C426.76,1027.02 422.15,984.95 422.11,984.09 C421.77,976.67 421.14,962.89 421.34,958.05 C422.10,943.28 424.11,911.24 425.26,900.99 C426.14,893.67 429.27,879.16 431.10,872.57 C432.76,867.21 437.19,851.66 438.13,847.46 C439.69,840.41 441.54,826.82 441.75,820.01 C441.88,815.31 438.70,778.04 436.65,763.94 C435.39,756.21 432.58,741.55 431.14,734.34 C429.36,724.24 428.48,715.45 427.92,704.50 C427.63,696.98 427.10,683.55 426.47,678.46 C425.63,671.06 423.47,651.14 423.16,646.86 C422.67,639.64 423.20,622.94 423.45,620.37 C424.03,614.45 426.17,601.69 427.73,595.51 C428.87,591.02 441.17,555.08 444.94,547.42 C447.66,542.36 453.70,530.59 457.03,523.89 C461.33,515.53 495.00,464.33 503.95,450.68 C513.13,436.08 531.08,401.78 532.57,397.59 C533.19,395.83 538.07,381.08 539.87,374.51 C542.27,365.60 547.76,349.54 547.92,348.58 C547.92,348.58 549.36,349.63 549.36,349.63 C549.36,349.63 550.21,349.48 550.21,349.48"
          fill="none"
          stroke="var(--color-interactive)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
      </StemElement>
      
      {/* Bottom leaf - first to grow */}
      <LeafElement
        growthProgress={growthProgress}
        growthThreshold={0.2}
        transformOrigin="450px 960px"
      >
        <path
          d="M422.56,992.88 C422.66,992.62 422.68,992.59 422.68,992.58 C422.71,990.08 429.62,979.20 433.26,973.49 C438.49,965.37 445.07,957.09 445.25,956.94 C445.25,956.94 444.66,959.78 444.66,959.78 C444.66,959.78 445.55,958.37 445.55,958.37 C444.27,956.76 442.79,951.26 442.53,949.64 C442.08,946.91 441.22,941.70 441.43,938.90 C441.90,933.54 442.61,921.67 443.12,914.78 C443.43,909.41 446.64,895.96 447.47,893.70 C450.10,886.90 464.19,857.33 471.62,845.75 C473.58,842.72 487.74,823.68 489.85,821.14 C494.44,815.63 504.91,805.89 510.24,801.60 C516.18,796.89 526.03,791.46 530.82,788.88 C540.34,783.65 548.90,779.91 554.75,778.19 C562.92,775.88 572.98,773.80 580.66,772.25 C584.63,771.48 624.36,768.53 626.92,767.90 C628.09,767.61 631.35,766.72 631.60,766.77 C631.63,767.40 630.48,772.35 630.05,774.60 C628.98,778.41 623.38,787.23 620.73,791.48 C615.38,799.14 612.50,802.67 609.22,809.07 C607.15,813.21 602.46,826.14 600.90,829.08 C599.50,831.67 592.71,843.88 589.20,849.80 C587.60,852.49 575.30,868.88 574.83,869.45 C569.02,876.28 550.07,894.58 541.41,901.58 C537.73,904.54 519.29,916.71 518.57,917.15 C507.18,923.64 484.20,937.12 472.63,944.10 C471.40,944.81 456.77,952.26 452.37,954.70 C451.73,955.02 446.95,956.83 445.86,958.27 C445.86,958.27 446.44,955.46 446.44,955.46"
          fill="none"
          stroke="var(--color-accent-sage)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
      </LeafElement>
      
      {/* Mid-section leaf - grows second */}
      <LeafElement
        growthProgress={growthProgress}
        growthThreshold={0.3}
        transformOrigin="480px 850px"
      >
        <path
          d="M485.82,905.63 C485.82,905.63 485.64,906.01 485.64,906.01 C486.67,900.35 489.14,881.48 489.75,877.96 C491.74,867.33 493.36,860.34 494.92,853.62 C496.85,845.91 511.45,807.68 511.70,807.11 C514.19,801.30 517.15,797.02 517.84,796.06 C517.84,796.06 517.37,796.89 517.37,796.89"
          fill="none"
          stroke="var(--color-accent-blush)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
        <path
          d="M498.79,885.34 C498.79,885.34 498.47,886.04 498.47,886.04 C498.54,885.79 499.73,871.92 500.40,866.12 C501.23,859.76 509.52,833.94 515.03,819.58 C517.73,813.36 523.10,800.19 526.91,794.71 C528.07,793.05 531.55,788.51 532.28,787.58 C532.28,787.58 532.18,787.50 532.18,787.50"
          fill="none"
          stroke="var(--color-accent-blush)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
      </LeafElement>
      
      {/* Upper-section leaf - grows third */}
      <LeafElement
        growthProgress={growthProgress}
        growthThreshold={0.4}
        transformOrigin="520px 770px"
      >
        <path
          d="M515.01,863.21 C514.94,863.24 515.74,857.81 516.02,855.82 C518.35,839.13 521.37,824.60 522.03,822.92 C522.67,821.32 528.52,807.39 528.99,806.96 C528.99,806.96 528.77,807.24 528.77,807.24 C528.77,807.24 528.94,806.75 528.94,806.75"
          fill="none"
          stroke="var(--color-accent-lavender)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
        <path
          d="M528.02,851.05 C528.02,851.05 527.89,851.24 527.89,851.24 C527.72,848.77 528.45,842.88 528.84,839.99 C529.56,833.84 531.26,820.83 532.99,815.13 C534.02,811.80 536.62,805.99 536.87,805.31 C536.87,805.31 536.30,805.83 536.30,805.83"
          fill="none"
          stroke="var(--color-accent-lavender)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
      </LeafElement>
      
      {/* Top leaf - grows last */}
      <LeafElement
        growthProgress={growthProgress}
        growthThreshold={0.5}
        transformOrigin="550px 650px"
      >
        <path
          d="M534.23,849.91 C534.23,849.91 533.99,849.96 533.99,849.96 C534.02,846.78 535.43,840.58 535.92,837.70 C536.47,834.86 542.77,814.34 543.67,811.59 C544.83,808.06 551.73,793.61 555.31,788.00 C558.89,782.43 564.25,776.22 568.32,772.91 C567.51,773.57 567.00,773.97 566.81,774.11 C566.63,774.26 566.49,774.34 566.40,774.38"
          fill="none"
          stroke="var(--color-accent-sage)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
        <path
          d="M543.42,838.53 C543.42,838.53 543.29,838.54 543.29,838.54 C543.55,838.30 543.60,834.02 544.41,830.69 C545.43,826.51 547.83,819.49 548.89,816.22 C550.20,812.25 559.51,793.70 559.98,792.87 C562.97,787.68 574.82,773.59 577.12,771.93 C577.12,771.93 576.41,772.79 576.41,772.79"
          fill="none"
          stroke="var(--color-accent-sage)"
          strokeWidth="2.83"
          strokeLinejoin="round"
        />
      </LeafElement>
    </svg>
  );
};

export default MidjourneyPlantDemo;