import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { SIZES, formatPrice, getSneaker } from "../../data/sneakers";
import useDialog from "../../hooks/useDialog";
import { CloseIcon } from "../Icons/Icons";
import "./Compare.css";

const ROWS = [
  { label: "Brand", value: (s) => s.brand },
  { label: "Price", value: (s) => formatPrice(s.price) },
  { label: "Released", value: (s) => s.year ?? "Not listed" },
  { label: "Colourway", value: (s) => s.colorway },
  { label: "Sizes in stock", value: (s) => `${SIZES.length - s.soldOut.length} of ${SIZES.length}` }
];

function CompareModal() {
  const { compare, compareOpen, setCompareOpen } = useStore();
  const close = useCallback(() => setCompareOpen(false), [setCompareOpen]);
  const open = compareOpen && compare.length === 2;
  const panelRef = useDialog(open, close);
  const items = compare.map(getSneaker).filter(Boolean);
  const cheaper =
    items.length === 2 && items[0].price !== items[1].price ? Math.min(items[0].price, items[1].price) : null;

  return (
    <AnimatePresence>
      {open && (
        <div className="modal" key="compare">
          <motion.div
            className="modal__overlay"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={panelRef}
            className="modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="modal__header">
              <h2 id="compare-title" className="modal__title">
                Compare
              </h2>
              <button type="button" className="icon-button" onClick={close} aria-label="Close compare">
                <CloseIcon />
              </button>
            </header>
            <div className="compare-table">
              <div className="compare-table__row compare-table__heads">
                <span />
                {items.map((s) => (
                  <Link key={s.id} to={`/sneaker/${s.id}`} className="compare-table__head" onClick={close}>
                    <img src={s.imageSmall} width="640" height="480" alt="" />
                    <span>{s.name}</span>
                  </Link>
                ))}
              </div>
              {ROWS.map((row) => (
                <div key={row.label} className="compare-table__row">
                  <span className="muted">{row.label}</span>
                  {items.map((s) => (
                    <span
                      key={s.id}
                      className={row.label === "Price" && s.price === cheaper ? "compare-table__best" : undefined}
                    >
                      {row.value(s)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CompareModal;
