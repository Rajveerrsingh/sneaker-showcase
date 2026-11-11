import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import sneakers, { SIZES, formatPrice } from "../data/sneakers";
import SneakerImage from "../components/SneakerImage";
import SneakerCard from "../components/SneakerCard";
import Magnetic from "../components/Magnetic";
import Reveal from "../components/Reveal";
import { ArrowIcon, HeartIcon, CompareIcon } from "../components/Icons";
import { useStore } from "../store";
import NotFound from "./NotFound";

const ease = [0.22, 1, 0.36, 1];

function Lens({ src, alt, children, enabled }) {
  const ref = useRef(null);
  const [lens, setLens] = useState(null);
  const size = 180;
  const zoom = 2.4;

  const onMove = (e) => {
    if (!enabled || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setLens({ x, y, w: r.width, h: r.height });
  };

  return (
    <div ref={ref} className={`lens-area ${enabled ? "has-lens" : ""}`} onPointerMove={onMove} onPointerLeave={() => setLens(null)}>
      {children}
      {lens && (
        <span
          className="lens"
          aria-hidden="true"
          style={{
            width: size,
            height: size,
            left: lens.x - size / 2,
            top: lens.y - size / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${lens.w * zoom}px ${lens.h * zoom}px`,
            backgroundPosition: `${-(lens.x * zoom - size / 2)}px ${-(lens.y * zoom - size / 2)}px`
          }}
        />
      )}
    </div>
  );
}

function Detail() {
  const { id } = useParams();
  const sneaker = sneakers.find((s) => s.id === Number(id));
  const { addToCart, toggleFavorite, isFavorite, openDrawer, toggleCompare, isComparing } = useStore();
  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);
  const [view, setView] = useState("studio");
  const reduce = useReducedMotion();

  useEffect(() => {
    setSize(null);
    setError(false);
    setView("studio");
    if (sneaker) document.title = `${sneaker.name} | Sole Archive`;
    return () => {
      document.title = "Sole Archive | Sneaker Showcase";
    };
  }, [sneaker]);

  if (!sneaker) return <NotFound title="Sneaker not found" />;

  const idx = sneakers.indexOf(sneaker);
  const prev = sneakers[(idx - 1 + sneakers.length) % sneakers.length];
  const next = sneakers[(idx + 1) % sneakers.length];
  const related = [
    ...sneakers.filter((s) => s.brand === sneaker.brand && s.id !== sneaker.id),
    ...sneakers.filter((s) => s.brand !== sneaker.brand)
  ].slice(0, 4);
  const saved = isFavorite(sneaker.id);
  const comparing = isComparing(sneaker.id);
  const src = view === "studio" ? sneaker.image : sneaker.photo;

  const onAdd = () => {
    if (!size) {
      setError(true);
      document.getElementById("size-group")?.focus();
      return;
    }
    addToCart(sneaker, size);
  };

  return (
    <div className="detail" style={{ "--glow": sneaker.glow }}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/" state={{ scrollTo: "shop" }}>{sneaker.brand}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{sneaker.name}</span>
      </nav>

      <div className="detail-grid">
        <div className="detail-left">
          <div className={`detail-media view-${view}`}>
            <span className="detail-glow" aria-hidden="true" />
            <span className="detail-word" aria-hidden="true">{sneaker.short}</span>
            <Lens src={src} alt="" enabled={!reduce && view === "studio"}>
              {view === "studio" ? (
                <motion.div layoutId={`shoe-${sneaker.id}`} className="detail-shoe" transition={{ duration: 0.7, ease }}>
                  <SneakerImage src={sneaker.image} alt={`${sneaker.name} in ${sneaker.colorway}, studio cut-out`} className="detail-img" eager />
                </motion.div>
              ) : (
                <motion.div className="detail-photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  <SneakerImage src={sneaker.photo} alt={`Original photo of the ${sneaker.name}`} className="detail-photo-img" eager />
                </motion.div>
              )}
            </Lens>
            {sneaker.since && <span className="card-since">Since {sneaker.since}</span>}
            {view === "studio" && <span className="lens-hint" aria-hidden="true">Hover to zoom</span>}
          </div>
          <div className="view-toggle" role="group" aria-label="Image view">
            <button className={view === "studio" ? "active" : ""} aria-pressed={view === "studio"} onClick={() => setView("studio")}>
              <img src={sneaker.image} alt="" /> Studio
            </button>
            <button className={view === "photo" ? "active" : ""} aria-pressed={view === "photo"} onClick={() => setView("photo")}>
              <img src={sneaker.photo} alt="" /> Original photo
            </button>
          </div>
        </div>

        <motion.div className="detail-info" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>
          <p className="eyebrow">{sneaker.brand}</p>
          <h1 className="detail-title">{sneaker.name}</h1>
          <p className="detail-tagline">{sneaker.tagline}</p>
          <p className="detail-price">{formatPrice(sneaker.price)}</p>

          <div className="colorway">
            <span className="swatches lg" aria-hidden="true">
              {sneaker.swatches.map((c) => <i key={c} style={{ background: c }} />)}
            </span>
            <span><span className="muted">Colourway:</span> {sneaker.colorway}</span>
          </div>

          <fieldset className={`sizes ${error ? "has-error" : ""}`}>
            <legend>
              Select size <span className="muted">(US men's)</span>
            </legend>
            <div id="size-group" className="size-grid" role="radiogroup" aria-label="Shoe size" tabIndex={-1}>
              {SIZES.map((s) => {
                const out = sneaker.soldOut.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={size === s}
                    disabled={out}
                    className={`size ${size === s ? "active" : ""}`}
                    onClick={() => {
                      setSize(s);
                      setError(false);
                    }}
                    aria-label={out ? `US ${s}, sold out` : `US ${s}`}
                  >
                    {size === s && <motion.span layoutId="size-pill" className="size-pill" transition={{ type: "spring", stiffness: 500, damping: 34 }} />}
                    <span className="size-label">{s}</span>
                  </button>
                );
              })}
            </div>
            {error && <p className="field-error" role="alert">Please pick a size first.</p>}
          </fieldset>

          <div className="detail-actions">
            <Magnetic strength={0.15} className="grow">
              <button type="button" className="btn btn-primary btn-lg btn-block" onClick={onAdd}>
                Add to bag {size && <span className="muted-inv">· US {size}</span>}
              </button>
            </Magnetic>
            <button
              type="button"
              className={`btn btn-ghost btn-lg fav-toggle ${saved ? "is-on" : ""}`}
              aria-pressed={saved}
              onClick={() => toggleFavorite(sneaker)}
            >
              <HeartIcon filled={saved} /> {saved ? "Saved" : "Save"}
            </button>
          </div>
          <div className="detail-links">
            <button type="button" className="text-btn" onClick={() => openDrawer("bag")}>View bag</button>
            <button type="button" className="text-btn with-icon" aria-pressed={comparing} onClick={() => toggleCompare(sneaker)}>
              <CompareIcon width={15} height={15} /> {comparing ? "Added to compare" : "Add to compare"}
            </button>
          </div>

          <div className="accordion">
            <details open>
              <summary>About this pair</summary>
              <p>{sneaker.description}</p>
            </details>
            <details>
              <summary>Shipping and returns</summary>
              <p>This is a portfolio demo store, so nothing ships. Your bag and saved pairs are stored in your browser only.</p>
            </details>
            <details>
              <summary>Photo credit</summary>
              <p>
                Photo by {sneaker.credit.author}, {sneaker.credit.license}, via{" "}
                <a href={sneaker.credit.url} target="_blank" rel="noreferrer">{sneaker.credit.source}</a>. The studio
                view is the same photo with the background removed and resized.
              </p>
            </details>
          </div>

          <div className="pager">
            <Link to={`/sneaker/${prev.id}`} className="pager-link">
              <span className="muted">Previous</span> {prev.name}
            </Link>
            <Link to={`/sneaker/${next.id}`} className="pager-link right">
              <span className="muted">Next</span> {next.name}
            </Link>
          </div>
        </motion.div>
      </div>

      <section className="related" aria-labelledby="related-title">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">Keep browsing</p>
            <h2 id="related-title" className="section-title">You might also like</h2>
          </div>
          <Link to="/" state={{ scrollTo: "shop" }} className="text-btn with-icon">All sneakers <ArrowIcon width={15} height={15} /></Link>
        </Reveal>
        <div className="grid">
          {related.map((s, i) => (
            <SneakerCard key={s.id} sneaker={s} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Detail;
