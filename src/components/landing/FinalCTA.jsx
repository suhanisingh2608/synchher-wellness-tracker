import { IconLeaf } from './LandingIcons';
import Button from './Button';
import OrganicDivider, { useRevealOnScroll } from './OrganicDivider';
import './FinalCTA.css';

export default function FinalCTA() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section id="final-cta" className="final-cta">
      <OrganicDivider tone="ivory" flip />
      <div ref={ref} className={`final-cta__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        <IconLeaf className="final-cta__icon" />
        <h2 className="final-cta__headline">
          Every healthier day begins with one mindful step.
        </h2>
        <p className="final-cta__supporting">
          SyncHer is designed to support — not pressure — you on your
          wellness journey.
        </p>
        <Button variant="ghost" href="#top" showArrow>
          Start Your Wellness Journey
        </Button>
      </div>
    </section>
  );
}