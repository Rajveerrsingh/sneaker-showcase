import React from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false"
};

export const HeartIcon = ({ filled = false, ...props }) => (
  <svg {...base} {...props} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20s-7-4.35-8.6-8.8C2.2 7.9 4.3 4.75 7.5 4.75c1.9 0 3.35 1.05 4.5 2.6 1.15-1.55 2.6-2.6 4.5-2.6 3.2 0 5.3 3.15 4.1 6.45C19 15.65 12 20 12 20z" />
  </svg>
);

export const BagIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M5.5 8.5h13l-.9 10.6a1.5 1.5 0 0 1-1.5 1.4H7.9a1.5 1.5 0 0 1-1.5-1.4L5.5 8.5z" />
    <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
  </svg>
);

export const SunIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="3.75" />
    <path d="M12 3v1.5M12 19.5V21M5.6 5.6l1.1 1.1M17.3 17.3l1.1 1.1M3 12h1.5M19.5 12H21M5.6 18.4l1.1-1.1M17.3 6.7l1.1-1.1" />
  </svg>
);

export const MoonIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M19.5 14.6A7.75 7.75 0 0 1 9.4 4.5a7.75 7.75 0 1 0 10.1 10.1z" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </svg>
);

export const SearchIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="11" cy="11" r="6.25" />
    <path d="M19.5 19.5l-4-4" />
  </svg>
);

export const ArrowIcon = ({ className = "", ...props }) => (
  <svg {...base} {...props} className={`icon-arrow ${className}`}>
    <path d="M5 12h14M13.5 6.5L19 12l-5.5 5.5" />
  </svg>
);

export const ChevronIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M6.5 9.5L12 15l5.5-5.5" />
  </svg>
);

export const CompareIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="3.5" y="5" width="7" height="14" rx="1.5" />
    <rect x="13.5" y="5" width="7" height="14" rx="1.5" />
  </svg>
);

export const GitHubIcon = (props) => (
  <svg {...base} {...props} fill="currentColor" stroke="none">
    <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0C17.3 4.8 18.3 5.1 18.3 5.1c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
  </svg>
);
