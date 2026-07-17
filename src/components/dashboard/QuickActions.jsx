import { IconPlus, IconMood, IconWater, IconSleep, IconMove, IconNourish } from './icons/DashboardIcons';
import './QuickActions.css';

/**
 * QuickActions — a row of icon+label quick-log chips. These have a
 * distinct shape (icon, label, trailing plus) from the landing page's
 * Button component, which is built for text+arrow CTAs — so rather than
 * force an awkward reuse, this is a small self-contained control kept
 * consistent with the site's button language (pill shape, sage accent,
 * same hover-lift easing) via its own CSS.
 */
const actions = [
  { key: 'mood', label: 'Log Mood', icon: IconMood },
  { key: 'hydration', label: 'Add Water', icon: IconWater },
  { key: 'sleep', label: 'Log Sleep', icon: IconSleep },
  { key: 'movement', label: 'Log Movement', icon: IconMove },
  { key: 'nourishment', label: 'Add Meal', icon: IconNourish },
];

export default function QuickActions({ onAction }) {
  return (
    <section className="quick-actions" aria-label="Quick actions">
      <span className="section-eyebrow">Quick Actions</span>
      <h2 className="section-heading quick-actions__heading">Log something in a tap.</h2>

      <div className="quick-actions__row">
        {actions.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className="quick-action-chip"
            onClick={() => onAction && onAction(key)}
          >
            <span className="quick-action-chip__icon">
              <Icon />
            </span>
            {label}
            <IconPlus className="quick-action-chip__plus" />
          </button>
        ))}
      </div>
    </section>
  );
}