import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import TrustPillars from '../components/landing/TrustPillars';
import WhySyncHer from '../components/landing/WhySyncHer';
import DailyWellnessPreview from '../components/landing/DailyWellnessPreview';
import CoreFeatures from '../components/landing/CoreFeatures';
import MeetYourCompanion from '../components/landing/MeetYourCompanion';
import HowItWorks from '../components/landing/HowItWorks';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';
import './LandingPage.css';

/**
 * SyncHer Landing Page
 *
 * A standalone marketing homepage, entirely separate from the dashboard,
 * trackers, and any existing app logic. This component owns no state
 * related to mood/water/sleep/nutrition data — it only introduces the
 * product and links visitors toward the dashboard/app experience.
 *
 * Wire this up in your router as the "/" route, e.g. in App.jsx:
 *
 *   <Route path="/" element={<LandingPage />} />
 *   <Route path="/dashboard" element={<Dashboard />} />
 *
 * (Not applied here automatically — App.jsx is intentionally untouched.)
 */
export default function LandingPage() {
  return (
    <div className="syncher-landing">
      <Navbar />
      <main>
        <Hero />
        <TrustPillars />
        <WhySyncHer />
        <DailyWellnessPreview />
        <CoreFeatures />
        <MeetYourCompanion />
        <HowItWorks />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}