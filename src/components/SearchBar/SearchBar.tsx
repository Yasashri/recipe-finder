import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.scss';

type SearchBarProps = {
  defaultValue?: string;
};

export function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form
      className={styles.searchBar}
      onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
      }}
    >
      <div className={styles.inputWrap}>
        <span className={styles.icon} aria-hidden="true">
           <i className='fa-solid fa-magnifying-glass' aria-hidden='true'></i>
        </span>

        <input
          value={query}
          required
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search recipe or ingredients..."
          aria-label="Search recipes"
        />
      </div>

      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
}