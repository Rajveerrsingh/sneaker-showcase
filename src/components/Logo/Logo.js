import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

// Mark: a sneaker in profile (toe left) resting on an accent sole, inside a rounded tile.
export function LogoMark({ size = 28 }) {
  return (
    <svg className="logo-mark" width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="8" className="logo-mark__tile" />
      <path className="logo-mark__upper" d="M24.5 19.5V10.5h-3.2l-4.1 4.2-7.6 1.6c-1.7.4-2.6 1.6-2.6 3.2z" />
      <rect x="7" y="21" width="17.5" height="2.5" rx="1.25" className="logo-mark__sole" />
    </svg>
  );
}

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Sole Archive, home">
      <LogoMark />
      <span className="logo__word">Sole Archive</span>
    </Link>
  );
}

export default Logo;
