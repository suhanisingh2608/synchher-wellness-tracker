import { IconLeaf, IconMood } from './LandingIcons';
import OrganicDivider, { useRevealOnScroll } from './OrganicDivider';
import './MeetYourCompanion.css';

/**
 * A premium feature teaser for the future AI Wellness Companion
 * (see product-vision.md → Future Features). This is purely presentational:
 * no chat state, no message handling, no API calls. The "conversation" below
 * is static illustrative copy only, meant to convey the feeling of the
 * feature, not to function as a working chatbot.
 */
export default function MeetYourCompanion() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section id="wellness-companion" className="wellness-companion">
      <OrganicDivider tone="beige" />
      <div ref={ref} className={`wellness-companion__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        <div className="wellness-companion__text">
          <span className="wellness-companion__badge">
            <IconLeaf className="wellness-companion__badge-icon" />
            Coming soon
          </span>
          <h2 className="section-heading wellness-companion__heading">
            Meet your Wellness Companion.
          </h2>
          <p className="section-supporting">
            A gentle AI companion, arriving soon, that understands your mood,
            hydration, sleep, and nourishment — and offers quiet, personalized
            encouragement instead of another notification to manage.
          </p>
          <p className="wellness-companion__note">
            No pressure. No streaks to lose. Just a calm presence that
            checks in the way a thoughtful friend would.
          </p>
        </div>

        <div className="wellness-companion__preview" aria-hidden="true">
          <div className="companion-mock">
            <div className="companion-mock__header">
              <span className="companion-mock__avatar">
                <IconMood />
              </span>
              <div>
                <span className="companion-mock__name">Your Companion</span>
                <span className="companion-mock__status">Coming soon</span>
              </div>
            </div>

            <div className="companion-mock__bubble companion-mock__bubble--companion">
              Good morning 🌿 You slept a little less than usual — want a
              gentler start today?
            </div>
            <div className="companion-mock__bubble companion-mock__bubble--user">
              Yes, please.
            </div>
            <div className="companion-mock__bubble companion-mock__bubble--companion">
              Let&rsquo;s ease in — a glass of water first, then a slow start.
            </div>

            <div className="companion-mock__input">
              <span>This preview is illustrative — the companion isn&rsquo;t active yet</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}