import React from "react";
import { Link } from "react-router-dom";
import SneakerImage from "./SneakerImage";
import "../App.css";

function SneakerCard({ sneaker }) {
  return (
    <Link to={`/sneaker/${sneaker.id}`} className="sneaker-card">
      <div className="image-wrap">
        <SneakerImage src={sneaker.image} alt={sneaker.name} className="sneaker-image" />
        <span className="brand-tag">{sneaker.brand}</span>
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3 className="sneaker-name">{sneaker.name}</h3>
          <p className="sneaker-price">{sneaker.price}</p>
        </div>
        <p className="sneaker-description">{sneaker.description}</p>
        <span className="view-link">View details →</span>
      </div>
    </Link>
  );
}

export default SneakerCard;
