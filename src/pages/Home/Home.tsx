import { useEffect, useState } from "react";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { RecipeCard } from "../../components/RecipeCard/RecipeCard";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import type { Category, Meal } from "../../types/meals";
import heroImage from "../../assets/images/hero-pasta.png";
import styles from "./Home.module.scss";

import { getCategories, getMealsByCategory } from "../../api/mealApi";

const RECIPES_PER_PAGE = 12;

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Chicken");
  const [currentPage, setCurrentPage] = useState(1);

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
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
        setError("Failed to load recipes.");
      } finally {
        setIsLoadingMeals(false);
      }
    }

    loadMeals();
  }, [selectedCategory]);

  function handleCategoryClick(categoryName: string) {
    setSelectedCategory(categoryName);

    setTimeout(() => {
      const moveToRecipe = document.getElementById("recipes");

      moveToRecipe?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }

  function handlePageChange(page: number) {
    setCurrentPage(page);

    const picksSection = document.getElementById("recipes");
    picksSection?.scrollIntoView({ behavior: "smooth" });
  }

  const visibleCategories = categories;

  const totalPages = Math.ceil(meals.length / RECIPES_PER_PAGE);

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
          <h2>Our picks for you</h2>

          <p>{selectedCategory} recipes</p>
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

                {Array.from({ length: totalPages }, (_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      type='button'
                      className={`${styles.pageNumber} ${
                        currentPage === page ? styles.activePage : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </button>
                  );
                })}

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
