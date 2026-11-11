import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import sneakers, { formatPrice } from "../../data/sneakers";
import ProductImage from "../ProductImage/ProductImage";
import { ArrowIcon } from "../Icons/Icons";
import "./Hero.css";

const INTERVAL_MS = 5000;
const pad = (n) => String(n).padStart(2, "0");

function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const current = sneakers[index];
  const autoplay = !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return undefined;
    const id = setTimeout(() => setIndex((i) => (i + 1) % sneakers.length), INTERVAL_MS);
    return () => clearTimeout(id);
  }, [index, autoplay]);

  return (
    <section className="hero container grid-12" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">Sole Archive · {pad(sneakers.length)} pairs</p>
        <h1 id="hero-title" className="hero__title">
          Classic sneakers, seen in profile.
        </h1>
        <p className="lede">
          A curated archive of icons from Nike, Adidas, Puma and Asics. Every pair is shown from the same side, at the
          same scale, on the same ground, so the silhouettes do the talking.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#archive" onClick={scrollToArchive}>
            Browse the archive
            <ArrowIcon width={18} height={18} />
          </a>
          <Link className="text-link" to="/" state={{ scrollTo: "timeline" }}>
            See the timeline
          </Link>
        </div>
      </div>

      <div
        className="hero__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Link to={`/sneaker/${current.id}`} className="hero__media" aria-label={`View ${current.name}`}>
          <AnimatePresence initial={false}>
            <motion.div
              key={current.id}
              className="hero__slide"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductImage sneaker={current} priority={index === 0} sizes="(min-width: 1024px) 58vw, 100vw" />
            </motion.div>
          </AnimatePresence>
        </Link>

        <div className="hero__caption">
          <div className="hero__meta" aria-live="polite">
            <span className="hero__index tabular">
              {pad(index + 1)} / {pad(sneakers.length)}
            </span>
            <span className="hero__name">{current.name}</span>
            <span className="hero__price tabular muted">{formatPrice(current.price)}</span>
          </div>
          <div className="hero__dots" role="group" aria-label="Choose a featured pair">
            {sneakers.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={`hero__dot ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.name}`}
                aria-pressed={i === index}
              >
                {i === index && autoplay && (
                  <span className="hero__progress" style={{ animationDuration: `${INTERVAL_MS}ms` }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function scrollToArchive(event) {
  event.preventDefault();
  document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
}

export default Hero;
