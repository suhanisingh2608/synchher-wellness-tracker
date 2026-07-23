import "./SaveMoodButton.css";

export default function SaveMoodButton({ disabled = false, onClick }) {
  return (
    <button
      type="button"
      className="save-mood-btn"
      disabled={disabled}
      onClick={onClick}
    >
      Save Today&rsquo;s Mood
    </button>
  );
}