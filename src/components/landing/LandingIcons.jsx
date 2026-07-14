/**
 * SyncHer Landing Page — Icon Set
 * One consistent icon family: rounded, outline-only, 1.75 stroke weight.
 * Per design-system.md: "Do not mix filled and outlined icons randomly."
 */

const base = {
  width: 28,
  height: 28,
  viewBox: '0 0 28 28',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconMood(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="14" cy="14" r="9.5" />
      <path d="M10 12.5c.3-.7 1-1 1.5-1s1.2.3 1.5 1" />
      <path d="M15 12.5c.3-.7 1-1 1.5-1s1.2.3 1.5 1" />
      <path d="M9.8 17c1 1.4 2.5 2.2 4.2 2.2s3.2-.8 4.2-2.2" />
    </svg>
  );
}

export function IconWater(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4.5c3 4 6.5 8.3 6.5 12.3a6.5 6.5 0 1 1-13 0c0-4 3.5-8.3 6.5-12.3Z" />
      <path d="M10.7 17.2a3.3 3.3 0 0 0 3.3 3.1" />
    </svg>
  );
}

export function IconSleep(props) {
  return (
    <svg {...base} {...props}>
      <path d="M19.5 15.3A7.6 7.6 0 0 1 10.2 6a7.6 7.6 0 1 0 9.3 9.3Z" />
      <path d="M17.5 6.5h3.8M19.4 4.6v3.8" />
    </svg>
  );
}

export function IconMove(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="14" cy="6.2" r="1.7" />
      <path d="M14 10v5.3l-3.3 6.2M14 15.3l3.3 6.2M9.7 12.4 14 10l4.3 2.4M14 10l-3.6 1.6M14 10l3.6 1.6" />
    </svg>
  );
}

export function IconNourish(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 5.5c-4.5 0-8 3.3-8 8.2 0 4 3 8 8 8.3" />
      <path d="M14 5.5c4.5 0 8 3.3 8 8.2 0 4-3 8-8 8.3" />
      <path d="M14 5.5V21.8" />
      <path d="M14 5.5c1.6-2.4 3.4-1.8 3.4-1.8" />
    </svg>
  );
}

export function IconInsights(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 21V13.5" />
      <path d="M12 21V7" />
      <path d="M18.5 21V11" />
      <path d="M22 21H4.2" />
      <path d="M17 6l3-2.3M20 3.7l.3 2.6-2.6-.3" />
    </svg>
  );
}

export function IconLeaf(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 21.5c-.6-6.8 1.7-15 15-15-1 12-8 15.5-15 15Z" />
      <path d="M7.2 20.8c3-3.5 5.6-7.2 12.6-12.8" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 20 20" {...props}>
      <path d="M4 10h12" />
      <path d="M11 5.5 15.5 10 11 14.5" />
    </svg>
  );
}

export function IconMenu(props) {
  return (
    <svg {...base} width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg {...base} width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
