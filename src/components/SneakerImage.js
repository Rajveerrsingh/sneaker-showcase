import React, { useState } from "react";

function SneakerImage({ src, alt, className = "", eager = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div className={`${className} image-fallback`} role="img" aria-label={alt}>
        <span aria-hidden="true">👟</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded ? "is-loaded" : ""}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

export default SneakerImage;
