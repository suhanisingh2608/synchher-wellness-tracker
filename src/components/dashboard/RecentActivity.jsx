import { IconMood, IconWater, IconSleep, IconMove, IconNourish, IconClock } from './icons/DashboardIcons';
import './RecentActivity.css';

const iconByType = {
  mood: IconMood,
  hydration: IconWater,
  sleep: IconSleep,
  movement: IconMove,
  nourishment: IconNourish,
};

export default function RecentActivity({ items = [] }) {
  return (
    <section className="recent-activity" aria-label="Recent activity">
      <span className="section-eyebrow">Recent Activity</span>
      <h2 className="section-heading recent-activity__heading">Your last few check-ins.</h2>

      {items.length === 0 ? (
        <p className="recent-activity__empty">
          Nothing logged yet today — your activity will show up here.
        </p>
      ) : (
        <ul className="recent-activity__list">
          {items.map((item) => {
            const Icon = iconByType[item.type] || IconClock;
            return (
              <li className="activity-row" key={item.id}>
                <span className="activity-row__icon">
                  <Icon />
                </span>
                <span className="activity-row__text">{item.text}</span>
                <span className="activity-row__time">
                  <IconClock className="activity-row__time-icon" />
                  {item.time}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}