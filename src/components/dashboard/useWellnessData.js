import { useEffect, useState } from 'react';

/**
 * useWellnessData — the single source of truth for dashboard state.
 *
 * This is intentionally structured the way a localStorage-backed hook
 * would be, but the actual read/write calls are left as placeholders
 * (see TODOs below) so this can be wired up to the real tracker data
 * later without changing any component that consumes this hook.
 *
 * Real trackers (Mood/Water/Sleep/Nutrition) are NOT touched or
 * imported here — this is mock/demo data shaped like what the
 * dashboard will eventually read from them.
 */

const STORAGE_KEY = 'syncher:dashboard:today';

const FALLBACK_DATA = {
  userName: 'Suhani',
  date: new Date(),
  wellness: {
    mood: { label: 'Calm', value: 4, target: 5, unit: '/ 5', complete: false },
    hydration: { value: 5, target: 8, unit: 'glasses', complete: false },
    sleep: { value: 7.2, target: 8, unit: 'hrs', complete: false },
    movement: { value: 22, target: 30, unit: 'min', complete: false },
    nourishment: { value: 2, target: 3, unit: 'meals logged', complete: false },
  },
  recentActivity: [
    { id: 'a1', type: 'mood', text: 'Logged mood: Calm', time: '2 hours ago' },
    { id: 'a2', type: 'hydration', text: 'Added 250ml of water', time: '3 hours ago' },
    { id: 'a3', type: 'movement', text: 'Logged a 20-minute walk', time: '5 hours ago' },
    { id: 'a4', type: 'nourishment', text: 'Logged breakfast', time: 'This morning' },
    { id: 'a5', type: 'sleep', text: 'Logged 7h 12m of sleep', time: 'This morning' },
  ],
};

function loadFromStorage() {
  // TODO(real persistence): replace with real localStorage read once the
  // trackers write to a shared shape, e.g.:
  //   const raw = window.localStorage.getItem(STORAGE_KEY);
  //   return raw ? JSON.parse(raw) : FALLBACK_DATA;
  return FALLBACK_DATA;
}

function saveToStorage(data) {
  // TODO(real persistence): replace with real localStorage write, e.g.:
  //   window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Left as a no-op placeholder per the "logic can be placeholder" spec.
  return data;
}

export function useWellnessData() {
  const [data, setData] = useState(loadFromStorage);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const goalsComplete = Object.values(data.wellness).filter(
    (w) => w.value >= w.target
  ).length;
  const totalGoals = Object.keys(data.wellness).length;
  const overallPercent = Math.round(
    (Object.values(data.wellness).reduce(
      (sum, w) => sum + Math.min(w.value / w.target, 1),
      0
    ) /
      totalGoals) *
      100
  );

  return {
    ...data,
    goalsComplete,
    totalGoals,
    overallPercent,
    setData, // exposed so future real actions (Quick Actions, etc.) can update state
  };
}