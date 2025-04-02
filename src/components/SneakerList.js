import React from "react";
import SneakerCard from "./SneakerCard";
import "../App.css";

function SneakerList({ sneakers }) {
  return (
    <div className="sneaker-grid">
      {sneakers.map((sneaker) => (
        <SneakerCard key={sneaker.id} sneaker={sneaker} />
      ))}
    </div>
  );
}

export default SneakerList;
