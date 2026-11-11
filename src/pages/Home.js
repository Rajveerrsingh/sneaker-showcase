import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import sneakers, { formatPrice } from "../data/sneakers";
import SneakerCard from "../components/SneakerCard";
import SneakerImage from "../components/SneakerImage";
import { Empty } from "../components/Drawer";
import { ArrowIcon, SearchIcon } from "../components/Icons";
import useReveal from "../hooks/useReveal";

const SORTS = {
  featured: { label: "Featured", fn: (a, b) => a.id - b.id },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  name: { label: "Name: A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
  newest: { label: "Year: newest first", fn: (a, b) => b.since - a.since }
};

const featured = sneakers.find((s) => s.id === 1);
const editorial = sneakers.find((s) => s.name === "Adidas Superstar");

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

  useReveal([shown]);

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
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="dot" aria-hidden="true" /> Fall / Winter 2026 edit
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hl"><span>Walk</span></span>{" "}
            <span className="hl"><span>louder<em>.</em></span></span>
          </h1>
          <p className="hero-sub">
            A curated archive of the sneakers that shaped the street, from 1969 shell toes to modern Boost
            runners. Browse, filter and build your rotation.
          </p>
          <div className="hero-cta">
            <a
              href="#shop"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop the drop <ArrowIcon width={18} height={18} />
            </a>
            <Link to={`/sneaker/${featured.id}`} className="btn btn-ghost">
              View {featured.name}
            </Link>
          </div>
          <dl className="hero-stats">
            <div><dt>Pairs</dt><dd>{sneakers.length}</dd></div>
            <div><dt>Brands</dt><dd>{brands.length - 1}</dd></div>
            <div><dt>Sizes</dt><dd>7–13</dd></div>
          </dl>
        </div>

        <Link to={`/sneaker/${featured.id}`} className="hero-visual" aria-label={`Featured: ${featured.name}`}>
          <div className="hero-frame">
            <SneakerImage src={featured.image} alt={`${featured.name} in ${featured.colorway}`} className="hero-img" eager />
          </div>
          <div className="hero-tag">
            <span className="eyebrow">Featured drop</span>
            <strong>{featured.name}</strong>
            <span>{formatPrice(featured.price)}</span>
          </div>
          <svg className="hero-badge" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text>
              <textPath href="#circle" textLength="236" lengthAdjust="spacing">NEW SEASON • FEATURED DROP • </textPath>
            </text>
          </svg>
        </Link>
      </section>

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

      <section id="shop" className="shop" aria-labelledby="shop-title">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">The collection</p>
            <h2 id="shop-title" className="section-title">Shop all sneakers</h2>
          </div>
          <p className="muted result-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "pair" : "pairs"}
          </p>
        </div>

        <div className="toolbar reveal">
          <div className="chips" role="group" aria-label="Filter by brand">
            {brands.map((b) => (
              <button key={b} type="button" className={`chip ${brand === b ? "active" : ""}`} aria-pressed={brand === b} onClick={() => setBrand(b)}>
                {b} <span className="chip-count">{counts[b]}</span>
              </button>
            ))}
          </div>
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
        </div>

        {shown.length === 0 ? (
          <Empty
            icon={<SearchIcon width={28} height={28} />}
            title="No pairs match that search"
            text={<>Try another brand or a shorter search. <button className="text-btn inline" onClick={reset}>Reset filters</button></>}
          />
        ) : (
          <div className="grid">
            {shown.map((s, i) => (
              <SneakerCard key={s.id} sneaker={s} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="editorial reveal" aria-labelledby="ed-title">
        <div className="editorial-media">
          <SneakerImage src={editorial.image} alt={`${editorial.name} sneakers`} className="editorial-img" />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">Icons never retire</p>
          <h2 id="ed-title" className="section-title">Shell toe, since {editorial.since}.</h2>
          <p className="muted">
            Born on the basketball court and adopted by hip-hop, the {editorial.name} is still one of the most
            recognisable silhouettes on the street.
          </p>
          <Link to={`/sneaker/${editorial.id}`} className="btn btn-primary">
            Shop the {editorial.name} <ArrowIcon width={18} height={18} />
          </Link>
        </div>
      </section>

      <section className="perks reveal" aria-label="Highlights">
        <div><strong>Size guide built in</strong><span className="muted">US 7 to 13 with live stock on every pair.</span></div>
        <div><strong>Save your rotation</strong><span className="muted">Favourites and bag stay put between visits.</span></div>
        <div><strong>Light or dark</strong><span className="muted">Switch themes from the top bar any time.</span></div>
      </section>
    </>
  );
}

export default Home;
