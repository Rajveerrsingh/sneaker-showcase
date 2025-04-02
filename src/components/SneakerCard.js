import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function SneakerCard({ sneaker }) {
  return (
    <Link to={`/sneaker/${sneaker.id}`} style={{ textDecoration: "none" }}>
      <div className="sneaker-card">
        <img src={sneaker.image} alt={sneaker.name} className="sneaker-image" />
        <h3 className="sneaker-name">{sneaker.name}</h3>
        <p className="sneaker-price">{sneaker.price}</p>
        <p className="sneaker-description">{sneaker.description}</p>
      </div>
    </Link>
  );
}

export default SneakerCard;
