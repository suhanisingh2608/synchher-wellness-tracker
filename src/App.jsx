import WellnessDashboard from './components/WellnessDashboard';
import MoodTracker from './components/MoodTracker';
import WaterTracker from './components/WaterTracker';
import SleepTracker from './components/SleepTracker';
import NutritionTracker from './components/NutritionTracker';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* HEADER SECTION */}
      <header className="app-header">
        <div className="container">
          <h1>🌸 SyncHer</h1>
          <p>Understand your body. Build healthier habits. Track mood, hydration, sleep, and nutrition—all in one calm, personalized wellness space.</p>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="app-main">
        <div className="container">
          {/* SECTION 1: TODAY'S WELLNESS OVERVIEW */}
          <section className="dashboard-section">
            <WellnessDashboard />
          </section>

          {/* SECTION 2: DAILY TRACKERS (2-COLUMN GRID) */}
          <section className="trackers-grid">
            {/* Left Column: Mood Tracker */}
            <div className="tracker-column mood-column">
              <MoodTracker />
            </div>

            {/* Right Column: Water Tracker */}
            <div className="tracker-column water-column">
              <WaterTracker />
            </div>
          </section>

          {/* SECTION 3: HEALTH TRACKERS (2-COLUMN GRID) */}
          <section className="trackers-grid">
            {/* Left Column: Sleep Tracker */}
            <div className="tracker-column sleep-column">
              <SleepTracker />
            </div>

            {/* Right Column: Nutrition Tracker */}
            <div className="tracker-column nutrition-column">
              <NutritionTracker />
            </div>
          </section>

          {/* SECTION 4: INSIGHTS & MOTIVATION BANNER */}
          <section className="insights-banner">
            <div className="insights-content">
              <h3>💡 Wellness Tips</h3>
              <p>Consistency beats perfection. Small daily habits compound over time. Track regularly to discover patterns and build sustainable wellness routines.</p>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2026 SyncHer. Built for women's wellness.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;