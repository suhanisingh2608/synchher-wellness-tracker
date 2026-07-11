import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/localStorage';
import './WaterTracker.css';

export default function WaterTracker() {
  // State for water entries (array of water logs)
  const [waterEntries, setWaterEntries] = useState([]);
  
  // State for daily goal (in glasses)
  const [dailyGoal, setDailyGoal] = useState(8);
  
  // State for showing goal edit form
  const [editingGoal, setEditingGoal] = useState(false);
  
  // State for temporary goal input
  const [tempGoal, setTempGoal] = useState(8);

  // One glass = 250ml
  const GLASS_ML = 250;

  // Load water data when component mounts
  useEffect(() => {
    const storedWater = getFromStorage(STORAGE_KEYS.WATER, {});
    
    // If stored data exists, use it
    if (storedWater && storedWater.entries) {
      setWaterEntries(storedWater.entries);
      setDailyGoal(storedWater.goal || 8);
      setTempGoal(storedWater.goal || 8);
    }
  }, []);

  // Get today's water data
  const today = new Date().toDateString();
  const todayEntries = waterEntries.filter(entry => entry.date === today);
  const todayGlasses = todayEntries.length;
  const progressPercent = Math.min((todayGlasses / dailyGoal) * 100, 100);

  // Handle adding a glass of water
  const handleAddGlass = () => {
    const newEntry = {
      date: today,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: 1, // 1 glass
      timestamp: new Date().getTime(),
    };

    // Add new entry to the beginning
    const updatedEntries = [newEntry, ...waterEntries];
    setWaterEntries(updatedEntries);

    // Save to localStorage
    saveToStorage(STORAGE_KEYS.WATER, {
      entries: updatedEntries,
      goal: dailyGoal,
    });
  };

  // Handle removing a water entry
  const handleRemoveEntry = (index) => {
    const updatedEntries = waterEntries.filter((_, i) => i !== index);
    setWaterEntries(updatedEntries);
    saveToStorage(STORAGE_KEYS.WATER, {
      entries: updatedEntries,
      goal: dailyGoal,
    });
  };

  // Handle updating daily goal
  const handleSaveGoal = () => {
    if (tempGoal > 0) {
      setDailyGoal(tempGoal);
      saveToStorage(STORAGE_KEYS.WATER, {
        entries: waterEntries,
        goal: tempGoal,
      });
      setEditingGoal(false);
    }
  };

  return (
    <div className="water-tracker">
      <h2>Water Intake Tracker</h2>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-text">
            {todayGlasses} / {dailyGoal} glasses
          </span>
          <button
            className="goal-btn"
            onClick={() => setEditingGoal(!editingGoal)}
            title="Edit daily goal"
          >
            ⚙️
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Daily Goal Editor */}
        {editingGoal && (
          <div className="goal-editor">
            <input
              type="number"
              min="1"
              max="20"
              value={tempGoal}
              onChange={(e) => setTempGoal(Number(e.target.value))}
              className="goal-input"
            />
            <button onClick={handleSaveGoal} className="save-btn">
              Save
            </button>
            <button
              onClick={() => {
                setEditingGoal(false);
                setTempGoal(dailyGoal);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Quick Add Button */}
      <button
        className={`add-glass-btn ${todayGlasses >= dailyGoal ? 'goal-reached' : ''}`}
        onClick={handleAddGlass}
      >
        <span className="plus-icon">+</span>
        <span>Add Glass ({GLASS_ML}ml)</span>
      </button>

      {/* Goal Reached Message */}
      {todayGlasses >= dailyGoal && (
        <div className="goal-reached-msg">
          🎉 Great job! You reached your daily goal!
        </div>
      )}

      {/* Today's Entries */}
      <div className="entries-section">
        <h3>Today's Log</h3>
        {todayEntries.length === 0 ? (
          <p className="empty-state">No water logged yet. Start hydrating! 💧</p>
        ) : (
          <ul className="entries-list">
            {todayEntries.map((entry, index) => (
              <li key={index} className="entry-item">
                <div className="entry-info">
                  <span className="entry-time">{entry.time}</span>
                  <span className="entry-amount">{entry.amount} glass ({entry.amount * GLASS_ML}ml)</span>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleRemoveEntry(index)}
                  title="Remove this entry"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Overall Stats */}
      <div className="stats-section">
        <h3>This Week</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Logged</span>
            <span className="stat-value">{waterEntries.length} glasses</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Volume</span>
            <span className="stat-value">{waterEntries.length * GLASS_ML}ml</span>
          </div>
        </div>
      </div>
    </div>
  );
}