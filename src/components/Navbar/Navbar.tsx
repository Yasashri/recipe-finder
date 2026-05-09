import { NavLink, Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to='/' className={styles.logo}>
          <span className={styles.logoIcon}>🍲</span>
          <span>RecipeFinder</span>
        </Link>

        <div className={styles.links}>
          <NavLink to='/' className={styles.link}>
            Home
          </NavLink>
          <NavLink to='/favorites' className={styles.link}>
            Favorites
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
