import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import Logo from "../Logo/Logo";
import { BagIcon, MoonIcon, SunIcon } from "../Icons/Icons";
import "./Navbar.css";

function Navbar() {
  const { cartCount, favorites, theme, toggleTheme, setBagOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <Logo />
        <nav className="navbar__links" aria-label="Primary">
          <Link to="/" state={{ scrollTo: "archive" }}>
            Archive
          </Link>
          <Link to="/" state={{ scrollTo: "timeline" }}>
            Timeline
          </Link>
          <NavLink to="/saved">
            Saved
            {favorites.length > 0 && <span className="navbar__count tabular">{favorites.length}</span>}
          </NavLink>
        </nav>
        <div className="navbar__actions">
          <button
            type="button"
            className="icon-button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="icon-button navbar__bag"
            onClick={() => setBagOpen(true)}
            aria-label={`Open bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <BagIcon />
            {cartCount > 0 && (
              <span key={cartCount} className="navbar__badge tabular" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
