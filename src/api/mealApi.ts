import type { Category, Meal, MealSummary } from "../types/meals";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

type MealsResponse<T> = {
  meals: T[] | null;
};

type CategoriesResponse = {
  categories: Category[];
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching data.");
  }

  return response.json() as Promise<T>;
}

export async function searchMealsByName(query: string): Promise<Meal[]> {
  const data = await fetchJson<MealsResponse<Meal>>(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`,
  );

  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const data = await fetchJson<MealsResponse<Meal>>(
    `${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`,
  );

  return data.meals?.[0] ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<CategoriesResponse>(
    `${BASE_URL}/categories.php`,
  );
  return data.categories;
}

export async function getMealsByCategory(
  category: string,
): Promise<MealSummary[]> {
  const data = await fetchJson<MealsResponse<MealSummary>>(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
  );

  return data.meals ?? [];
}

export async function getRandomMeal(): Promise<Meal | null> {
  const data = await fetchJson<MealsResponse<Meal>>(`${BASE_URL}/random.php`);
  return data.meals?.[0] ?? null;
}
