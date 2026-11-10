import React from "react";
import { useParams, Link } from "react-router-dom";
import SneakerImage from "./SneakerImage";
import "../App.css";

function SneakerDetail({ sneakers }) {
  const { id } = useParams();
  const sneaker = sneakers.find((s) => s.id === parseInt(id));

  if (!sneaker) {
    return (
      <div className="not-found">
        <h2>Sneaker not found</h2>
        <Link to="/" className="btn">Back to all sneakers</Link>
      </div>
    );
  }

  const others = sneakers.filter((s) => s.id !== sneaker.id).slice(0, 3);

  return (
    <div className="detail">
      <Link to="/" className="back-link">← Back to all sneakers</Link>

      <div className="detail-layout">
        <div className="detail-image-wrap">
          <SneakerImage src={sneaker.image} alt={sneaker.name} className="detail-image" />
        </div>

        <div className="detail-info">
          <span className="brand-tag static">{sneaker.brand}</span>
          <h2 className="detail-name">{sneaker.name}</h2>
          <p className="detail-price">{sneaker.price}</p>
          <p className="detail-description">{sneaker.description}</p>
        </div>
      </div>

      <h3 className="more-heading">More sneakers</h3>
      <div className="more-grid">
        {others.map((s) => (
          <Link key={s.id} to={`/sneaker/${s.id}`} className="more-card">
            <SneakerImage src={s.image} alt={s.name} className="more-image" />
            <span>{s.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SneakerDetail;
