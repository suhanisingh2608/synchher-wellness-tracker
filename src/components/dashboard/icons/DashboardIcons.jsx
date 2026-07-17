/**
 * SyncHer Dashboard — Icon Set
 * Same visual language as the landing page icons (rounded, outline-only,
 * consistent stroke) but kept fully self-contained here so the dashboard
 * has zero dependency on anything inside components/landing/.
 */

const base = {
  width: 24,
  height: 24,
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

export function IconLeaf(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 21.5c-.6-6.8 1.7-15 15-15-1 12-8 15.5-15 15Z" />
      <path d="M7.2 20.8c3-3.5 5.6-7.2 12.6-12.8" />
    </svg>
  );
}

export function IconSun(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="14" cy="14" r="4.3" />
      <path d="M14 4.5v2.6M14 20.9v2.6M23.5 14h-2.6M7.1 14H4.5M20.5 7.5l-1.8 1.8M9.3 18.7l-1.8 1.8M20.5 20.5l-1.8-1.8M9.3 9.3 7.5 7.5" />
    </svg>
  );
}

export function IconBell(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 20.5a2.6 2.6 0 0 0 5 0" />
      <path d="M7 17c-.9 0-1.3-1.1-.6-1.7C7.5 14.3 8 12.7 8 11.2V10a6 6 0 0 1 12 0v1.2c0 1.5.5 3.1 1.6 4.1.7.6.3 1.7-.6 1.7Z" />
    </svg>
  );
}

export function IconPlus(props) {
  return (
    <svg {...base} width={18} height={18} viewBox="0 0 18 18" {...props}>
      <path d="M9 3v12M3 9h12" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...base} width={20} height={20} viewBox="0 0 28 28" {...props}>
      <circle cx="14" cy="14" r="9.5" />
      <path d="M14 8.5V14l4 2.4" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...base} width={16} height={16} viewBox="0 0 28 28" {...props}>
      <path d="M6 14.5 11.5 20 22 8.5" />
    </svg>
  );
}