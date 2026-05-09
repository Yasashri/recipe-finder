import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import type { Meal } from "../../types/meals";
import { getFavoriteMeals } from "../../utils/favorites";
import styles from "./Favorites.module.scss";

const Favorites = () => {
 const [favorites, setFavorites] = useState<Meal[]>(() => getFavoriteMeals());


  function handleFavoriteChange() {
    setFavorites(getFavoriteMeals());
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h1>My favorite recipes</h1>
      </section>

      {favorites.length === 0 ? (
        <section className={styles.emptyState}>
          <div className={styles.iconCircle} aria-hidden="true">
            ♡
          </div>

          <h2>No favorites yet?</h2>

          <p>Save meals you like to see them here.</p>

          <Link to="/" className={styles.browseButton}>
            Browse recipes
          </Link>
        </section>
      ) : (
        <section className={styles.favoritesSection}>
          <div className={styles.sectionHeader}>
            <p>
              You have saved <strong>{favorites.length}</strong>{" "}
              {favorites.length === 1 ? "recipe" : "recipes"}.
            </p>
          </div>

          <div className={styles.grid}>
            {favorites.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                meal={meal}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Favorites;