import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import sneakers from "../../data/sneakers";
import { ArrowIcon } from "../Icons/Icons";
import "./Timeline.css";

const dated = sneakers.filter((s) => s.year).sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));

function Timeline() {
  return (
    <section id="timeline" className="section container grid-12 timeline" aria-labelledby="timeline-title">
      <div className="timeline__intro">
        <p className="eyebrow">
          Timeline · {dated[0].year} to {dated[dated.length - 1].year}
        </p>
        <h2 id="timeline-title" className="timeline__title">
          The classics, in the order they arrived.
        </h2>
        <p className="muted">
          Every photo in the archive is a side profile with the toe pointing left. Backgrounds are removed and each shoe
          is placed on a shared baseline, so you compare silhouettes rather than photography. Pairs without a
          well-documented release year are left off this list.
        </p>
      </div>
      <ol className="timeline__list">
        {dated.map((s, i) => (
          <motion.li
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={`/sneaker/${s.id}`} className="timeline__row">
              <span className="timeline__year tabular">{s.year}</span>
              <span className="timeline__name">
                {s.name}
                <span className="muted">{s.tagline}</span>
              </span>
              <img
                className="timeline__thumb"
                src={s.imageSmall}
                width="640"
                height="480"
                alt=""
                loading="lazy"
                decoding="async"
              />
              <ArrowIcon className="timeline__arrow" width={18} height={18} />
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

export default Timeline;
