import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, animate, useReducedMotion } from "framer-motion";
import { formatPrice } from "../data/sneakers";
import { ArrowIcon } from "./Icons";

// draggable horizontal rail of featured pairs
function Carousel({ items, title = "Featured drops" }) {
  const viewport = useRef(null);
  const track = useRef(null);
  const [limit, setLimit] = useState(0);
  const x = useMotionValue(0);
  const dragged = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setLimit(Math.max(0, track.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport.current);
    return () => ro.disconnect();
  }, [items.length]);

  const step = (dir) => {
    const w = track.current?.firstChild?.getBoundingClientRect().width || 300;
    const next = Math.min(0, Math.max(-limit, x.get() - dir * (w + 18)));
    animate(x, next, reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 32 });
  };

  return (
    <section className="rail" aria-labelledby="rail-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">Drag to explore</p>
          <h2 id="rail-title" className="section-title">{title}</h2>
        </div>
        <div className="rail-nav">
          <button className="icon-btn" onClick={() => step(-1)} aria-label="Scroll left"><ArrowIcon style={{ transform: "rotate(180deg)" }} /></button>
          <button className="icon-btn" onClick={() => step(1)} aria-label="Scroll right"><ArrowIcon /></button>
        </div>
      </div>
      <div className="rail-viewport" ref={viewport}>
        <motion.ul
          className="rail-track"
          ref={track}
          style={{ x }}
          drag={limit > 0 ? "x" : false}
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={() => setTimeout(() => (dragged.current = false), 0)}
        >
          {items.map((s, k) => (
            <li key={s.id} className="rail-item" style={{ "--glow": s.glow }}>
              <Link
                to={`/sneaker/${s.id}`}
                className="rail-card"
                draggable="false"
                onClick={(e) => dragged.current && e.preventDefault()}
                onFocus={(e) => {
                  // keep keyboard focus visible inside the rail
                  const li = e.currentTarget.parentElement;
                  const left = li.offsetLeft;
                  const vw = viewport.current.clientWidth;
                  const target = Math.min(0, Math.max(-limit, -(left - (vw - li.offsetWidth) / 2)));
                  x.set(target);
                }}
              >
                <span className="rail-num">{String(k + 1).padStart(2, "0")}</span>
                <div className="rail-media">
                  <span className="rail-glow" aria-hidden="true" />
                  <img src={s.image} alt={`${s.name} in ${s.colorway}`} loading="lazy" draggable="false" />
                </div>
                <div className="rail-info">
                  <span className="eyebrow">{s.brand}</span>
                  <strong>{s.name}</strong>
                  <span className="muted">{s.tagline}</span>
                  <span className="rail-price">{formatPrice(s.price)}</span>
                </div>
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

export default Carousel;
