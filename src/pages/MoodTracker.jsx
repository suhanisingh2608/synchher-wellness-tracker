import { useState } from "react";
import "./MoodTracker.css";
import MoodHeader from "../components/mood/MoodHeader";
import MoodSelector from "../components/mood/MoodSelector";
import JournalBox from "../components/mood/JournalBox";
import MoodSlider from "../components/mood/MoodSlider";
import SaveMoodButton from "../components/mood/SaveMoodButton";

const STORAGE_KEY = "syncher_mood_entries";

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [energy, setEnergy] = useState(50);
  const [stress, setStress] = useState(50);
  const [journal, setJournal] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    const entry = {
      mood: selectedMood,
      energy,
      stress,
      journal,
      createdAt: new Date().toISOString(),
    };

    const existingRaw = window.localStorage.getItem(STORAGE_KEY);
    const existingEntries = existingRaw ? JSON.parse(existingRaw) : [];
    const updatedEntries = [...existingEntries, entry];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

    // Keep selectedMood, energy, and stress as they are; only the
    // journal text is cleared after a successful save.
    setJournal("");

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main className="mood-page">
      <div className="mood-container">
        <MoodHeader />

        <MoodSelector selectedMood={selectedMood} onMoodChange={setSelectedMood} />

        <MoodSlider
          title="Energy Level"
          minLabel="Low"
          maxLabel="High"
          value={energy}
          onChange={setEnergy}
        />

        <MoodSlider
          title="Stress Level"
          minLabel="Calm"
          maxLabel="Very Stressed"
          value={stress}
          onChange={setStress}
        />

        <JournalBox value={journal} onChange={setJournal} />

        <SaveMoodButton onClick={handleSave} />

        {showSuccess && (
          <p
            role="status"
            style={{
              marginTop: "0.9rem",
              textAlign: "center",
              fontFamily: "'Manrope', 'Karla', 'Segoe UI', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#5f8163",
            }}
          >
            Your mood has been saved. 🌿
          </p>
        )}
      </div>
    </main>
  );
}