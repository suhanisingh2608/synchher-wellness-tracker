import WelcomeSection from '../components/dashboard/WelcomeSection';
import DailyOverview from '../components/dashboard/DailyOverview';
import WellnessCard from '../components/dashboard/WellnessCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import { useWellnessData } from '../components/dashboard/useWellnessData';
import {
  IconMood,
  IconWater,
  IconSleep,
  IconMove,
  IconNourish,
} from '../components/dashboard/icons/DashboardIcons';
import './Dashboard.css';

/**
 * SyncHer Dashboard
 *
 * A standalone dashboard page — entirely separate from the landing page.
 * It imports nothing from components/landing except, nowhere at all;
 * it has its own icon set, its own design tokens (scoped under
 * .syncher-dashboard), and its own components under components/dashboard/.
 *
 * Data comes from useWellnessData(), a mock/placeholder hook structured
 * to be swapped for real localStorage-backed tracker data later without
 * changing any component below.
 *
 * Wire this up in your router as the "/dashboard" route, e.g. in App.jsx:
 *
 *   <Route path="/" element={<LandingPage />} />
 *   <Route path="/dashboard" element={<Dashboard />} />
 *
 * (Not applied here automatically — App.jsx is intentionally untouched.)
 */
export default function Dashboard() {
  const { userName, date, wellness, goalsComplete, totalGoals, overallPercent, recentActivity } =
    useWellnessData();

  return (
    <div className="syncher-dashboard">
      <div className="dash-container">
        <WelcomeSection userName={userName} date={date} />

        <DailyOverview
          wellness={wellness}
          goalsComplete={goalsComplete}
          totalGoals={totalGoals}
          overallPercent={overallPercent}
        />

        <section className="dash-cards" aria-label="Wellness trackers">
          <WellnessCard
            icon={IconMood}
            title="Mood"
            value={wellness.mood.value}
            target={wellness.mood.target}
            unit=""
            displayValue={wellness.mood.label}
            goalText="Check in once a day"
            accent="blush"
          />
          <WellnessCard
            icon={IconWater}
            title="Hydration"
            value={wellness.hydration.value}
            target={wellness.hydration.target}
            unit={wellness.hydration.unit}
            accent="sage"
          />
          <WellnessCard
            icon={IconSleep}
            title="Sleep"
            value={wellness.sleep.value}
            target={wellness.sleep.target}
            unit={wellness.sleep.unit}
            accent="olive"
          />
          <WellnessCard
            icon={IconMove}
            title="Movement"
            value={wellness.movement.value}
            target={wellness.movement.target}
            unit={wellness.movement.unit}
            accent="earth"
          />
          <WellnessCard
            icon={IconNourish}
            title="Nourishment"
            value={wellness.nourishment.value}
            target={wellness.nourishment.target}
            unit={wellness.nourishment.unit}
            accent="amber"
          />
        </section>

        <QuickActions />

        <RecentActivity items={recentActivity} />
      </div>
    </div>
  );
}