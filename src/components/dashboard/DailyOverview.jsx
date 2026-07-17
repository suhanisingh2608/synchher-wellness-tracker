import ProgressRing from './ProgressRing';
import { IconMood, IconWater, IconSleep, IconMove, IconNourish, IconCheck } from './icons/DashboardIcons';
import './DailyOverview.css';

const chipMeta = {
  mood: { label: 'Mood', icon: IconMood },
  hydration: { label: 'Hydration', icon: IconWater },
  sleep: { label: 'Sleep', icon: IconSleep },
  movement: { label: 'Movement', icon: IconMove },
  nourishment: { label: 'Nourishment', icon: IconNourish },
};

/**
 * DailyOverview — "Today's wellness summary": the daily progress ring
 * plus a quick-glance row showing which of the five areas are complete.
 */
export default function DailyOverview({ wellness, goalsComplete, totalGoals, overallPercent }) {
  return (
    <section className="daily-overview" aria-label="Today's wellness summary">
      <div className="daily-overview__ring">
        <ProgressRing
          percent={overallPercent}
          label="Today"
          sublabel={`${goalsComplete}/${totalGoals} goals`}
        />
      </div>

      <div className="daily-overview__text">
        <span className="section-eyebrow">Today&rsquo;s Summary</span>
        <h2 className="section-heading">
          {goalsComplete === totalGoals
            ? "You've completed every goal today. 🌿"
            : `You're ${totalGoals - goalsComplete} goal${totalGoals - goalsComplete === 1 ? '' : 's'} away from a full day.`}
        </h2>

        <div className="daily-overview__chips">
          {Object.entries(wellness).map(([key, data]) => {
            const meta = chipMeta[key];
            if (!meta) return null;
            const Icon = meta.icon;
            const complete = data.value >= data.target;
            return (
              <span
                key={key}
                className={`overview-chip ${complete ? 'overview-chip--complete' : ''}`}
              >
                <Icon className="overview-chip__icon" />
                {meta.label}
                {complete && <IconCheck className="overview-chip__check" />}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}