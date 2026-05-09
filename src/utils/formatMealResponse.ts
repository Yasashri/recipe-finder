import type { Meal } from '../types/meals';

export type IngredientItem = {
  ingredient: string;
  measure: string;
};

export function getIngredients(meal: Meal): IngredientItem[] {
  const ingredients: IngredientItem[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (ingredient) {
      ingredients.push({
        ingredient,
        measure: measure || '',
      });
    }
  }

  return ingredients;
}