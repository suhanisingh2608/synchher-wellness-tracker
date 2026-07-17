import './WellnessCard.css';

/**
 * WellnessCard — a single reusable card used for all five tracker
 * summaries. Parameterized rather than duplicated per tracker, per the
 * "reuse components wherever appropriate" convention used throughout
 * this project.
 */
export default function WellnessCard({
  icon: Icon,
  title,
  value,
  target,
  unit,
  accent = 'sage',
  displayValue,
  goalText,
}) {
  const percent = Math.max(0, Math.min(100, Math.round((value / target) * 100)));
  const complete = value >= target;

  return (
    <div className={`wellness-card wellness-card--${accent}`}>
      <div className="wellness-card__top">
        <span className="wellness-card__icon">
          <Icon />
        </span>
        {complete && <span className="wellness-card__badge">On track</span>}
      </div>

      <h3 className="wellness-card__title">{title}</h3>

      <p className="wellness-card__value">
        {displayValue ?? value}
        {unit && <span className="wellness-card__unit">{unit}</span>}
      </p>

      <div className="wellness-card__bar-track">
        <div
          className="wellness-card__bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="wellness-card__goal">
        {goalText ?? `Goal: ${target}${unit ? ` ${unit}` : ''}`}
      </span>
    </div>
  );
}