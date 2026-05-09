import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";
import logo from "/logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link
            to='/'
            className={styles.logoLink}
            aria-label='RecipeFinder home'
          >
            <img src={logo} alt='RecipeFinder' className={styles.logo} />
          </Link>

          <p className={styles.description}>
            Discover easy and tasty recipes from around the world.
          </p>
        </div>

        <nav className={styles.footerGroup} aria-label='Quick links'>
          <h3 className={styles.title}>Quick links</h3>

          <div className={styles.linkGrid}>
            <Link to='/'>Home</Link>
            <Link to='/search'>Search</Link>
            <Link to='/favorites'>Favorites</Link>
            <Link to='/about'>About</Link>
          </div>
        </nav>

        <div className={styles.footerGroup}>
          <h3 className={styles.title}>Follow us</h3>

          <div className={styles.socialGrid}>
            <a href='#' aria-label='Visit RecipeFinder on Facebook'>
              <i
                className='fa-brands fa-square-facebook'
                aria-hidden='true'
              ></i>
              <span>Facebook</span>
            </a>

            <a href='#' aria-label='Visit RecipeFinder on YouTube'>
              <i className='fa-brands fa-youtube' aria-hidden='true'></i>
              <span>YouTube</span>
            </a>

            <a href='#' aria-label='Visit RecipeFinder on Instagram'>
              <i
                className='fa-brands fa-square-instagram'
                aria-hidden='true'
              ></i>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <p className={styles.copy}>© 2026 RecipeFinder. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
