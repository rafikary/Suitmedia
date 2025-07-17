'use client';

import { useState, useEffect } from 'react';
import styles from '../ideas/styles.module.css';

export default function Banner() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.banner}>
      {/* Background image dibuat di CSS agar bisa diganti via CMS */}
      <div 
        className={styles.bannerContent}
        style={{ transform: `translateY(${offsetY * 0.3}px)` }} // Efek Parallax
      >
        <h1>Ideas</h1>
        <p>Where all our great things begin</p>
      </div>
    </div>
  );
}