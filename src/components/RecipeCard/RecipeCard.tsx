import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MouseEvent } from "react";
import type { Meal } from "../../types/meals";
import { isMealFavorite, toggleFavoriteMeal } from "../../utils/favorites";
import styles from "./RecipeCard.module.scss";
import { toast } from "react-toastify";

type RecipeCardProps = {
  meal: Meal;
  onFavoriteChange?: () => void;
};

const RecipeCard = ({ meal, onFavoriteChange }: RecipeCardProps) => {
  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(() =>
    isMealFavorite(meal.idMeal),
  );

  function goToRecipeDetails() {
    navigate(`/recipe/${meal.idMeal}`);
  }

  function handleFavoriteClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    const newFavoriteState = toggleFavoriteMeal(meal);

    setIsFavorite(newFavoriteState);
    onFavoriteChange?.();

    if (newFavoriteState) {
    toast.success("Added to favorites");
  } else {
    toast.info("Removed from favorites");
  }
  }

  return (
    <article
      className={styles.card}
    >
      <div className={styles.imageWrap}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className={styles.image}
        />

        <button
          type='button'
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
          {isFavorite ? (
            <i className='fa-solid fa-heart' aria-hidden='true'></i>
          ) : (
            <i className='fa-regular fa-heart' aria-hidden='true'></i>
          )}
        </button>
      </div>

      <div className={styles.content}>
        <h3>{meal.strMeal}</h3>

        <div className={styles.meta}>
          <span>
            <i className='fa-solid fa-earth-americas' aria-hidden='true'></i>
            {meal.strArea ?? "Unknown"}
          </span>
          <span>
            <i className='fa-solid fa-book' aria-hidden='true'></i>
            {meal.strCategory ?? "Recipe"}
          </span>
        </div>

        <button
          type='button'
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
};

export default RecipeCard;
