import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import type { Category, Meal } from "../../types/meals";
import heroImage from "../../assets/images/hero-pasta.png";
import styles from "./Home.module.scss";

import { getCategories, getMealsByCategory } from "../../api/mealApi";

const RECIPES_PER_PAGE = 12;

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Chicken");

  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingMeals, setIsLoadingMeals] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoadingCategories(true);

        const categoryData = await getCategories();

        setCategories(categoryData);
      } catch (error) {
        console.error(error);
        setError("Failed to load categories.");
      } finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadMeals() {
      try {
        setIsLoadingMeals(true);
        setError("");

        const mealData = await getMealsByCategory(selectedCategory);

        setMeals(mealData);
      } catch (error) {
        console.error(error);
        setError("Failed to load recipes.");
      } finally {
        setIsLoadingMeals(false);
      }
    }

    loadMeals();
  }, [selectedCategory]);

  const totalPages = Math.ceil(meals.length / RECIPES_PER_PAGE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setSearchParams({ page: String(totalPages) }, { replace: true });
    }
  }, [currentPage, totalPages, setSearchParams]);

  function handleCategoryClick(categoryName: string) {
    setSelectedCategory(categoryName);
    setSearchParams({ page: "1" });

    setTimeout(() => {
      const moveToRecipe = document.getElementById("recipes");

      moveToRecipe?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;

    setSearchParams({ page: String(page) });

    const picksSection = document.getElementById("recipes");

    picksSection?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const visibleCategories = categories;

  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const paginatedMeals = meals.slice(startIndex, startIndex + RECIPES_PER_PAGE);

  return (
    <>
      <section
        className={styles.hero}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.heroContent}>
          <h1>Finding recipes from around the world</h1>

          <p>
            Search by recipe name, category or ingredients to discover delicious
            recipes.
          </p>

          <SearchBar />
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <h2>Browse categories</h2>

        {!isLoadingCategories && (
          <div className={styles.categoryGrid}>
            {visibleCategories.map((category) => (
              <CategoryCard
                key={category.idCategory}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        )}
      </section>

      <section className={styles.picksSection} id='recipes'>
        <div className={styles.sectionHeader}>
          <h2>{selectedCategory} recipes</h2>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        {isLoadingMeals && (
          <p className={styles.statusMessage}>Loading recipes...</p>
        )}

        {!isLoadingMeals && meals.length === 0 && (
          <p className={styles.statusMessage}>No recipes found.</p>
        )}

        {!isLoadingMeals && meals.length > 0 && (
          <>
            <div className={styles.recipeGrid}>
              {paginatedMeals.map((meal) => (
                <RecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type='button'
                  className={styles.paginationButton}
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>

                <div
                  className={styles.pageInfo}
                  aria-label={`Page ${currentPage} of ${totalPages}`}
                >
                  <span>{currentPage}</span>
                  <span className={styles.pageDivider}>/</span>
                  <span>{totalPages}</span>
                </div>

                <button
                  type='button'
                  className={styles.paginationButton}
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default Home;
