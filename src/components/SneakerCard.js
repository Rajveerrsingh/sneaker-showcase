import React from "react";
import { Link } from "react-router-dom";
import SneakerImage from "./SneakerImage";
import { HeartIcon } from "./Icons";
import { useStore } from "../store";
import { formatPrice } from "../data/sneakers";

function SneakerCard({ sneaker, index = 0 }) {
  const { isFavorite, toggleFavorite } = useStore();
  const saved = isFavorite(sneaker.id);

  return (
    <article className="card reveal" style={{ "--delay": `${(index % 4) * 70}ms` }}>
      <Link to={`/sneaker/${sneaker.id}`} className="card-link">
        <div className="card-media">
          <SneakerImage src={sneaker.image} alt={`${sneaker.name} in ${sneaker.colorway}`} className="card-img" />
          <span className="card-since">Since {sneaker.since}</span>
        </div>
        <div className="card-body">
          <p className="eyebrow">{sneaker.brand}</p>
          <div className="card-row">
            <h3 className="card-title">{sneaker.name}</h3>
            <span className="card-price">{formatPrice(sneaker.price)}</span>
          </div>
          <div className="card-row muted">
            <span className="card-colorway">{sneaker.colorway}</span>
            <span className="swatches" aria-hidden="true">
              {sneaker.swatches.map((c) => (
                <i key={c} style={{ background: c }} />
              ))}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        className={`icon-btn fav-btn ${saved ? "is-on" : ""}`}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${sneaker.name} from saved` : `Save ${sneaker.name}`}
        onClick={() => toggleFavorite(sneaker)}
      >
        <HeartIcon filled={saved} />
      </button>
    </article>
  );
}

export default SneakerCard;
