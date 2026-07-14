import { useEffect, useState } from 'react';
import { IconLeaf, IconMenu, IconClose } from './LandingIcons';
import Button from './Button';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`syncher-nav ${scrolled ? 'syncher-nav--solid' : ''}`}>
      <div className="syncher-nav__inner">
        <a href="#top" className="syncher-nav__logo">
          <IconLeaf className="syncher-nav__logo-icon" />
          <span>SyncHer</span>
        </a>

        <nav className="syncher-nav__links" aria-label="Primary">
          <a href="#top">Home</a>
          <a href="#core-features">Features</a>
          <a href="#why-syncher">About</a>
        </nav>

        <div className="syncher-nav__cta">
          <Button variant="primary" href="#final-cta">
            Get Started
          </Button>
        </div>

        <button
          className="syncher-nav__toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="syncher-nav__mobile">
          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#core-features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#why-syncher" onClick={() => setMenuOpen(false)}>About</a>
          <Button variant="primary" href="#final-cta" className="syncher-nav__mobile-cta">
            Get Started
          </Button>
        </div>
      )}
    </header>
  );
}