import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import { getSneaker } from "../../data/sneakers";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { HeartIcon } from "../../components/Icons/Icons";
import "./SavedPage.css";

function SavedPage() {
  const { favorites } = useStore();
  const items = favorites.map(getSneaker).filter(Boolean);

  useEffect(() => {
    document.title = "Saved · Sole Archive";
    return () => {
      document.title = "Sole Archive · A sneaker showcase built with React";
    };
  }, []);

  return (
    <section className="section container saved" aria-labelledby="saved-title">
      <header className="saved__header">
        <p className="eyebrow">Your list</p>
        <h1 id="saved-title" className="saved__title">
          Saved pairs
        </h1>
        <p className="muted tabular">
          {items.length} {items.length === 1 ? "pair" : "pairs"}, kept on this device
        </p>
      </header>

      {items.length > 0 ? (
        <ProductGrid items={items} />
      ) : (
        <div className="empty-state">
          <HeartIcon width={24} height={24} />
          <p>Nothing saved yet. Tap the heart on any pair to keep it here.</p>
          <Link to="/" state={{ scrollTo: "archive" }} className="button button--primary">
            Browse the archive
          </Link>
        </div>
      )}
    </section>
  );
}

export default SavedPage;
