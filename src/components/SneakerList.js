import React, { useState } from "react";
import SneakerCard from "./SneakerCard";
import "../App.css";

function SneakerList({ sneakers }) {
  const [brand, setBrand] = useState("All");
  const brands = ["All", ...new Set(sneakers.map((s) => s.brand))];
  const shown = brand === "All" ? sneakers : sneakers.filter((s) => s.brand === brand);

  return (
    <>
      <section className="hero">
        <h1 className="app-heading">Browse our latest drops</h1>
        <p className="app-subheading">
          Classic runners and street icons from Nike and Adidas. Tap a pair to see the details.
        </p>
        <div className="filters">
          {brands.map((b) => (
            <button
              key={b}
              className={`filter-btn ${brand === b ? "active" : ""}`}
              onClick={() => setBrand(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </section>

      <div className="sneaker-grid">
        {shown.map((sneaker) => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </div>
    </>
  );
}

export default SneakerList;
