import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import sneakers from "../../data/sneakers";
import { ArrowIcon } from "../../components/Icons/Icons";
import "./NotFoundPage.css";

const stray = sneakers.find((s) => s.slug === "puma-suede") ?? sneakers[0];

function NotFoundPage({ message = "This page walked off." }) {
  useEffect(() => {
    document.title = "Page not found · Sole Archive";
    return () => {
      document.title = "Sole Archive · A sneaker showcase built with React";
    };
  }, []);

  return (
    <section className="not-found container grid-12" aria-labelledby="not-found-title">
      <div className="not-found__copy">
        <p className="eyebrow">Error 404</p>
        <h1 id="not-found-title" className="not-found__title">
          {message}
        </h1>
        <p className="muted">
          The link may be old, or the address has a typo. The archive itself is right where you left it.
        </p>
        <Link to="/" className="button button--primary">
          Back to the archive
          <ArrowIcon width={18} height={18} />
        </Link>
      </div>
      <div className="not-found__art" aria-hidden="true">
        <span className="not-found__code">404</span>
        <img src={stray.imageSmall} width="640" height="480" alt="" />
      </div>
    </section>
  );
}

export default NotFoundPage;
