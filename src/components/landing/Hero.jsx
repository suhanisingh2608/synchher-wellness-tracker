import { useEffect, useRef, useState } from 'react';
import { IconLeaf, IconMood, IconWater, IconSleep } from "./LandingIcons";
import Button from './Button';
import './Hero.css';

/**
 * Resolve the hero photo without letting a missing file break the build.
 * import.meta.glob with a literal path acts as an existence check: if
 * src/assets/images/hero-wellness.jpg is present, Vite bundles it and we
 * get a usable URL; if it's absent, this simply resolves to an empty
 * object and heroImageUrl stays null, so the CSS gradient fallback shows.
 */
const heroImageModules = import.meta.glob('../../assets/images/hero-wellness.jpg', {
  eager: true,
  import: 'default',
});
const heroImageUrl = Object.values(heroImageModules)[0] || null;

export default function Hero() {
  const imageRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Reveal the hero content on page load rather than on scroll — it's
  // the first thing visitors see, so it should feel like a calm entrance.
  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Very subtle parallax on the hero photo — a few px of drift only,
  // skipped entirely for prefers-reduced-motion.
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (imageRef.current) {
          const offset = Math.min(window.scrollY * 0.06, 40);
          imageRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        {/*
          Expects src/assets/images/hero-wellness.jpg — a warm lifestyle
          photograph (journaling by a sunlit window, herbal tea, yoga or
          stretching, indoor plants, morning sunlight, neutral clothing,
          beige interior, sage tones). Drop the file in that path and it's
          picked up automatically; until then, a layered sage/beige gradient
          fills the frame so the hero still feels finished and premium.
        */}
        <div
          ref={imageRef}
          className={`hero__photo ${heroImageUrl ? 'hero__photo--has-image' : 'hero__photo--fallback'}`}
          style={heroImageUrl ? { backgroundImage: `url(${heroImageUrl})` } : undefined}
        />
        <div className="hero__overlay" />
      </div>

      <div className="hero__content">
        <div className={`hero__text ${loaded ? 'hero__text--in' : ''}`}>
          <span className="hero__eyebrow">
            <IconLeaf className="hero__eyebrow-icon" />
            A calmer kind of wellness
          </span>

          <h1 className="hero__headline">
            Wellness begins with
            <br />
            <em>listening</em> to yourself.
          </h1>

          <p className="hero__supporting">
            Build healthier habits through mindful tracking of your mood,
            hydration, sleep, movement, and nourishment — all in one
            beautifully designed wellness companion.
          </p>

          <div className="hero__actions">
            <Button variant="primary" href="#final-cta" showArrow>
              Start Your Wellness Journey
            </Button>
            <Button variant="secondary" href="#daily-preview">
              Explore Dashboard
            </Button>
          </div>
        </div>

        <div
          className={`hero__floating-cards ${loaded ? 'hero__floating-cards--in' : ''}`}
          aria-hidden="true"
        >
          <div className="hero-glass-card hero-glass-card--mood">
            <span className="hero-glass-card__icon">
              <IconMood />
            </span>
            <div className="hero-glass-card__body">
              <span className="hero-glass-card__label">Today&rsquo;s mood</span>
              <span className="hero-glass-card__value">Calm 😊</span>
            </div>
          </div>

          <div className="hero-glass-card hero-glass-card--water">
            <span className="hero-glass-card__icon">
              <IconWater />
            </span>
            <div className="hero-glass-card__body">
              <span className="hero-glass-card__label">Hydration</span>
              <span className="hero-glass-card__value">2.1 / 3 L</span>
            </div>
          </div>

          <div className="hero-glass-card hero-glass-card--sleep">
            <span className="hero-glass-card__icon">
              <IconSleep />
            </span>
            <div className="hero-glass-card__body">
              <span className="hero-glass-card__label">Sleep</span>
              <span className="hero-glass-card__value">7h 45m</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}