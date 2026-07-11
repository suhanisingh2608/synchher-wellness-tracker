import { useState, useEffect } from 'react';
import { getFromStorage, STORAGE_KEYS } from '../utils/localStorage';
import './WellnessDashboard.css';

export default function WellnessDashboard() {
  // State for all dashboard data
  const [moodEntries, setMoodEntries] = useState([]);
  const [waterData, setWaterData] = useState({});
  const [sleepEntries, setSleepEntries] = useState([]);

  // State for mood options (need this to find emoji)
  const moods = [
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'calm', label: 'Calm', emoji: '😌' },
    { id: 'stressed', label: 'Stressed', emoji: '😰' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'energetic', label: 'Energetic', emoji: '🤩' },
  ];

  // Load all data on mount
  useEffect(() => {
    const storedMood = getFromStorage(STORAGE_KEYS.MOOD, []);
    const storedWater = getFromStorage(STORAGE_KEYS.WATER, {});
    const storedSleep = getFromStorage(STORAGE_KEYS.SLEEP, {});

    setMoodEntries(storedMood);
    setWaterData(storedWater);
    setSleepEntries(storedSleep.entries || []);
  }, []);

  // Get today's date
  const today = new Date().toDateString();

  // Get personalized greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 18) return '☀️ Good Afternoon';
    return '🌸 Good Evening';
  };

  // === MOOD DATA ===
  const todayMood = moodEntries.find(entry => entry.date === today);
  const moodEmoji = todayMood 
    ? moods.find(m => m.id === todayMood.moodId)?.emoji 
    : '❓';
  const moodLabel = todayMood
    ? moods.find(m => m.id === todayMood.moodId)?.label
    : 'Not logged';

  // === WATER DATA ===
  const waterEntries = waterData.entries || [];
  const waterGoal = waterData.goal || 8;
  const todayWaterEntries = waterEntries.filter(entry => entry.date === today);
  const todayGlasses = todayWaterEntries.length;
  const waterProgress = Math.min((todayGlasses / waterGoal) * 100, 100);
  const waterMl = todayGlasses * 250;

  // === SLEEP DATA ===
  const todaySleep = sleepEntries.find(entry => entry.date === today);
  const sleepGoal = waterData.goal ? (getFromStorage(STORAGE_KEYS.SLEEP, {}).goal || 8) : 8;
  const sleepHours = todaySleep ? todaySleep.duration : 0;
  const sleepProgress = Math.min((sleepHours / sleepGoal) * 100, 100);

  // === WEEKLY STATS ===
  // Get past 7 days
  const getLastDays = (n) => {
    const days = [];
    for (let i = 0; i < n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toDateString());
    }
    return days;
  };

  const lastSevenDays = getLastDays(7);

  // Average water per day (past 7 days)
  const avgWaterPerDay = (() => {
    let totalGlasses = 0;
    lastSevenDays.forEach(date => {
      const count = waterEntries.filter(e => e.date === date).length;
      totalGlasses += count;
    });
    return Math.round(totalGlasses / 7 * 10) / 10;
  })();

  // Average sleep per night (past 7 days)
  const avgSleepPerNight = (() => {
    let totalHours = 0;
    let daysWithData = 0;
    lastSevenDays.forEach(date => {
      const entry = sleepEntries.find(e => e.date === date);
      if (entry) {
        totalHours += entry.duration;
        daysWithData += 1;
      }
    });
    return daysWithData > 0 
      ? Math.round((totalHours / daysWithData) * 10) / 10 
      : 0;
  })();

  // Most common mood (past 7 days)
  const mostCommonMood = (() => {
    const moodCounts = {};
    lastSevenDays.forEach(date => {
      const entry = moodEntries.find(e => e.date === date);
      if (entry) {
        moodCounts[entry.moodId] = (moodCounts[entry.moodId] || 0) + 1;
      }
    });
    const mostFrequent = Object.keys(moodCounts).length > 0
      ? Object.keys(moodCounts).reduce((a, b) => 
          moodCounts[a] > moodCounts[b] ? a : b
        )
      : null;
    return mostFrequent
      ? moods.find(m => m.id === mostFrequent)?.emoji
      : '❓';
  })();

  // Days with complete data (mood + water + sleep)
  const completeDays = (() => {
    let count = 0;
    lastSevenDays.forEach(date => {
      const hasMood = moodEntries.find(e => e.date === date);
      const hasWater = waterEntries.find(e => e.date === date);
      const hasSleep = sleepEntries.find(e => e.date === date);
      if (hasMood && hasWater && hasSleep) count += 1;
    });
    return count;
  })();

  return (
    <div className="wellness-dashboard">
      {/* Premium Header Section */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-greeting">{getGreeting()}</h1>
          <p className="hero-date">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Today's Quick Stats - Premium Cards */}
      <div className="stats-grid">
        {/* Mood Card */}
        <div className={`stat-card mood-card ${todayMood ? 'logged' : 'empty'}`}>
          <div className="card-inner">
            <div className="card-icon">{moodEmoji}</div>
            <div className="card-label">Mood</div>
            <div className="card-value">{moodLabel}</div>
            {todayMood && (
              <div className="card-time">
                {new Date(todayMood.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            )}
          </div>
          <div className="card-background"></div>
        </div>

        {/* Water Card */}
        <div className={`stat-card water-card ${todayGlasses > 0 ? 'logged' : 'empty'}`}>
          <div className="card-inner">
            <div className="card-icon">💧</div>
            <div className="card-label">Hydration</div>
            <div className="card-value">{todayGlasses}/{waterGoal}</div>
            <div className="card-subtext">glasses</div>
            <div className="mini-progress">
              <div 
                className="mini-progress-fill water-fill"
                style={{ width: `${waterProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="card-background"></div>
        </div>

        {/* Sleep Card */}
        <div className={`stat-card sleep-card ${sleepHours > 0 ? 'logged' : 'empty'}`}>
          <div className="card-inner">
            <div className="card-icon">😴</div>
            <div className="card-label">Sleep</div>
            <div className="card-value">{sleepHours}/{sleepGoal}</div>
            <div className="card-subtext">hours</div>
            <div className="mini-progress">
              <div 
                className="mini-progress-fill sleep-fill"
                style={{ width: `${sleepProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="card-background"></div>
        </div>
      </div>

      {/* Daily Achievement Messages */}
      <div className="achievements-section">
        {todayGlasses >= waterGoal && (
          <div className="achievement water-achievement">
            <span className="achievement-icon">💧</span>
            <span className="achievement-text">Hydration goal reached!</span>
          </div>
        )}

        {sleepHours >= sleepGoal && (
          <div className="achievement sleep-achievement">
            <span className="achievement-icon">😴</span>
            <span className="achievement-text">Sleep goal reached!</span>
          </div>
        )}

        {todayMood && todayGlasses > 0 && sleepHours > 0 && (
          <div className="achievement full-achievement">
            <span className="achievement-icon">✨</span>
            <span className="achievement-text">All wellness areas tracked today!</span>
          </div>
        )}
      </div>

      {/* This Week's Overview */}
      <div className="weekly-overview">
        <div className="overview-header">
          <h3>This Week</h3>
          <span className="overview-streak">{completeDays}/7 complete days</span>
        </div>
        
        <div className="overview-grid">
          <div className="overview-item">
            <span className="overview-icon">💧</span>
            <span className="overview-label">Avg Water</span>
            <span className="overview-value">{avgWaterPerDay}</span>
            <span className="overview-unit">glasses/day</span>
          </div>

          <div className="overview-item">
            <span className="overview-icon">😴</span>
            <span className="overview-label">Avg Sleep</span>
            <span className="overview-value">{avgSleepPerNight}h</span>
            <span className="overview-unit">per night</span>
          </div>

          <div className="overview-item">
            <span className="overview-icon">🎭</span>
            <span className="overview-label">Top Mood</span>
            <span className="overview-value">{mostCommonMood}</span>
            <span className="overview-unit">this week</span>
          </div>

          <div className="overview-item">
            <span className="overview-icon">🔥</span>
            <span className="overview-label">Consistency</span>
            <span className="overview-value">{Math.round((completeDays / 7) * 100)}%</span>
            <span className="overview-unit">tracked</span>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="motivational-section">
        <p className="motivational-text">
          {completeDays >= 5 
            ? "🌟 You're building great habits! Keep up the amazing consistency." 
            : completeDays >= 3
            ? "💪 You're making progress! Every day of tracking matters."
            : completeDays > 0
            ? "🌱 Great start! Track daily to see patterns and build better habits."
            : "👋 Welcome to SyncHer! Start tracking to understand your wellness patterns."}
        </p>
      </div>
    </div>
  );
}