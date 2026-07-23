import "./MoodHeader.css";

export default function MoodHeader() {
  return (
    <section className="mood-header">
      <button className="back-btn">
        ← Back
      </button>

      <span className="mood-date">
        DAILY CHECK-IN
      </span>

      <h1>How are you feeling today?</h1>

      <p>
        Your mood changes every day.
        Take a quiet moment to check in with yourself.
      </p>
    </section>
  );
}