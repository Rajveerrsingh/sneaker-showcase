import React from "react";
import { useParams, Link } from "react-router-dom";
import "../App.css";

function SneakerDetail({ sneakers }) {
  const { id } = useParams();
  const sneaker = sneakers.find((s) => s.id === parseInt(id));

  if (!sneaker) {
    return <h2 style={{ textAlign: "center" }}>Sneaker not found</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "auto",
        padding: "40px 20px",
        textAlign: "center",
        color: "#f1f5f9"
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#60a5fa",
          fontWeight: "bold",
          textDecoration: "none"
        }}
      >
        ← Back to all sneakers
      </Link>

      <img
        src={sneaker.image}
        alt={sneaker.name}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          objectFit: "cover",
          borderRadius: "12px",
          margin: "20px 0",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
        }}
      />

      <h2 className="sneaker-name">{sneaker.name}</h2>
      <p className="sneaker-price">{sneaker.price}</p>
      <p className="sneaker-description">{sneaker.description}</p>
    </div>
  );
}

export default SneakerDetail;
