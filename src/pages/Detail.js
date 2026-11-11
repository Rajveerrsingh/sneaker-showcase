import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import sneakers, { SIZES, formatPrice } from "../data/sneakers";
import SneakerImage from "../components/SneakerImage";
import SneakerCard from "../components/SneakerCard";
import { ArrowIcon, HeartIcon } from "../components/Icons";
import { useStore } from "../store";
import useReveal from "../hooks/useReveal";
import NotFound from "./NotFound";

function Detail() {
  const { id } = useParams();
  const sneaker = sneakers.find((s) => s.id === Number(id));
  const { addToCart, toggleFavorite, isFavorite, openDrawer } = useStore();
  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });

  useEffect(() => {
    setSize(null);
    setError(false);
    if (sneaker) document.title = `${sneaker.name} | Sole Archive`;
    return () => {
      document.title = "Sole Archive | Sneaker Showcase";
    };
  }, [sneaker]);

  useReveal([id]);

  if (!sneaker) return <NotFound title="Sneaker not found" />;

  const idx = sneakers.indexOf(sneaker);
  const prev = sneakers[(idx - 1 + sneakers.length) % sneakers.length];
  const next = sneakers[(idx + 1) % sneakers.length];
  const related = [
    ...sneakers.filter((s) => s.brand === sneaker.brand && s.id !== sneaker.id),
    ...sneakers.filter((s) => s.brand !== sneaker.brand)
  ].slice(0, 4);
  const saved = isFavorite(sneaker.id);

  const onAdd = () => {
    if (!size) {
      setError(true);
      document.getElementById("size-group")?.focus();
      return;
    }
    addToCart(sneaker, size);
  };

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="detail">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/" state={{ scrollTo: "shop" }}>{sneaker.brand}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{sneaker.name}</span>
      </nav>

      <div className="detail-grid">
        <div
          className={`detail-media ${zoom.on ? "is-zoomed" : ""}`}
          onMouseMove={onMove}
          onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
          style={{ "--zx": `${zoom.x}%`, "--zy": `${zoom.y}%` }}
        >
          <SneakerImage src={sneaker.image} alt={`${sneaker.name} in ${sneaker.colorway}`} className="detail-img" eager />
          <span className="card-since">Since {sneaker.since}</span>
        </div>

        <div className="detail-info">
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
                    {s}
                  </button>
                );
              })}
            </div>
            {error && <p className="field-error" role="alert">Please pick a size first.</p>}
          </fieldset>

          <div className="detail-actions">
            <button type="button" className="btn btn-primary btn-lg" onClick={onAdd}>
              Add to bag {size && <span className="muted-inv">· US {size}</span>}
            </button>
            <button
              type="button"
              className={`btn btn-ghost btn-lg fav-toggle ${saved ? "is-on" : ""}`}
              aria-pressed={saved}
              onClick={() => toggleFavorite(sneaker)}
            >
              <HeartIcon filled={saved} /> {saved ? "Saved" : "Save"}
            </button>
          </div>
          <button type="button" className="text-btn" onClick={() => openDrawer("bag")}>View bag</button>

          <div className="accordion">
            <details open>
              <summary>About this pair</summary>
              <p>{sneaker.description}</p>
            </details>
            <details>
              <summary>Shipping and returns</summary>
              <p>This is a portfolio demo store, so nothing ships. Your bag and saved pairs are stored in your browser only.</p>
            </details>
            {sneaker.credit && (
              <details>
                <summary>Photo credit</summary>
                <p>
                  Photo by {sneaker.credit.author}, {sneaker.credit.license}
                  {sneaker.credit.file ? (
                    <>
                      {", via "}
                      <a href={`https://commons.wikimedia.org/wiki/File:${sneaker.credit.file}`} target="_blank" rel="noreferrer">
                        Wikimedia Commons
                      </a>
                    </>
                  ) : (
                    ", via Wikimedia Commons"
                  )}
                  .
                </p>
              </details>
            )}
          </div>

          <div className="pager">
            <Link to={`/sneaker/${prev.id}`} className="pager-link">
              <span className="muted">Previous</span> {prev.name}
            </Link>
            <Link to={`/sneaker/${next.id}`} className="pager-link right">
              <span className="muted">Next</span> {next.name} <ArrowIcon width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>

      <section className="related" aria-labelledby="related-title">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Keep browsing</p>
            <h2 id="related-title" className="section-title">You might also like</h2>
          </div>
        </div>
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
