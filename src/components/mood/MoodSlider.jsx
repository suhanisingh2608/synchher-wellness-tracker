import "./MoodSlider.css";

export default function MoodSlider({
  title,
  minLabel,
  maxLabel,
  min = 0,
  max = 100,
  value,
  onChange,
}) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="mood-slider">
      <div className="mood-slider__header">
        <h3 className="mood-slider__title">{title}</h3>
        <span className="mood-slider__value">{value}</span>
      </div>

      <input
        type="range"
        className="mood-slider__input"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          backgroundImage: `linear-gradient(to right, #7a9e7e 0%, #5f8163 ${percent}%, rgba(75, 64, 55, 0.12) ${percent}%, rgba(75, 64, 55, 0.12) 100%)`,
        }}
        aria-label={title}
        aria-valuetext={`${value} out of ${max}`}
      />

      <div className="mood-slider__labels">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}