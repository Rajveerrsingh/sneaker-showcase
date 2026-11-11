import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import sneakers from "../data/sneakers";
import SneakerCard from "../components/SneakerCard";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import Countdown from "../components/Countdown";
import Magnetic from "../components/Magnetic";
import { Empty } from "../components/Drawer";
import { ArrowIcon, SearchIcon } from "../components/Icons";
import Reveal from "../components/Reveal";

const SORTS = {
  featured: { label: "Featured", fn: (a, b) => a.id - b.id },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  name: { label: "Name: A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
  oldest: { label: "Heritage: oldest first", fn: (a, b) => (a.since || 9999) - (b.since || 9999) }
};

const dropShoe = sneakers.find((s) => s.key === "vomero5");
const railItems = sneakers.filter((s) => ["aj4", "gazelle-indoor", "nb1906r", "cortez", "sl72", "dunk-panda", "puma-suede"].includes(s.key));
const editorial = sneakers.find((s) => s.key === "puma-suede");

function Home() {
  const [brand, setBrand] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const location = useLocation();

  const brands = ["All", ...new Set(sneakers.map((s) => s.brand))];
  const counts = useMemo(() => {
    const c = { All: sneakers.length };
    sneakers.forEach((s) => (c[s.brand] = (c[s.brand] || 0) + 1));
    return c;
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sneakers
      .filter((s) => brand === "All" || s.brand === brand)
      .filter((s) => !q || `${s.name} ${s.brand} ${s.colorway}`.toLowerCase().includes(q))
      .sort(SORTS[sort].fn);
  }, [brand, query, sort]);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 60);
    }
  }, [location.state]);

  const reset = () => {
    setBrand("All");
    setQuery("");
    setSort("featured");
  };

  return (
    <>
      <Hero />

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              {sneakers.map((s) => (
                <React.Fragment key={s.id}>
                  {s.name} <b>✦</b>{" "}
                </React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      <Reveal className="drop-wrap">
        <Countdown sneaker={dropShoe} />
      </Reveal>

      <Carousel items={railItems} />

      <section id="shop" className="shop" aria-labelledby="shop-title">
        <Reveal className="section-head">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 id="shop-title" className="section-title">Shop all sneakers</h2>
          </div>
          <p className="muted result-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "pair" : "pairs"} · tap ⇅ on two cards to compare
          </p>
        </Reveal>

        <Reveal className="toolbar">
          <LayoutGroup id="chips">
            <div className="chips" role="group" aria-label="Filter by brand">
              {brands.map((b) => (
                <button key={b} type="button" className={`chip ${brand === b ? "active" : ""}`} aria-pressed={brand === b} onClick={() => setBrand(b)}>
                  {brand === b && <motion.span layoutId="chip-pill" className="chip-pill" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="chip-label">{b}</span> <span className="chip-count">{counts[b]}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
          <div className="toolbar-right">
            <label className="search">
              <SearchIcon width={18} height={18} />
              <span className="sr-only">Search sneakers</span>
              <input type="search" placeholder="Search name or colour" value={query} onChange={(e) => setQuery(e.target.value)} />
            </label>
            <label className="select">
              <span className="sr-only">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        {shown.length === 0 ? (
          <Empty
            icon={<SearchIcon width={28} height={28} />}
            title="No pairs match that search"
            text={<>Try another brand or a shorter search. <button className="text-btn inline" onClick={reset}>Reset filters</button></>}
          />
        ) : (
          <motion.div className="grid" layout>
            <AnimatePresence mode="popLayout">
              {shown.map((s, i) => (
                <SneakerCard key={s.id} sneaker={s} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Reveal className="editorial" as="section">
        <div className="editorial-media" style={{ "--glow": editorial.glow }}>
          <span className="editorial-ring" aria-hidden="true" />
          <motion.img
            src={editorial.image}
            alt={`${editorial.name} in ${editorial.colorway}`}
            className="editorial-img"
            loading="lazy"
            initial={{ rotate: -24, x: -60, opacity: 0 }}
            whileInView={{ rotate: -10, x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 70, damping: 14 }}
          />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">Icons never retire</p>
          <h2 className="section-title">Suede, since {editorial.since}.</h2>
          <p className="muted">
            Low, soft and simple. The {editorial.name} has been on courts, dance floors and city streets for more
            than five decades, and it still looks right with everything.
          </p>
          <Magnetic>
            <Link to={`/sneaker/${editorial.id}`} className="btn btn-primary">
              Shop the {editorial.name} <ArrowIcon width={18} height={18} />
            </Link>
          </Magnetic>
        </div>
      </Reveal>

      <section className="perks" aria-label="Highlights">
        {[
          ["Move the shoe", "The hero tilts in 3D and follows your cursor."],
          ["Compare head to head", "Pick any two pairs and see them side by side."],
          ["Save your rotation", "Bag, favourites and theme stay put between visits."]
        ].map(([t, d], k) => (
          <Reveal key={t} delay={k * 0.08}>
            <strong>{t}</strong>
            <span className="muted">{d}</span>
          </Reveal>
        ))}
      </section>
    </>
  );
}

export default Home;
