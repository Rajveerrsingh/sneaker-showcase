import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { getSneaker } from "../../data/sneakers";
import { CloseIcon } from "../Icons/Icons";
import "./Compare.css";

function CompareBar() {
  const { compare, toggleCompare, clearCompare, setCompareOpen } = useStore();
  const items = compare.map(getSneaker).filter(Boolean);

  return (
    <div className="compare-dock">
      <AnimatePresence>
        {items.length > 0 && (
          <motion.div
            className="compare-bar"
            role="region"
            aria-label="Compare"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="compare-bar__items">
              {items.map((s) => (
                <li key={s.id} className="compare-bar__item">
                  <img src={s.imageSmall} width="640" height="480" alt="" />
                  <span>{s.name}</span>
                  <button type="button" onClick={() => toggleCompare(s)} aria-label={`Remove ${s.name} from compare`}>
                    <CloseIcon width={14} height={14} />
                  </button>
                </li>
              ))}
              {items.length < 2 && <li className="compare-bar__hint muted">Add one more pair</li>}
            </ul>
            <div className="compare-bar__actions">
              <button type="button" className="text-link" onClick={clearCompare}>
                Clear
              </button>
              <button
                type="button"
                className="button button--primary compare-bar__go"
                disabled={items.length < 2}
                onClick={() => setCompareOpen(true)}
              >
                Compare
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CompareBar;
