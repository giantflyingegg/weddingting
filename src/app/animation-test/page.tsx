'use client'

import { useState } from 'react'
import PlantGrowthDemo from '../../components/test/PlantGrowthDemo'
import styles from './animation-test.module.css'

export default function AnimationTestPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>SVG Animation Testing Lab</h1>
      
      <div className={styles.testArea}>
        <PlantGrowthDemo />
      </div>
      
      <div className={styles.controls}>
        <p className={styles.hint}>
          This is a testing environment for developing botanical SVG animations.
          The final animations will be integrated into the main wedding thank you site.
        </p>
      </div>
    </main>
  )
}