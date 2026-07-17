import './ProgressRing.css';

/**
 * ProgressRing — a circular progress indicator.
 * percent: 0-100. size/stroke are pixel values so it can be reused
 * at different scales without redesigning the component.
 */
export default function ProgressRing({
  percent = 0,
  size = 168,
  stroke = 14,
  label,
  sublabel,
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="progress-ring__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className="progress-ring__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="progress-ring__center">
        <span className="progress-ring__percent">{clamped}%</span>
        {label && <span className="progress-ring__label">{label}</span>}
        {sublabel && <span className="progress-ring__sublabel">{sublabel}</span>}
      </div>
    </div>
  );
}