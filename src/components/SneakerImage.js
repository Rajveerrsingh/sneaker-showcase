import React, { useEffect, useRef, useState } from "react";

// image with a shimmer skeleton while loading and a fallback if it fails
function SneakerImage({ src, alt, className = "", eager = false, ...rest }) {
  const [state, setState] = useState("loading");
  const ref = useRef(null);

  useEffect(() => {
    setState("loading");
  }, [src]);

  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setState("loaded");
  }, [src]);

  if (state === "error") {
    return (
      <div className={`${className} image-fallback`} role="img" aria-label={alt}>
        <span aria-hidden="true">👟</span>
      </div>
    );
  }

  return (
    <>
      {state === "loading" && <span className="skeleton" aria-hidden="true" />}
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={`${className} ${state === "loaded" ? "is-loaded" : ""}`}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
        draggable="false"
        {...rest}
      />
    </>
  );
}

export default SneakerImage;
