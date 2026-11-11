import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import sneakers, { SIZES, formatPrice, getSneaker } from "../../data/sneakers";
import { useStore } from "../../context/StoreContext";
import ProductImage from "../../components/ProductImage/ProductImage";
import Segmented from "../../components/Segmented/Segmented";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { ArrowIcon, CompareIcon, HeartIcon } from "../../components/Icons/Icons";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import "./ProductPage.css";

const VIEWS = [
  { value: "studio", label: "Cut-out" },
  { value: "photo", label: "Original photo" }
];

function ProductPage() {
  const { id } = useParams();
  const sneaker = getSneaker(id);
  const { addToCart, toggleFavorite, isFavorite, toggleCompare, isComparing } = useStore();
  const [size, setSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [view, setView] = useState("studio");

  useEffect(() => {
    setSize(null);
    setSizeError(false);
    setView("studio");
  }, [id]);

  useEffect(() => {
    document.title = sneaker ? `${sneaker.name} · Sole Archive` : "Not found · Sole Archive";
    return () => {
      document.title = "Sole Archive · A sneaker showcase built with React";
    };
  }, [sneaker]);

  if (!sneaker) return <NotFoundPage message="That pair isn't in the archive." />;

  const index = sneakers.indexOf(sneaker);
  const prev = sneakers[(index - 1 + sneakers.length) % sneakers.length];
  const next = sneakers[(index + 1) % sneakers.length];
  const related = sneakers.filter((s) => s.id !== sneaker.id && s.brand === sneaker.brand);
  const more = [...related, ...sneakers.filter((s) => s.id !== sneaker.id && s.brand !== sneaker.brand)].slice(0, 4);
  const saved = isFavorite(sneaker.id);
  const comparing = isComparing(sneaker.id);

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart(sneaker, size);
  };

  return (
    <>
      <div className="container product">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/" state={{ scrollTo: "archive" }}>
            Archive
          </Link>
          <span aria-hidden="true">/</span>
          <span>{sneaker.brand}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{sneaker.name}</span>
        </nav>

        <div className="grid-12 product__layout">
          <div className="product__gallery">
            <div className={`product__stage product__stage--${view}`}>
              <AnimatePresence mode="wait" initial={false}>
                {view === "studio" ? (
                  <motion.div
                    key="studio"
                    className="product__view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductImage sneaker={sneaker} priority sizes="(min-width: 1024px) 58vw, 100vw" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="photo"
                    className="product__view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <img
                      className="product__photo"
                      src={sneaker.photo}
                      alt={`Original photograph of the ${sneaker.name} by ${sneaker.credit.author}`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="product__gallery-bar">
              <Segmented id="view" label="Image view" size="sm" options={VIEWS} value={view} onChange={setView} />
              <p className="muted product__credit-line">
                Photo: {sneaker.credit.author}, {sneaker.credit.license}
              </p>
            </div>
          </div>

          <div className="product__info">
            <p className="eyebrow">
              {sneaker.brand}
              {sneaker.year && ` · Since ${sneaker.year}`}
            </p>
            <h1 className="product__title">{sneaker.name}</h1>
            <p className="product__colorway muted">{sneaker.colorway}</p>
            <p className="product__price tabular">{formatPrice(sneaker.price)}</p>
            <p className="product__description">{sneaker.description}</p>

            <div className="swatches" aria-label="Colourway">
              {sneaker.swatches.map((c) => (
                <span key={c} className="swatches__dot" style={{ background: c }} />
              ))}
            </div>

            <fieldset className="sizes">
              <legend className="sizes__legend">
                <span>Select size</span>
                <span className="muted">US men's</span>
              </legend>
              <div className="sizes__grid">
                {SIZES.map((s) => {
                  const soldOut = sneaker.soldOut.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      className={`sizes__option ${size === s ? "is-active" : ""}`}
                      disabled={soldOut}
                      aria-pressed={size === s}
                      aria-label={soldOut ? `US ${s}, sold out` : `US ${s}`}
                      onClick={() => {
                        setSize(s);
                        setSizeError(false);
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              <p className={`sizes__error ${sizeError ? "is-visible" : ""}`} role="alert">
                {sizeError ? "Choose a size to add this pair to your bag." : ""}
              </p>
            </fieldset>

            <div className="product__actions">
              <button type="button" className="button button--primary button--block" onClick={handleAdd}>
                Add to bag
              </button>
              <button
                type="button"
                className={`button button--secondary product__save ${saved ? "is-active" : ""}`}
                onClick={() => toggleFavorite(sneaker)}
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved" : "Save for later"}
              >
                <HeartIcon filled={saved} width={18} height={18} />
              </button>
            </div>
            <button
              type="button"
              className={`text-link product__compare ${comparing ? "is-active" : ""}`}
              onClick={() => toggleCompare(sneaker)}
              aria-pressed={comparing}
            >
              <CompareIcon width={16} height={16} />
              {comparing ? "Added to compare" : "Add to compare"}
            </button>

            <dl className="specs">
              <div>
                <dt>Colourway</dt>
                <dd>{sneaker.colorway}</dd>
              </div>
              <div>
                <dt>First released</dt>
                <dd>{sneaker.year ?? "Not listed"}</dd>
              </div>
              <div>
                <dt>Photo</dt>
                <dd>
                  <a href={sneaker.credit.url} target="_blank" rel="noreferrer" className="text-link">
                    {sneaker.credit.author} on {sneaker.credit.source}
                  </a>
                  <span className="muted"> · {sneaker.credit.license}, background removed for this site</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <nav className="pager" aria-label="More pairs">
          <Link to={`/sneaker/${prev.id}`} className="pager__link">
            <span className="muted">Previous</span>
            <span>{prev.name}</span>
          </Link>
          <Link to={`/sneaker/${next.id}`} className="pager__link pager__link--next">
            <span className="muted">Next</span>
            <span>
              {next.name} <ArrowIcon width={16} height={16} />
            </span>
          </Link>
        </nav>
      </div>

      <section className="section container related" aria-labelledby="related-title">
        <h2 id="related-title" className="related__title">
          More from the archive
        </h2>
        <ProductGrid items={more} />
      </section>
    </>
  );
}

export default ProductPage;
