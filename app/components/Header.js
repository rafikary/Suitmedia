'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '../ideas/styles.module.css';

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      // Set background transparan jika scroll > 50px
      setIsScrolled(window.scrollY > 50);

      // Sembunyikan/munculkan header
      if (window.scrollY > lastScrollY && window.scrollY > 80) { // scroll down
        setVisible(false);
      } else { // scroll up
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const getLinkClass = (path) => {
    return pathname === path ? `${styles.navLink} ${styles.active}` : styles.navLink;
  };

  return (
    <header className={`${styles.header} ${visible ? styles.headerVisible : ''} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
            <Link href="/">Suitmedia</Link>
        </div>
        <nav>
          <Link href="/work" className={getLinkClass('/work')}>Work</Link>
          <Link href="/about" className={getLinkClass('/about')}>About</Link>
          <Link href="/services" className={getLinkClass('/services')}>Services</Link>
          <Link href="/ideas" className={getLinkClass('/ideas')}>Ideas</Link>
          <Link href="/careers" className={getLinkClass('/careers')}>Careers</Link>
          <Link href="/contact" className={getLinkClass('/contact')}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}