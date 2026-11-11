import React from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import SneakerImage from "./SneakerImage";
import { HeartIcon, CompareIcon } from "./Icons";
import { useStore } from "../store";
import { formatPrice } from "../data/sneakers";

const MotionLink = motion.create(Link);

function SneakerCard({ sneaker, index = 0, shared = true }) {
  const { isFavorite, toggleFavorite, isComparing, toggleCompare } = useStore();
  const saved = isFavorite(sneaker.id);
  const comparing = isComparing(sneaker.id);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.article
      layout={!reduce}
      className={`card ${comparing ? "is-comparing" : ""}`}
      style={{ "--glow": sneaker.glow }}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <MotionLink to={`/sneaker/${sneaker.id}`} className="card-link" onPointerMove={onMove} onPointerLeave={onLeave}>
        <motion.div className="card-media" style={{ rotateX: rx, rotateY: ry }}>
          <span className="card-glow" aria-hidden="true" />
          <motion.div className="card-shoe" layoutId={shared ? `shoe-${sneaker.id}` : undefined}>
            <SneakerImage src={sneaker.image} alt={`${sneaker.name} in ${sneaker.colorway}`} className="card-img" />
          </motion.div>
          {sneaker.since && <span className="card-since">Since {sneaker.since}</span>}
        </motion.div>
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
      </MotionLink>
      <div className="card-actions">
        <button
          type="button"
          className={`icon-btn chip-btn ${comparing ? "is-on" : ""}`}
          aria-pressed={comparing}
          aria-label={comparing ? `Remove ${sneaker.name} from compare` : `Compare ${sneaker.name}`}
          title="Compare"
          onClick={() => toggleCompare(sneaker)}
        >
          <CompareIcon width={18} height={18} />
        </button>
        <button
          type="button"
          className={`icon-btn chip-btn ${saved ? "is-on" : ""}`}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${sneaker.name} from saved` : `Save ${sneaker.name}`}
          title="Save"
          onClick={() => toggleFavorite(sneaker)}
        >
          <HeartIcon filled={saved} width={18} height={18} />
        </button>
      </div>
    </motion.article>
  );
}

export default SneakerCard;
