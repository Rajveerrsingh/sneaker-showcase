import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../store";
import { BagIcon, HeartIcon, MoonIcon, SunIcon } from "./Icons";

function Navbar() {
  const { cartCount, favorites, theme, toggleTheme, openDrawer } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Sole Archive home">
          <span className="brand-mark" aria-hidden="true">SA</span>
          <span className="brand-name">Sole Archive</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          <NavLink to="/" end>Home</NavLink>
          <Link
            to="/"
            state={{ scrollTo: "shop" }}
            onClick={(e) => {
              const el = document.getElementById("shop");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Shop
          </Link>
          <NavLink to="/saved">Saved</NavLink>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button type="button" className="icon-btn badge-wrap" onClick={() => openDrawer("saved")} aria-label={`Saved sneakers (${favorites.length})`}>
            <HeartIcon />
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </button>
          <button type="button" className="icon-btn badge-wrap" onClick={() => openDrawer("bag")} aria-label={`Shopping bag (${cartCount} items)`}>
            <BagIcon />
            {cartCount > 0 && <span className="badge" key={cartCount}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
