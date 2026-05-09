import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink} aria-label="Go to homepage">
            <img src="logo.png" alt="RecipeFinder" className={styles.logo} />
          </Link>

          <p className={styles.description}>
            Discover easy and tasty recipes from around the world.
          </p>
        </div>

        <nav className={styles.column} aria-label="Quick links">
          <h3 className={styles.title}>Quick links</h3>

          <div className={styles.links}>
            <Link to="/">Home</Link>
            <Link to="/recipes?page=1">All recipes</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/about">About</Link>
          </div>
        </nav>

        <div className={styles.column}>
          <h3 className={styles.title}>Follow us</h3>

          <div className={styles.socialLinks}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <span className={styles.icon} aria-hidden="true">
                f
              </span>
              Facebook
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <span className={styles.icon} aria-hidden="true">
                ◎
              </span>
              Instagram
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <span className={styles.icon} aria-hidden="true">
                ▶
              </span>
              YouTube
            </a>
          </div>
        </div>
      </div>

      <p className={styles.copy}>
        © 2026 RecipeFinder. All rights reserved.
      </p>
    </footer>
  );
}