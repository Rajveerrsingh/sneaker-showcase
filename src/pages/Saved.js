import React from "react";
import { Link } from "react-router-dom";
import sneakers from "../data/sneakers";
import SneakerCard from "../components/SneakerCard";
import { Empty } from "../components/Drawer";
import { HeartIcon } from "../components/Icons";
import { useStore } from "../store";
import useReveal from "../hooks/useReveal";

function Saved() {
  const { favorites } = useStore();
  const saved = sneakers.filter((s) => favorites.includes(s.id));
  useReveal([saved.length]);

  return (
    <section className="saved-page" aria-labelledby="saved-title">
      <div className="section-head">
        <div>
          <p className="eyebrow">Your rotation</p>
          <h1 id="saved-title" className="section-title">Saved pairs</h1>
        </div>
        <p className="muted">{saved.length} saved</p>
      </div>
      {saved.length === 0 ? (
        <Empty
          icon={<HeartIcon width={28} height={28} />}
          title="No saved pairs yet"
          text={<>Tap the heart on any sneaker to save it. <Link to="/" state={{ scrollTo: "shop" }} className="text-btn inline">Browse the collection</Link></>}
        />
      ) : (
        <div className="grid">
          {saved.map((s, i) => (
            <SneakerCard key={s.id} sneaker={s} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Saved;
