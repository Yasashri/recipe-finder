import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import type { Meal } from "../../types/meals";
import { isMealFavorite, toggleFavoriteMeal } from "../../utils/favorites";
import styles from "./RecipeCard.module.scss";

type RecipeCardProps = {
  meal: Meal;
  onFavoriteChange?: () => void;
};

export function RecipeCard({ meal, onFavoriteChange }: RecipeCardProps) {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(() =>
    isMealFavorite(meal.idMeal)
  );

  const goToRecipeDetails = () => {
    navigate(`/recipe/${meal.idMeal}`);
  };

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const newFavoriteState = toggleFavoriteMeal(meal);

    setIsFavorite(newFavoriteState);
    onFavoriteChange?.();
  };

  return (
    <article
      className={styles.card}
      onClick={goToRecipeDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          goToRecipeDetails();
        }
      }}
    >
      <div className={styles.imageWrap}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={styles.image}
        />

        <button
          type="button"
          className={`${styles.favoriteButton} ${
            isFavorite ? styles.favoriteButtonActive : ""
          }`}
          aria-label={
            isFavorite
              ? `Remove ${meal.strMeal} from favorites`
              : `Add ${meal.strMeal} to favorites`
          }
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className={styles.content}>
        <h3>{meal.strMeal}</h3>

        <div className={styles.meta}>
          <span>🌎 {meal.strArea ?? "Unknown"}</span>
          <span>▣ {meal.strCategory ?? "Recipe"}</span>
        </div>

        <button
          type="button"
          className={styles.viewButton}
          onClick={(event) => {
            event.stopPropagation();
            goToRecipeDetails();
          }}
        >
          View Recipe
        </button>
      </div>
    </article>
  );
}