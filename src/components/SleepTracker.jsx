import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/localStorage';
import './SleepTracker.css';

export default function SleepTracker() {
  // State for sleep entries (array of sleep logs)
  const [sleepEntries, setSleepEntries] = useState([]);
  
  // State for today's bedtime
  const [bedtime, setBedtime] = useState('');
  
  // State for today's wake time
  const [wakeTime, setWakeTime] = useState('');
  
  // State for daily sleep goal (in hours)
  const [sleepGoal, setSleepGoal] = useState(8);
  
  // State for showing goal edit form
  const [editingGoal, setEditingGoal] = useState(false);
  
  // State for temporary goal input
  const [tempGoal, setTempGoal] = useState(8);

  // Load sleep data when component mounts
  useEffect(() => {
    const storedSleep = getFromStorage(STORAGE_KEYS.SLEEP, {});
    
    if (storedSleep && storedSleep.entries) {
      setSleepEntries(storedSleep.entries);
      setSleepGoal(storedSleep.goal || 8);
      setTempGoal(storedSleep.goal || 8);

      // If today has a sleep entry, populate the time inputs
      const today = new Date().toDateString();
      const todayEntry = storedSleep.entries.find(entry => entry.date === today);
      if (todayEntry) {
        setBedtime(todayEntry.bedtime);
        setWakeTime(todayEntry.wakeTime);
      }
    }
  }, []);

  // Get today's sleep entry
  const today = new Date().toDateString();
  const todayEntry = sleepEntries.find(entry => entry.date === today);

  // Calculate hours slept from bedtime and wake time
  const calculateHoursSleep = (bed, wake) => {
    if (!bed || !wake) return null;

    const [bedHour, bedMin] = bed.split(':').map(Number);
    const [wakeHour, wakeMin] = wake.split(':').map(Number);

    let bedTotalMin = bedHour * 60 + bedMin;
    let wakeTotalMin = wakeHour * 60 + wakeMin;

    // If wake time is next day (e.g., bedtime 23:00, wake 07:00)
    if (wakeTotalMin <= bedTotalMin) {
      wakeTotalMin += 24 * 60; // Add 24 hours
    }

    const durationMin = wakeTotalMin - bedTotalMin;
    const hours = durationMin / 60;

    return Math.round(hours * 10) / 10; // Round to 1 decimal place
  };

  // Today's sleep hours
  const todayHours = calculateHoursSleep(bedtime, wakeTime);
  const progressPercent = sleepGoal > 0 ? Math.min((todayHours / sleepGoal) * 100, 100) : 0;

  // Handle saving sleep entry
  const handleSaveSleep = () => {
    // Validate both times are entered
    if (!bedtime || !wakeTime) {
      alert('Please enter both bedtime and wake time');
      return;
    }

    // Validate wake time is after bedtime (or next day)
    const hours = calculateHoursSleep(bedtime, wakeTime);
    if (hours <= 0) {
      alert('Wake time must be after bedtime');
      return;
    }

    // Create new sleep entry
    const newEntry = {
      date: today,
      bedtime,
      wakeTime,
      duration: hours,
      timestamp: new Date().getTime(),
    };

    // Remove today's old entry if it exists, then add new one
    const updatedEntries = sleepEntries.filter(entry => entry.date !== today);
    updatedEntries.unshift(newEntry); // Add new entry at the beginning

    // Update state and localStorage
    setSleepEntries(updatedEntries);
    saveToStorage(STORAGE_KEYS.SLEEP, {
      entries: updatedEntries,
      goal: sleepGoal,
    });
  };

  // Handle updating daily goal
  const handleSaveGoal = () => {
    if (tempGoal > 0) {
      setSleepGoal(tempGoal);
      saveToStorage(STORAGE_KEYS.SLEEP, {
        entries: sleepEntries,
        goal: tempGoal,
      });
      setEditingGoal(false);
    }
  };

  return (
    <div className="sleep-tracker">
      <h2>Sleep Tracker</h2>

      {/* Sleep Input Section */}
      <div className="sleep-input-section">
        <h3>Log Your Sleep</h3>
        
        <div className="time-inputs">
          <div className="time-group">
            <label htmlFor="bedtime">Bedtime</label>
            <input
              id="bedtime"
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="time-input"
            />
          </div>

          <div className="time-group">
            <label htmlFor="wakeTime">Wake Time</label>
            <input
              id="wakeTime"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="time-input"
            />
          </div>
        </div>

        {/* Show calculated hours */}
        {todayHours && (
          <div className="hours-display">
            <p>Duration: <strong>{todayHours} hours</strong></p>
          </div>
        )}

        <button onClick={handleSaveSleep} className="save-sleep-btn">
          💾 Log Sleep
        </button>
      </div>

      {/* Sleep Goal Section */}
      <div className="goal-section">
        <div className="goal-header">
          <span className="goal-text">
            Goal: {sleepGoal} hours
          </span>
          <button
            className="goal-btn"
            onClick={() => setEditingGoal(!editingGoal)}
            title="Edit sleep goal"
          >
            ⚙️
          </button>
        </div>

        {/* Goal Editor */}
        {editingGoal && (
          <div className="goal-editor">
            <input
              type="number"
              min="1"
              max="12"
              step="0.5"
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
                setTempGoal(sleepGoal);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Progress Section */}
      {todayEntry && (
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-text">
              {todayHours} / {sleepGoal} hours
            </span>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Status Message */}
          {todayHours >= sleepGoal ? (
            <p className="status good">✨ Great! You got enough sleep!</p>
          ) : (
            <p className="status warning">
              💤 Try to get {(sleepGoal - todayHours).toFixed(1)} more hours
            </p>
          )}
        </div>
      )}

      {/* Today's Entry Display */}
      {todayEntry && (
        <div className="today-entry">
          <h3>Today's Sleep</h3>
          <div className="entry-details">
            <div className="detail-item">
              <span className="detail-label">Bedtime</span>
              <span className="detail-value">{todayEntry.bedtime}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Wake Time</span>
              <span className="detail-value">{todayEntry.wakeTime}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{todayEntry.duration} hours</span>
            </div>
          </div>
        </div>
      )}

      {/* Sleep History */}
      <div className="sleep-history">
        <h3>Recent Sleep Log</h3>
        {sleepEntries.length === 0 ? (
          <p className="empty-state">No sleep entries yet. Start logging! 😴</p>
        ) : (
          <ul className="history-list">
            {sleepEntries.slice(0, 7).map((entry, index) => (
              <li key={index} className="history-item">
                <div className="history-date">{entry.date}</div>
                <div className="history-time">
                  {entry.bedtime} → {entry.wakeTime}
                </div>
                <div className="history-duration">
                  {entry.duration}h
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}