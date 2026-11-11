import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import sneakers, { featuredIds, formatPrice } from "../data/sneakers";
import Magnetic from "./Magnetic";
import Counter from "./Counter";
import { ArrowIcon } from "./Icons";

const featured = featuredIds.map((id) => sneakers.find((s) => s.id === id));
const brandCount = new Set(sneakers.map((s) => s.brand)).size;
const ease = [0.22, 1, 0.36, 1];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const stage = useRef(null);
  const s = featured[i];

  // pointer driven 3D tilt and parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 18, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const rotY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotX = useTransform(sy, [-0.5, 0.5], [12, -12]);
  const shoeX = useTransform(sx, [-0.5, 0.5], [-28, 28]);
  const shoeY = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const textX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const glowX = useTransform(sx, [-0.5, 0.5], [-40, 40]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setI((n) => (n + 1) % featured.length), 6000);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = stage.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      style={{ "--glow": s.glow }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-copy">
        <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <span className="dot" aria-hidden="true" /> Fall / Winter 2026 edit
        </motion.p>
        <h1 id="hero-title" className="hero-title">
          {["Walk", "louder"].map((w, k) => (
            <span className="hl" key={w}>
              <motion.span initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1 + k * 0.1, ease }}>
                {w}
                {k === 1 && <em>.</em>}
              </motion.span>
              {k === 0 && " "}
            </span>
          ))}
        </h1>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }}>
          A curated archive of the sneakers that shaped the street, from 1968 suede to modern tech runners.
          Move your cursor over the shoe, then dive into the collection.
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4, ease }}>
          <Magnetic>
            <a
              href="#shop"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("shop")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
              }}
            >
              Shop the drop <ArrowIcon width={18} height={18} />
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <Link to={`/sneaker/${s.id}`} className="btn btn-ghost">
              View {s.name}
            </Link>
          </Magnetic>
        </motion.div>
        <motion.dl className="hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}>
          <div><dt>Pairs</dt><dd><Counter to={sneakers.length} /></dd></div>
          <div><dt>Brands</dt><dd><Counter to={brandCount} /></dd></div>
          <div><dt>Years of design</dt><dd><Counter to={2026 - 1968} suffix="+" /></dd></div>
        </motion.dl>
      </div>

      <div className="hero-stage" ref={stage} onPointerMove={onMove} onPointerLeave={onLeave}>
        <motion.div className="hero-card" style={{ rotateX: rotX, rotateY: rotY }}>
          <motion.div className="hero-glow" style={{ x: glowX, y: glowY }} aria-hidden="true" />
          <motion.span className="hero-word" style={{ x: textX }} aria-hidden="true">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={s.short} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6, ease }}>
                {s.short}
              </motion.span>
            </AnimatePresence>
          </motion.span>
          <div className="hero-ring" aria-hidden="true" />
          <Link to={`/sneaker/${s.id}`} className="hero-shoe-link" aria-label={`Featured: ${s.name}, ${formatPrice(s.price)}`}>
            <motion.div className="hero-shoe-wrap" style={{ x: shoeX, y: shoeY }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={s.id}
                src={s.image}
                alt={`${s.name} in ${s.colorway}`}
                className="hero-shoe"
                initial={{ opacity: 0, x: 120, rotate: 8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, rotate: -12, scale: 1 }}
                exit={{ opacity: 0, x: -120, rotate: -24, scale: 0.9 }}
                transition={{ duration: 0.8, ease }}
                draggable="false"
              />
            </AnimatePresence>
            </motion.div>
          </Link>
          <div className="hero-shadow" aria-hidden="true" />
        </motion.div>

        <div className="hero-tag">
          <span className="eyebrow">Featured · {s.brand}</span>
          <strong>{s.name}</strong>
          <span className="hero-tag-price">{formatPrice(s.price)}</span>
        </div>

        <div className="hero-picker" role="tablist" aria-label="Featured sneakers">
          {featured.map((f, k) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={k === i}
              aria-label={f.name}
              className={`picker ${k === i ? "active" : ""}`}
              onClick={() => setI(k)}
              style={{ "--glow": f.glow }}
            >
              <img src={f.image} alt="" />
              {k === i && !paused && !reduce && <span className="picker-bar" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
