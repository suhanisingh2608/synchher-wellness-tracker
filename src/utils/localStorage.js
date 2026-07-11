// Initialize with default data structure
const STORAGE_KEYS = {
  MOOD: 'syncHer_mood',
  WATER: 'syncHer_water',
  SLEEP: 'syncHer_sleep',
  NUTRITION: 'syncHer_nutrition', 
};

// Get data from localStorage with fallback
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};

// Save data to localStorage
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage for key "${key}":`, error);
    return false;
  }
};

// Clear specific data
export const clearFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage for key "${key}":`, error);
    return false;
  }
};

// Export keys for easy access
export { STORAGE_KEYS };