import React, { useDeferredValue, useMemo, useState } from "react";
import sneakers, { BRANDS, SORT_OPTIONS } from "../../data/sneakers";
import Segmented from "../../components/Segmented/Segmented";
import Hero from "../../components/Hero/Hero";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Timeline from "../../components/Timeline/Timeline";
import { ChevronIcon, CloseIcon, SearchIcon } from "../../components/Icons/Icons";
import "./HomePage.css";

const sorters = {
  featured: () => 0,
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name)
};

function HomePage() {
  const [brand, setBrand] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return sneakers
      .filter((s) => brand === "All" || s.brand === brand)
      .filter((s) => !q || `${s.name} ${s.brand} ${s.colorway}`.toLowerCase().includes(q))
      .sort(sorters[sort]);
  }, [brand, deferredQuery, sort]);

  const reset = () => {
    setBrand("All");
    setQuery("");
  };

  return (
    <>
      <Hero />

      <section id="archive" className="section container archive" aria-labelledby="archive-title">
        <div className="archive__header">
          <div>
            <p className="eyebrow">The archive</p>
            <h2 id="archive-title" className="archive__title">
              Every pair, one baseline.
            </h2>
          </div>
          <p className="muted tabular archive__count" aria-live="polite">
            {results.length} {results.length === 1 ? "pair" : "pairs"}
          </p>
        </div>

        <div className="toolbar">
          <Segmented
            id="brand"
            label="Filter by brand"
            options={BRANDS.map((b) => ({ value: b, label: b }))}
            value={brand}
            onChange={setBrand}
          />

          <div className="toolbar__end">
            <label className="field field--search">
              <span className="visually-hidden">Search sneakers</span>
              <SearchIcon width={18} height={18} />
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
            </label>
            <label className="field field--select">
              <span className="visually-hidden">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronIcon width={16} height={16} />
            </label>
          </div>
        </div>

        {results.length > 0 ? (
          <ProductGrid items={results} fillRows />
        ) : (
          <div className="empty-state">
            <p>No pairs match “{query.trim() || brand}”.</p>
            <button type="button" className="button button--secondary" onClick={reset}>
              <CloseIcon width={16} height={16} />
              Clear filters
            </button>
          </div>
        )}
      </section>

      <Timeline />
    </>
  );
}

export default HomePage;
