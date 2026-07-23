import { useState } from "react";
import "./MoodSelector.css";

const moods = [
  {
    id: "happy",
    emoji: "😊",
    title: "Happy",
    description: "Feeling great today",
  },
  {
    id: "calm",
    emoji: "😌",
    title: "Calm",
    description: "Relaxed & peaceful",
  },
  {
    id: "neutral",
    emoji: "😐",
    title: "Neutral",
    description: "Just an ordinary day",
  },
  {
    id: "sad",
    emoji: "😔",
    title: "Sad",
    description: "Feeling a little low",
  },
  {
    id: "stressed",
    emoji: "😣",
    title: "Stressed",
    description: "Too much on my mind",
  },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState("calm");

  return (
    <section className="mood-selector">
      <h2>Select your mood</h2>

      <div className="mood-grid">
        {moods.map((mood) => (
          <button
            key={mood.id}
            type="button"
            className={`mood-card ${
              selectedMood === mood.id ? "selected" : ""
            }`}
            onClick={() => setSelectedMood(mood.id)}
          >
            <div className="emoji-circle">
              <span>{mood.emoji}</span>
            </div>

            <h3>{mood.title}</h3>

            <p>{mood.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}