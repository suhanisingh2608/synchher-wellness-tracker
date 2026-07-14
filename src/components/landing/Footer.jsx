import { IconLeaf } from './LandingIcons';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="syncher-footer">
      <div className="syncher-footer__inner">
        <div className="syncher-footer__brand">
          <span className="syncher-footer__logo">
            <IconLeaf className="syncher-footer__logo-icon" />
            SyncHer
          </span>
          <p className="syncher-footer__mission">
            Helping women understand their bodies and build healthier habits
            — one day at a time.
          </p>
        </div>

        <nav className="syncher-footer__links" aria-label="Footer">
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          <a href="#contact">Contact</a>
          <a href="#privacy">Privacy Policy</a>
        </nav>
      </div>

      <div className="syncher-footer__bottom">
        <span>© {new Date().getFullYear()} SyncHer. Made with care.</span>
      </div>
    </footer>
  );
}