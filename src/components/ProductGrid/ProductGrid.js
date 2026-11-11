import React from "react";
import { AnimatePresence } from "framer-motion";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

// On a four-column row, three leftovers would leave a gap; widening the first card closes it.
function ProductGrid({ items, fillRows = false }) {
  const widenFirst = fillRows && items.length % 4 === 3;

  return (
    <div className="product-grid grid-12">
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((sneaker, index) => (
          <ProductCard key={sneaker.id} sneaker={sneaker} wide={widenFirst && index === 0} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ProductGrid;
