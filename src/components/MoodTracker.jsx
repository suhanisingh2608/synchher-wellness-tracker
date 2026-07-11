import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/localStorage';
import './MoodTracker.css';

export default function MoodTracker() {
  // State for mood entries (array of mood logs)
  const [moodEntries, setMoodEntries] = useState([]);
  
  // State for currently selected mood
  const [selectedMood, setSelectedMood] = useState(null);

  // Mood options with emoji and label
  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'calm', label: 'Calm', emoji: '😌' },
    { id: 'stressed', label: 'Stressed', emoji: '😰' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'energetic', label: 'Energetic', emoji: '🤩' },
  ];

  // Load mood data when component mounts
  useEffect(() => {
    const storedMoods = getFromStorage(STORAGE_KEYS.MOOD, []);
    setMoodEntries(storedMoods);

    // Set selected mood to today's mood if it exists
    const today = new Date().toDateString();
    const todaysMood = storedMoods.find(entry => entry.date === today);
    if (todaysMood) {
      setSelectedMood(todaysMood.moodId);
    }
  }, []);

  // Handle mood selection and save
  const handleMoodSelect = (moodId) => {
    setSelectedMood(moodId);

    const today = new Date().toDateString();
    
    // Create new mood entry
    const newEntry = {
      moodId,
      date: today,
      timestamp: new Date().getTime(),
    };

    // Update entries: remove today's entry if it exists, then add new one
    const updatedEntries = moodEntries.filter(
      entry => entry.date !== today
    );
    updatedEntries.unshift(newEntry); // Add new entry at the beginning

    // Update state and localStorage
    setMoodEntries(updatedEntries);
    saveToStorage(STORAGE_KEYS.MOOD, updatedEntries);
  };

  // Get today's mood entry
  const today = new Date().toDateString();
  const todayEntry = moodEntries.find(entry => entry.date === today);

  return (
    <div className="mood-tracker">
      <h2>How are you feeling today?</h2>

      {/* Mood Selection Buttons */}
      <div className="mood-buttons">
        {moods.map(mood => (
          <button
            key={mood.id}
            className={`mood-btn ${selectedMood === mood.id ? 'active' : ''}`}
            onClick={() => handleMoodSelect(mood.id)}
            title={mood.label}
          >
            <span className="mood-emoji">{mood.emoji}</span>
            <span className="mood-label">{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Mood Display */}
      {todayEntry && (
        <div className="today-mood">
          <p>Today's mood: <strong>{moods.find(m => m.id === todayEntry.moodId)?.emoji}</strong></p>
          <p className="timestamp">{new Date(todayEntry.timestamp).toLocaleTimeString()}</p>
        </div>
      )}

      {/* Recent History */}
      <div className="mood-history">
        <h3>Recent Moods</h3>
        {moodEntries.length === 0 ? (
          <p className="empty-state">No mood entries yet. Start logging!</p>
        ) : (
          <ul className="history-list">
            {moodEntries.slice(0, 5).map((entry, index) => {
              const moodInfo = moods.find(m => m.id === entry.moodId);
              return (
                <li key={index}>
                  <span className="history-emoji">{moodInfo?.emoji}</span>
                  <span className="history-date">{entry.date}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}