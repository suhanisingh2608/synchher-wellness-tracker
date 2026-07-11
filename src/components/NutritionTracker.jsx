import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/localStorage';
import './NutritionTracker.css';

export default function NutritionTracker() {
  // State for meal entries
  const [mealEntries, setMealEntries] = useState([]);
  
  // State for search/logging
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State for daily calorie goal
  const [calorieGoal, setCalorieGoal] = useState(2000);
  const [editingGoal, setEditingGoal] = useState(false);
  const [tempGoal, setTempGoal] = useState(2000);

  // Load nutrition data on mount
  useEffect(() => {
    const storedNutrition = getFromStorage(STORAGE_KEYS.NUTRITION, {});
    
    if (storedNutrition && storedNutrition.entries) {
      setMealEntries(storedNutrition.entries);
      setCalorieGoal(storedNutrition.goal || 2000);
      setTempGoal(storedNutrition.goal || 2000);
    }
  }, []);

  // Get today's meals
  const today = new Date().toDateString();
  const todayMeals = mealEntries.filter(meal => meal.date === today);
  
  // Calculate today's totals
  const todayCalories = todayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const todayProtein = todayMeals.reduce((sum, meal) => sum + (meal.protein || 0), 0);
  const todayCarbs = todayMeals.reduce((sum, meal) => sum + (meal.carbs || 0), 0);
  const todayFat = todayMeals.reduce((sum, meal) => sum + (meal.fat || 0), 0);
  const todayFiber = todayMeals.reduce((sum, meal) => sum + (meal.fiber || 0), 0);

  const calorieProgress = Math.min((todayCalories / calorieGoal) * 100, 100);

  // Search for food using Open Food Facts API
  const handleSearch = async () => {
    // Validate query
    if (!searchQuery.trim()) {
      setError('Please enter a food name');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchResults([]);

    try {
      // Open Food Facts API - CORS enabled, no auth needed!
      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
          searchQuery
        )}&json=1`
      );

      // Handle HTTP errors
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Check if API returned results
      if (!data.products || data.products.length === 0) {
        setError('No foods found. Try a different search.');
        setIsLoading(false);
        return;
      }

      // Format results for display (filter for items with nutrition data)
      const formatted = data.products
        .filter(product => {
          // Only include products with nutrition facts
          return (
            product.energy_kcal_100g || 
            product.energy_kcal ||
            (product.nutriments && product.nutriments['energy-kcal_100g'])
          );
        })
        .slice(0, 10) // Limit to 10 results
        .map(product => {
          // Get calories per 100g
          const calories = Math.round(
            product.energy_kcal_100g ||
            (product.nutriments && product.nutriments['energy-kcal_100g']) ||
            0
          );

          // Get macros per 100g
          const protein = Math.round(
            (product.nutriments?.proteins_100g || 0) * 10
          ) / 10;
          const carbs = Math.round(
            (product.nutriments?.carbohydrates_100g || 0) * 10
          ) / 10;
          const fat = Math.round(
            (product.nutriments?.fat_100g || 0) * 10
          ) / 10;
          const fiber = Math.round(
            (product.nutriments?.fiber_100g || 0) * 10
          ) / 10;

          return {
            id: product.id,
            label: product.product_name || product.name || 'Unknown',
            calories,
            protein,
            carbs,
            fat,
            fiber,
            serving: '100g',
          };
        });

      if (formatted.length === 0) {
        setError('No foods with nutrition data found. Try another search.');
        setIsLoading(false);
        return;
      }

      setSearchResults(formatted);

    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search. Check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Log a meal (from search results)
  const handleLogMeal = (food) => {
    const newMeal = {
      date: today,
      label: food.label,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      fiber: food.fiber,
      serving: food.serving,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().getTime(),
    };

    const updatedEntries = [newMeal, ...mealEntries];
    setMealEntries(updatedEntries);
    saveToStorage(STORAGE_KEYS.NUTRITION, {
      entries: updatedEntries,
      goal: calorieGoal,
    });

    // Clear search results
    setSearchResults([]);
  };

  // Remove a meal
  const handleRemoveMeal = (index) => {
    const updatedEntries = mealEntries.filter((_, i) => i !== index);
    setMealEntries(updatedEntries);
    saveToStorage(STORAGE_KEYS.NUTRITION, {
      entries: updatedEntries,
      goal: calorieGoal,
    });
  };

  // Update calorie goal
  const handleSaveGoal = () => {
    if (tempGoal > 0) {
      setCalorieGoal(tempGoal);
      saveToStorage(STORAGE_KEYS.NUTRITION, {
        entries: mealEntries,
        goal: tempGoal,
      });
      setEditingGoal(false);
    }
  };

  // Handle Enter key in search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="nutrition-tracker">
      <h2>Nutrition Tracker</h2>

      {/* Search Section */}
      <div className="search-section">
        <h3>Log a Meal</h3>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a food (e.g., 'chicken breast', 'apple', 'rice')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="search-input"
            disabled={isLoading}
          />
          <button
            onClick={handleSearch}
            className="search-btn"
            disabled={isLoading}
          >
            {isLoading ? '🔍 Searching...' : '🔍 Search'}
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <p className="results-label">Select a food to log:</p>
            <ul className="results-list">
              {searchResults.map((food, index) => (
                <li key={index} className="result-item">
                  <div className="result-info">
                    <div className="result-name">{food.label}</div>
                    <div className="result-serving">{food.serving}</div>
                    <div className="result-nutrition">
                      {food.calories} cal • P: {food.protein}g • C: {food.carbs}g • F:{' '}
                      {food.fat}g
                    </div>
                  </div>
                  <button
                    onClick={() => handleLogMeal(food)}
                    className="log-btn"
                  >
                    + Log
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Calorie Goal Section */}
      <div className="goal-section">
        <div className="goal-header">
          <span className="goal-text">Daily Goal: {calorieGoal} cal</span>
          <button
            className="goal-btn"
            onClick={() => setEditingGoal(!editingGoal)}
            title="Edit calorie goal"
          >
            ⚙️
          </button>
        </div>

        {editingGoal && (
          <div className="goal-editor">
            <input
              type="number"
              min="1000"
              max="5000"
              step="100"
              value={tempGoal}
              onChange={(e) => setTempGoal(Number(e.target.value))}
              className="goal-input"
            />
            <button onClick={handleSaveGoal} className="save-btn">
              Save
            </button>
            <button
              onClick={() => {
                setEditingGoal(false);
                setTempGoal(calorieGoal);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Calorie Progress */}
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-text">
            {Math.round(todayCalories)} / {calorieGoal} cal
          </span>
          <span className="progress-percentage">
            {Math.round(calorieProgress)}%
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${calorieProgress}%` }}
          ></div>
        </div>

        {todayCalories >= calorieGoal && (
          <p className="status-message">✨ You've reached your calorie goal!</p>
        )}
      </div>

      {/* Macronutrients Breakdown */}
      {todayMeals.length > 0 && (
        <div className="macros-section">
          <h3>Today's Macros</h3>
          <div className="macros-grid">
            <div className="macro-card">
              <span className="macro-label">Protein</span>
              <span className="macro-value">{Math.round(todayProtein)}g</span>
              <span className="macro-unit">(~4 cal/g)</span>
            </div>
            <div className="macro-card">
              <span className="macro-label">Carbs</span>
              <span className="macro-value">{Math.round(todayCarbs)}g</span>
              <span className="macro-unit">(~4 cal/g)</span>
            </div>
            <div className="macro-card">
              <span className="macro-label">Fat</span>
              <span className="macro-value">{Math.round(todayFat)}g</span>
              <span className="macro-unit">(~9 cal/g)</span>
            </div>
            <div className="macro-card">
              <span className="macro-label">Fiber</span>
              <span className="macro-value">{Math.round(todayFiber)}g</span>
              <span className="macro-unit">(digestive health)</span>
            </div>
          </div>
        </div>
      )}

      {/* Today's Meals Log */}
      <div className="meals-section">
        <h3>Today's Meals</h3>
        {todayMeals.length === 0 ? (
          <p className="empty-state">No meals logged yet. Search and log a meal! 🍽️</p>
        ) : (
          <ul className="meals-list">
            {todayMeals.map((meal, index) => (
              <li key={index} className="meal-item">
                <div className="meal-info">
                  <div className="meal-name">{meal.label}</div>
                  <div className="meal-serving">{meal.serving}</div>
                  <div className="meal-details">
                    <span className="meal-calories">{meal.calories} cal</span>
                    <span className="meal-macros">
                      P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                    </span>
                  </div>
                  <div className="meal-time">{meal.time}</div>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleRemoveMeal(index)}
                  title="Remove this meal"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}