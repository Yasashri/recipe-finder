import type { Meal } from "../types/meals";

const FAVORITES_KEY = "recipefinder_favorites";

export function getFavoriteMeals(): Meal[] {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);

  if (!storedFavorites) return [];

  try {
    return JSON.parse(storedFavorites) as Meal[];
  } catch {
    return [];
  }
}

export function saveFavoriteMeals(meals: Meal[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(meals));
}

export function isMealFavorite(mealId: string): boolean {
  const favorites = getFavoriteMeals();

  return favorites.some((meal) => meal.idMeal === mealId);
}

export function addFavoriteMeal(meal: Meal) {
  const favorites = getFavoriteMeals();

  const alreadyFavorite = favorites.some(
    (favoriteMeal) => favoriteMeal.idMeal === meal.idMeal
  );

  if (alreadyFavorite) return;

  saveFavoriteMeals([...favorites, meal]);
}

export function removeFavoriteMeal(mealId: string) {
  const favorites = getFavoriteMeals();

  const updatedFavorites = favorites.filter((meal) => meal.idMeal !== mealId);

  saveFavoriteMeals(updatedFavorites);
}

export function toggleFavoriteMeal(meal: Meal): boolean {
  const alreadyFavorite = isMealFavorite(meal.idMeal);

  if (alreadyFavorite) {
    removeFavoriteMeal(meal.idMeal);
    return false;
  }

  addFavoriteMeal(meal);
  return true;
}