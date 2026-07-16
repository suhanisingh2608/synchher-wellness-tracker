import { IconLeaf, IconMood, IconInsights } from "./LandingIcons";
import OrganicDivider, { useRevealOnScroll } from './OrganicDivider';
import './WhySyncHer.css';

const cards = [
  {
    index: '01',
    icon: IconLeaf,
    title: 'Gentle Habit Building',
    description:
      'Small daily actions create meaningful long-term habits — no streak-shaming, no pressure.',
  },
  {
    index: '02',
    icon: IconMood,
    title: 'Whole-Person Wellness',
    description:
      'Track mood, hydration, sleep, nourishment, and movement together, in one calm place.',
  },
  {
    index: '03',
    icon: IconInsights,
    title: 'Designed for Calm',
    description:
      'A peaceful wellness experience instead of overwhelming data or clinical dashboards.',
  },
];

export default function WhySyncHer() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section id="why-syncher" className="why-syncher">
      <OrganicDivider tone="ivory" />
      <div ref={ref} className={`why-syncher__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        <span className="section-eyebrow">Why SyncHer</span>
        <h2 className="section-heading">A companion, not another tracker.</h2>

        <div className="why-syncher__grid">
          {cards.map(({ index, icon: Icon, title, description }) => (
            <div className="why-card" key={title}>
              <span className="why-card__index" aria-hidden="true">{index}</span>
              <div className="why-card__icon">
                <Icon />
              </div>
              <h3 className="why-card__title">{title}</h3>
              <p className="why-card__desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}