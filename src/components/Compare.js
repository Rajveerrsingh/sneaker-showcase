import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import sneakers, { SIZES, formatPrice } from "../data/sneakers";
import { useStore } from "../store";
import { CloseIcon, CompareIcon } from "./Icons";

const byId = (id) => sneakers.find((s) => s.id === id);

export function CompareBar() {
  const { compare, toggleCompare, clearCompare, setCompareOpen, compareOpen } = useStore();
  const items = compare.map(byId).filter(Boolean);
  return (
    <AnimatePresence>
      {items.length > 0 && !compareOpen && (
        <motion.div
          className="compare-bar"
          role="region"
          aria-label="Compare tray"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="compare-slots">
            {[0, 1].map((k) => {
              const s = items[k];
              return s ? (
                <button key={s.id} className="slot" onClick={() => toggleCompare(s)} aria-label={`Remove ${s.name} from compare`} style={{ "--glow": s.glow }}>
                  <img src={s.image} alt="" />
                  <span>{s.name}</span>
                  <CloseIcon width={14} height={14} />
                </button>
              ) : (
                <span key={k} className="slot empty-slot">Pick one more</span>
              );
            })}
          </div>
          <div className="compare-actions">
            <button className="text-btn" onClick={clearCompare}>Clear</button>
            <button className="btn btn-primary" disabled={items.length < 2} onClick={() => setCompareOpen(true)}>
              <CompareIcon width={18} height={18} /> Compare
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const rows = [
  ["Brand", (s) => s.brand],
  ["Price", (s) => formatPrice(s.price)],
  ["Colourway", (s) => s.colorway],
  ["First released", (s) => s.since || "n/a"],
  ["Sizes in stock", (s) => `${SIZES.length - s.soldOut.length} of ${SIZES.length}`]
];

export function CompareModal() {
  const { compare, compareOpen, setCompareOpen } = useStore();
  const items = compare.map(byId).filter(Boolean);
  const closeRef = useRef(null);
  const open = compareOpen && items.length === 2;

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    closeRef.current?.focus();
    document.body.classList.add("no-scroll");
    const onKey = (e) => e.key === "Escape" && setCompareOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
      prev?.focus?.();
    };
  }, [open, setCompareOpen]);

  const cheaper = open ? (items[0].price === items[1].price ? null : items[0].price < items[1].price ? 0 : 1) : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="modal-backdrop" onClick={() => setCompareOpen(false)} />
          <motion.div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="compare-title"
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="modal-head">
              <h2 id="compare-title" className="modal-title">Head to head</h2>
              <button ref={closeRef} className="icon-btn" onClick={() => setCompareOpen(false)} aria-label="Close compare">
                <CloseIcon />
              </button>
            </div>
            <div className="versus">
              {items.map((s, k) => (
                <React.Fragment key={s.id}>
                  {k === 1 && <span className="vs" aria-hidden="true">VS</span>}
                  <div className="vs-col" style={{ "--glow": s.glow }}>
                    <div className="vs-media">
                      <span className="card-glow" aria-hidden="true" />
                      <motion.img
                        src={s.image}
                        alt={`${s.name} in ${s.colorway}`}
                        initial={{ x: k === 0 ? -60 : 60, rotate: k === 0 ? -20 : 20, opacity: 0 }}
                        animate={{ x: 0, rotate: k === 0 ? -8 : 8, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 140, damping: 16, delay: 0.1 }}
                        style={k === 1 ? { scaleX: -1 } : undefined}
                      />
                    </div>
                    <p className="eyebrow">{s.brand}</p>
                    <h3>{s.name}</h3>
                    {cheaper === k && <span className="pill">Better price</span>}
                    <Link to={`/sneaker/${s.id}`} className="text-btn" onClick={() => setCompareOpen(false)}>View pair</Link>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <table className="vs-table">
              <caption className="sr-only">Comparison of {items[0].name} and {items[1].name}</caption>
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Spec</span></th>
                  <th scope="col">{items[0].name}</th>
                  <th scope="col">{items[1].name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, fn]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{fn(items[0])}</td>
                    <td>{fn(items[1])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
