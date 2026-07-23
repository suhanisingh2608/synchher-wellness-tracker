import "./JournalBox.css";

export default function JournalBox({ value, onChange }) {
  return (
    <div className="journal-box">
      <div className="journal-box__header">
        <h3 className="journal-box__title">Reflection</h3>
        <p className="journal-box__subtitle">What&rsquo;s on your mind today?</p>
      </div>

      <textarea
        className="journal-box__textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write about your thoughts, feelings or anything you'd like to remember..."
        aria-label="Journal entry"
        rows={6}
      />

      <div className="journal-box__footer">
        <span className="journal-box__counter">{value.length} characters</span>
      </div>
    </div>
  );
}