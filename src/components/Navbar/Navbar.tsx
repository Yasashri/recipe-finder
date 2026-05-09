import { NavLink, Link } from "react-router-dom";
import s from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link to='/' className={s.logo}>
          <img src='logo.png' alt='logo' />
        </Link>

        <div className={s.links}>
          <NavLink to='/' className={s.link}>
            Home
          </NavLink>
          <NavLink to='/' className={s.link}>
            Search
          </NavLink>
          <NavLink to='/favorites' className={s.link}>
            Favorites
          </NavLink>
          <NavLink to='/' className={s.link}>
            About
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
