import { IconLeaf, IconBell } from './icons/DashboardIcons';
import './WelcomeSection.css';

function getGreeting(hour) {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * WelcomeSection — lightweight top bar + greeting.
 * Deliberately NOT the landing page's Navbar component: this is a
 * separate, self-contained dashboard header with its own minimal style.
 */
export default function WelcomeSection({ userName, date }) {
  const greeting = getGreeting(date.getHours());
  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="dash-welcome">
      <div className="dash-welcome__topbar">
        <span className="dash-welcome__logo">
          <IconLeaf className="dash-welcome__logo-icon" />
          SyncHer
        </span>
        <button type="button" className="dash-welcome__bell" aria-label="Notifications">
          <IconBell />
        </button>
      </div>

      <div className="dash-welcome__greeting">
        <p className="dash-welcome__date">{formattedDate}</p>
        <h1 className="dash-welcome__headline">
          {greeting}, <em>{userName}</em>.
        </h1>
        <p className="dash-welcome__subtext">
          Here&rsquo;s a gentle look at how your day is going.
        </p>
      </div>
    </header>
  );
}