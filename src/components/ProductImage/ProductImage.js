import React, { useEffect, useRef, useState } from "react";
import "./ProductImage.css";

// Cut-outs are exported on a shared 1200x900 canvas, so every shoe sits on the same baseline.
const WIDTH = 1200;
const HEIGHT = 900;

function ProductImage({ sneaker, sizes = "(min-width: 1024px) 25vw, 50vw", priority = false, className = "" }) {
  const [status, setStatus] = useState("loading");
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    setStatus(img?.complete && img.naturalWidth > 0 ? "loaded" : "loading");
  }, [sneaker.image]);

  return (
    <span
      className={`product-image product-image--${status} ${priority ? "product-image--priority" : ""} ${className}`}
    >
      {status === "error" ? (
        <span className="product-image__fallback">Image unavailable</span>
      ) : (
        <img
          ref={imgRef}
          src={sneaker.image}
          srcSet={`${sneaker.imageSmall} 640w, ${sneaker.image} 1200w`}
          sizes={sizes}
          width={WIDTH}
          height={HEIGHT}
          alt={`${sneaker.name} in ${sneaker.colorway}, side view`}
          loading={priority ? "eager" : "lazy"}
          fetchpriority={priority ? "high" : undefined}
          decoding="async"
          draggable="false"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
        />
      )}
    </span>
  );
}

export default ProductImage;
