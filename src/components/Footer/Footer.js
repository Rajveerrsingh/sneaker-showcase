import React from "react";
import { Link } from "react-router-dom";
import { LogoMark } from "../Logo/Logo";
import { GitHubIcon } from "../Icons/Icons";
import "./Footer.css";

const REPO = "https://github.com/Rajveerrsingh/sneaker-showcase";

function Footer() {
  return (
    <footer className="footer">
      <div className="container grid-12 footer__top">
        <div className="footer__brand">
          <LogoMark size={32} />
          <p className="muted">
            A small archive of classic sneakers, built with React as a front-end portfolio project. Prices and stock are
            sample data, not a real store.
          </p>
        </div>
        <nav className="footer__col" aria-label="Explore">
          <p className="eyebrow">Explore</p>
          <Link to="/" state={{ scrollTo: "archive" }}>
            Archive
          </Link>
          <Link to="/" state={{ scrollTo: "timeline" }}>
            Timeline
          </Link>
          <Link to="/saved">Saved pairs</Link>
        </nav>
        <nav className="footer__col" aria-label="Project">
          <p className="eyebrow">Project</p>
          <a href={REPO} target="_blank" rel="noreferrer">
            Source code
          </a>
          <a href={`${REPO}#credits`} target="_blank" rel="noreferrer">
            Photo credits
          </a>
        </nav>
      </div>
      <div className="container footer__bottom">
        <p className="muted">
          © {new Date().getFullYear()} Rajveer Singh. Photos from Wikimedia Commons, used under their CC0 and CC BY-SA
          licences.
        </p>
        <a className="icon-button" href={REPO} target="_blank" rel="noreferrer" aria-label="View the source on GitHub">
          <GitHubIcon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
