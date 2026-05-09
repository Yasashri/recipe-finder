import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMealById } from "../../api/mealApi";
import type { Meal } from "../../types/meals";
import styles from "./RecipeDetails.module.scss";
import { isMealFavorite, toggleFavoriteMeal } from "../../utils/favorites";

type IngredientItem = {
  ingredient: string;
  measure: string;
};

function getIngredients(meal: Meal): IngredientItem[] {
  const ingredients: IngredientItem[] = [];

  for (let index = 1; index <= 20; index += 1) {
    const ingredient = meal[`strIngredient${index}` as keyof Meal];
    const measure = meal[`strMeasure${index}` as keyof Meal];

    if (typeof ingredient === "string" && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: typeof measure === "string" ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

function getInstructionSteps(instructions?: string | null): string[] {
  if (!instructions) return [];

  return instructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean);
}

const RecipeDetails = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    const mealId = id;
    async function loadMeal() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const result = await getMealById(mealId);

        if (!result) {
          setErrorMessage("Recipe not found.");
          return;
        }

        setMeal(result);
        setIsFavorite(isMealFavorite(result.idMeal));
      } catch {
        setErrorMessage("Something went wrong while loading this recipe.");
      } finally {
        setIsLoading(false);
      }
    }

    loadMeal();
  }, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ingredients = useMemo(() => {
    if (!meal) return [];
    return getIngredients(meal);
  }, [meal]);

  const instructionSteps = useMemo(() => {
    if (!meal) return [];
    return getInstructionSteps(meal.strInstructions);
  }, [meal]);

  if (isLoading) {
    return (
      <main className={styles.page}>
        <section className={styles.stateBox}>
          <p>Loading recipe...</p>
        </section>
      </main>
    );
  }

  if (errorMessage || !meal) {
    return (
      <main className={styles.page}>
        <section className={styles.stateBox}>
          <h1>Recipe not found</h1>
          <p>{errorMessage}</p>
          <Link to='/' className={styles.backLink}>
            Browse recipes
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.imageWrap}>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className={styles.image}
          />
        </div>

        <div className={styles.heroContent}>
          <Link to='/' className={styles.backLink}>
            ← Back to recipes
          </Link>

          <h1 className={styles.title}>{meal.strMeal}</h1>

          <div className={styles.tags}>
            {meal.strCategory && <span>{meal.strCategory}</span>}
            {meal.strArea && <span>{meal.strArea}</span>}
          </div>

          <button
            type='button'
            className={styles.favoriteButton}
            onClick={() => {
              if (!meal) return;

              const newFavoriteState = toggleFavoriteMeal(meal);
              setIsFavorite(newFavoriteState);
            }}
          >
            {isFavorite ? "Already in favorites" : "Add to favorites"}
          </button>

          <div className={styles.links}>
            {meal.strYoutube && (
              <a href={meal.strYoutube} target='_blank' rel='noreferrer'>
                Watch on YouTube
              </a>
            )}

            {meal.strSource && (
              <a href={meal.strSource} target='_blank' rel='noreferrer'>
                View source
              </a>
            )}
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <h2>Ingredients</h2>

        <div className={styles.ingredientsGrid}>
          {ingredients.map((item) => (
            <div
              key={`${item.measure}-${item.ingredient}`}
              className={styles.ingredient}
            >
              <span className={styles.checkIcon}><i className="fa-solid fa-circle-check"></i></span>
              <span>
                {item.measure} {item.ingredient}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <h2>Instructions</h2>

        <ol className={styles.instructions}>
          {instructionSteps.map((step, index) => (
            <li key={`${step}-${index}`}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {(meal.strYoutube || meal.strSource) && (
        <section className={styles.card}>
          <h2>More about this recipe</h2>

          <div className={styles.actionButtons}>
            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target='_blank'
                rel='noreferrer'
                className={styles.primaryAction}
              >
                Watch on YouTube
              </a>
            )}

            {meal.strSource && (
              <a
                href={meal.strSource}
                target='_blank'
                rel='noreferrer'
                className={styles.secondaryAction}
              >
                View source
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default RecipeDetails;
