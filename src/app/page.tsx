// src/app/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Botanical from '../components/Botanical'
import IntroSection from '../components/sections/IntroSection'
import WelcomeSection from '../components/sections/WelcomeSection'
import PhotosSection from '../components/sections/PhotosSection'
import MessageSection from '../components/sections/MessageSection'
import ThankYouSection from '../components/sections/ThankYouSection'

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Handle intersection observer to update active section
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.findIndex(ref => ref === entry.target);
          if (index !== -1) {
            setActiveSection(index);
          }
        }
      });
    }, options);
    
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  const sections = [
    { id: 'intro', label: 'Intro', component: IntroSection },
    { id: 'welcome', label: 'Welcome', component: WelcomeSection },
    { id: 'photos', label: 'Photos', component: PhotosSection },
    { id: 'message', label: 'Our Message', component: MessageSection },
    { id: 'thankyou', label: 'Thank You', component: ThankYouSection },
  ];
  
  return (
    <main>
      <Navigation 
        sections={sections.map(s => ({ id: s.id, label: s.label }))} 
        activeSection={activeSection} 
      />
      
      {/* Conditionally render Botanical component - hide on intro page */}
      {activeSection !== 0 && <Botanical activeSection={activeSection - 1} />}
      
      <div className="section-container">
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <div 
              key={section.id}
              id={section.id}
              ref={el => sectionRefs.current[index] = el}
              className="section"
            >
              <SectionComponent isActive={activeSection === index} />
            </div>
          );
        })}
      </div>
    </main>
  )
}