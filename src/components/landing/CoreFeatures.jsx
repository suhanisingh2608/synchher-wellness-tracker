import {
  IconMood,
  IconWater,
  IconSleep,
  IconMove,
  IconNourish,
  IconInsights,
} from './LandingIcons';
import OrganicDivider, { useRevealOnScroll } from './OrganicDivider';
import './CoreFeatures.css';

const features = [
  {
    icon: IconMood,
    title: 'Mood Tracking',
    description: 'Check in with how you feel and notice gentle patterns over time.',
  },
  {
    icon: IconWater,
    title: 'Hydration Tracker',
    description: 'A simple, visual way to stay mindful of your water intake.',
  },
  {
    icon: IconSleep,
    title: 'Sleep Tracker',
    description: 'Understand your rest and build a calmer wind-down routine.',
  },
  {
    icon: IconMove,
    title: 'Movement Tracker',
    description: 'Log gentle movement, at your own pace — no pressure to perform.',
  },
  {
    icon: IconNourish,
    title: 'Nourish Hub',
    description: 'Thoughtful nourishment guidance, without calorie obsession.',
  },
  {
    icon: IconInsights,
    title: 'Weekly Insights',
    description: 'A soft weekly reflection on your habits and how far you\u2019ve come.',
  },
];

export default function CoreFeatures() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section id="core-features" className="core-features">
      <OrganicDivider tone="ivory" flip />
      <div ref={ref} className={`core-features__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        <span className="section-eyebrow">Core Features</span>
        <h2 className="section-heading">Everything wellness, in one gentle place.</h2>

        <div className="core-features__grid">
          {features.map(({ icon: Icon, title, description }) => (
            <div className="feature-card" key={title}>
              <div className="feature-card__icon">
                <Icon />
              </div>
              <h3 className="feature-card__title">{title}</h3>
              <p className="feature-card__desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}