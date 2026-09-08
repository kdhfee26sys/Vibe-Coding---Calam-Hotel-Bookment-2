import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sun, Moon, Building2 } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let prevScrolled = window.scrollY > 20;
    setIsScrolled(prevScrolled);

    const handleScroll = () => {
      const shouldScroll = window.scrollY > 20;
      if (shouldScroll !== prevScrolled) {
        prevScrolled = shouldScroll;
        setIsScrolled(shouldScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Brand / Logo */}
        <div className={styles.logoArea} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className={styles.logoIcon}>
            <Building2 size={20} color="#FFFFFF" />
          </div>
          <div className={styles.logoText}>
            <span className={styles.brandName}>CALAM</span>
            <span className={styles.brandTagline}>Hotel & Resort OS</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className={styles.desktopNav}>
          <button onClick={() => scrollToSection('features')} className={styles.navLink}>Product</button>
          <button onClick={() => scrollToSection('showcase')} className={styles.navLink}>Features</button>
          <button onClick={() => scrollToSection('solutions')} className={styles.navLink}>Solutions</button>
          <button onClick={() => scrollToSection('pricing')} className={styles.navLink}>Pricing</button>
          <button onClick={() => scrollToSection('faq')} className={styles.navLink}>FAQ</button>
        </nav>

        {/* Right CTA Actions */}
        <div className={styles.actionsGroup}>
          <button 
            className={styles.themeToggleBtn} 
            onClick={toggleTheme} 
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link to="/login" className={styles.signInBtn}>
            Sign In
          </Link>

          <button onClick={() => navigate('/register')} className={styles.primaryCtaBtn}>
            <span>Start Free Trial</span>
            <ArrowRight size={15} className={styles.ctaArrow} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={`${styles.mobileDrawer} animate-pop-in`}>
          <div className={styles.mobileLinks}>
            <button onClick={() => scrollToSection('features')} className={styles.mobileNavLink}>Product</button>
            <button onClick={() => scrollToSection('showcase')} className={styles.mobileNavLink}>Features</button>
            <button onClick={() => scrollToSection('solutions')} className={styles.mobileNavLink}>Solutions</button>
            <button onClick={() => scrollToSection('pricing')} className={styles.mobileNavLink}>Pricing</button>
            <button onClick={() => scrollToSection('faq')} className={styles.mobileNavLink}>FAQ</button>
          </div>
          <div className={styles.mobileActions}>
            <Link to="/login" className={styles.mobileSignInBtn} onClick={() => setIsMobileMenuOpen(false)}>
              Sign In
            </Link>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/register');
              }} 
              className={styles.mobileCtaBtn}
            >
              Start Free Trial →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
