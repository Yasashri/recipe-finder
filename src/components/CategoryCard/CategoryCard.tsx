import type { Category } from "../../types/meals";
import b from "./CategoryCard.module.scss";

type CategoryCardProps = {
  category: Category;
  onClick?: (categoryName: string) => void;
};

const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  const title =
    category.strCategory === "Miscellaneous"
      ? "Assorted"
      : category.strCategory;

  return (
    <button
      type='button'
      className={b.card}
      onClick={() => onClick?.(category.strCategory)}
    >
      <img
        src={category.strCategoryThumb}
        alt={title}
        className={b.image}
      />

      <span className={b.title}>{title}</span>
    </button>
  );
};

export default CategoryCard;
