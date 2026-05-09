import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { searchMealsByName } from "../../api/mealApi";
import type { Meal } from "../../types/meals";
import styles from "./SearchResults.module.scss";

const Search=()=> {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!query.trim()) return;

    async function getMeals() {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const results = await searchMealsByName(query);
        setMeals(results);
      } catch {
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    getMeals();
  }, [query]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className={styles.page}>
      <section className={styles.searchSection}>
        <h1 className={styles.title}>Search recipes</h1>

        <SearchBar defaultValue={query} />

        {query && (
          <div className={styles.resultBanner}>
            Showing results for <span>“{query}”</span>
          </div>
        )}
      </section>

      <section className={styles.resultsSection}>
        {isLoading && <p className={styles.message}>Loading recipes...</p>}

        {errorMessage && <p className={styles.message}>{errorMessage}</p>}

        {!isLoading && !errorMessage && query && meals.length === 0 && (
          <p className={styles.message}>
            No recipes found for “{query}”. Try another keyword.
          </p>
        )}

        {!isLoading && meals.length > 0 && (
          <div className={styles.grid}>
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Search