import { useNavigate } from 'react-router-dom';
import type { Meal } from '../../types/meals';
import styles from './RecipeCard.module.scss';

type RecipeCardProps = {
  meal: Meal;
};

export function RecipeCard({ meal }: RecipeCardProps) {
  const navigate = useNavigate();

  const goToRecipeDetails = () => {
    navigate(`/recipe/${meal.idMeal}`);
  };

  return (
    <article
      className={styles.card}
      onClick={goToRecipeDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
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
          className={styles.favoriteButton}
          aria-label={`Add ${meal.strMeal} to favorites`}
          onClick={(event) => {
            event.stopPropagation();

            // Add favorite logic here later
            console.log('Favorite clicked:', meal.idMeal);
          }}
        >
          ♡
        </button>
      </div>

      <div className={styles.content}>
        <h3>{meal.strMeal}</h3>

        <div className={styles.meta}>
          <span>🌎 {meal.strArea ?? 'Unknown'}</span>
          <span>▣ {meal.strCategory ?? 'Recipe'}</span>
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