import { useEffect, useRef, useState } from 'react';

/**
 * Shared scroll-reveal hook used by section components for a subtle
 * fade-up-on-scroll effect. Kept here (rather than a new file) since
 * OrganicDivider is already imported by every section, and this keeps
 * the file structure exactly as-is per the "no new files" requirement.
 * Respects prefers-reduced-motion by revealing immediately, no animation.
 */
export function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/**
 * OrganicDivider — the page's signature motif.
 * A soft, hand-drawn-feeling botanical wave used consistently between
 * sections instead of a hard straight-line or block-color break.
 * `tone` should match the PREVIOUS section's background color, so the
 * wave reads as that color flowing down into the new section.
 */
export default function OrganicDivider({ tone = 'ivory', flip = false }) {
  return (
    <div
      className={`organic-divider organic-divider--${tone} ${flip ? 'organic-divider--flip' : ''}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,64 C240,110 480,10 720,40 C960,70 1200,120 1440,56 L1440,120 L0,120 Z" />
      </svg>
      <svg className="organic-divider__sprig" viewBox="0 0 60 60" aria-hidden="true">
        <path
          d="M30 50c-2-14 3-30 20-34-4 18-8 28-20 34Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M22 46c3-9 8-15 14-18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}