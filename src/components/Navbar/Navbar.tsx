import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import s from "./Navbar.module.scss";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
   const handleAboutClick = () => {
    alert("Used TheMealDB API to fetch recipe data for Recipe Finder.");
    setIsMenuOpen(false);
  };

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to="/" className={s.logo} onClick={closeMenu}>
          <img src="/logo.png" alt="RecipeFinder logo" />
        </Link>

        <button
          type="button"
          className={`${s.menuButton} ${isMenuOpen ? s.menuButtonOpen : ""}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${s.links} ${isMenuOpen ? s.linksOpen : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.activeLink : ""}`
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.activeLink : ""}`
            }
            onClick={closeMenu}
          >
            Search
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `${s.link} ${isActive ? s.activeLink : ""}`
            }
            onClick={closeMenu}
          >
            Favorites
          </NavLink>

          <NavLink
            to="#"
            className={s.link}
            onClick={handleAboutClick}
          >
            About
          </NavLink>
        </div>
      </nav>

      {isMenuOpen && (
        <button
          type="button"
          className={s.backdrop}
          aria-label="Close menu"
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Navbar;