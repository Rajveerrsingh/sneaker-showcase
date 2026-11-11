import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "../../context/StoreContext";
import { formatPrice } from "../../data/sneakers";
import ProductImage from "../ProductImage/ProductImage";
import { HeartIcon } from "../Icons/Icons";
import "./ProductCard.css";

function ProductCard({ sneaker, wide = false, priority = false }) {
  const { isFavorite, toggleFavorite } = useStore();
  const saved = isFavorite(sneaker.id);

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`product-card ${wide ? "product-card--wide" : ""}`}
    >
      <div className="product-card__media">
        <ProductImage
          sneaker={sneaker}
          priority={priority}
          sizes={wide ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 50vw"}
        />
        <span className="product-card__brand">{sneaker.brand}</span>
        {wide && <p className="product-card__tagline">{sneaker.tagline}</p>}
      </div>
      <button
        type="button"
        className={`product-card__save icon-button ${saved ? "is-active" : ""}`}
        onClick={() => toggleFavorite(sneaker)}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${sneaker.name} from saved` : `Save ${sneaker.name}`}
      >
        <HeartIcon filled={saved} width={18} height={18} />
      </button>
      <div className="product-card__body">
        <div>
          <h3 className="product-card__name">
            <Link to={`/sneaker/${sneaker.id}`} className="product-card__link">
              {sneaker.name}
            </Link>
          </h3>
          <p className="product-card__meta">{sneaker.colorway}</p>
        </div>
        <p className="product-card__price tabular">{formatPrice(sneaker.price)}</p>
      </div>
    </motion.article>
  );
}

export default ProductCard;
