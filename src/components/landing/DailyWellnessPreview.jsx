import { IconMood, IconWater, IconSleep, IconNourish, IconInsights } from './LandingIcons';
import OrganicDivider, { useRevealOnScroll } from './OrganicDivider';
import './DailyWellnessPreview.css';

const previewCards = [
  { icon: IconMood, label: 'Mood', value: 'Peaceful', className: 'preview-card--mood' },
  { icon: IconWater, label: 'Water Intake', value: '6 / 8 glasses', className: 'preview-card--water' },
  { icon: IconSleep, label: 'Sleep', value: '7h 40m', className: 'preview-card--sleep' },
  { icon: IconNourish, label: 'Nourishment', value: 'On track', className: 'preview-card--nourish' },
  { icon: IconInsights, label: 'Weekly Progress', value: '+12%', className: 'preview-card--progress' },
];

export default function DailyWellnessPreview() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section id="daily-preview" className="daily-preview">
      <OrganicDivider tone="beige" />
      <div ref={ref} className={`daily-preview__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        <div className="daily-preview__text">
          <span className="section-eyebrow">Your day, gently held</span>
          <h2 className="section-heading">
            A daily wellness space that feels light, not loud.
          </h2>
          <p className="section-supporting">
            No spreadsheets. No red alerts. Just a soft, spacious view of how
            your day is going — mood, water, sleep, nourishment, and progress,
            all in one glance.
          </p>
        </div>

        <div className="daily-preview__collage" aria-hidden="true">
          {previewCards.map(({ icon: Icon, label, value, className }) => (
            <div className={`preview-card ${className}`} key={label}>
              <div className="preview-card__icon">
                <Icon />
              </div>
              <div className="preview-card__body">
                <span className="preview-card__label">{label}</span>
                <span className="preview-card__value">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}