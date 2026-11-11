import React from "react";
import { Link } from "react-router-dom";
import { GitHubIcon } from "./Icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-big">Sole Archive</p>
          <p className="muted">
            A sneaker showcase built with React by <strong>Rajveer Singh</strong>. Demo store: prices and stock are
            sample data and nothing is for sale.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <p className="eyebrow">Explore</p>
            <Link to="/">Home</Link>
            <Link to="/saved">Saved pairs</Link>
            <Link to="/sneaker/1">Featured drop</Link>
          </div>
          <div>
            <p className="eyebrow">Developer</p>
            <a href="https://github.com/Rajveerrsingh" target="_blank" rel="noreferrer" className="with-icon">
              <GitHubIcon width={16} height={16} /> GitHub
            </a>
            <a href="https://github.com/Rajveerrsingh/sneaker-showcase" target="_blank" rel="noreferrer">
              Source code
            </a>
            <a href="https://github.com/Rajveerrsingh/sneaker-showcase#image-credits" target="_blank" rel="noreferrer">
              Image credits
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Rajveer Singh</span>
        <span>Photos belong to their authors, see credits</span>
      </div>
    </footer>
  );
}

export default Footer;
