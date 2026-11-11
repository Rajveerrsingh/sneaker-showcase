import React from "react";
import { motion } from "framer-motion";
import "./Segmented.css";

// Pill-style toggle group; the active background slides between options.
function Segmented({ options, value, onChange, label, id, size = "md" }) {
  return (
    <div className={`segmented segmented--${size}`} role="group" aria-label={label}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={`segmented__option ${active ? "is-active" : ""}`}
            onClick={() => onChange(option.value)}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId={`${id}-indicator`}
                className="segmented__indicator"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className="segmented__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default Segmented;
