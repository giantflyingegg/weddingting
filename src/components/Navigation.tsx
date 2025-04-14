'use client'

import { motion } from 'framer-motion'
import styles from './Navigation.module.css'

interface NavigationProps {
  sections: { id: string; label: string }[];
  activeSection: number;
}

export default function Navigation({ sections, activeSection }: NavigationProps) {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        {sections.map((section, index) => (
          <li key={section.id} className={styles.navItem}>
            <a
              href={`#${section.id}`}
              className={styles.navLink}
              data-active={activeSection === index}
              aria-label={section.label}
            >
              <span className={styles.navTooltip}>{section.label}</span>
              <motion.div
                className={styles.navDot}
                animate={{
                  scale: activeSection === index ? 1.3 : 1,
                  opacity: activeSection === index ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}