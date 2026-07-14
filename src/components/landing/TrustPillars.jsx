import {
  IconMood,
  IconWater,
  IconSleep,
  IconMove,
  IconNourish,
} from './LandingIcons';
import OrganicDivider, { useRevealOnScroll } from './OrganicDivider';
import './TrustPillars.css';

const pillars = [
  { icon: IconMood, label: 'Emotional Wellness' },
  { icon: IconWater, label: 'Daily Hydration' },
  { icon: IconSleep, label: 'Restful Sleep' },
  { icon: IconMove, label: 'Daily Movement' },
  { icon: IconNourish, label: 'Mindful Nourishment' },
];

/**
 * A quiet trust strip beneath the hero — five pillars, no cards, no
 * copy beyond the labels. Its job is reassurance and orientation before
 * the page goes deeper, not another block of content to read.
 */
export default function TrustPillars() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section className="trust-pillars" aria-label="Wellness pillars SyncHer supports">
      <OrganicDivider tone="sage" />
      <div ref={ref} className={`trust-pillars__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        {pillars.map(({ icon: Icon, label }) => (
          <div className="trust-pillar" key={label}>
            <Icon className="trust-pillar__icon" />
            <span className="trust-pillar__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}