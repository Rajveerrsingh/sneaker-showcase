import React from "react";
import { Link } from "react-router-dom";

function NotFound({ title = "Page not found" }) {
  return (
    <div className="not-found">
      <p className="nf-code" aria-hidden="true">404</p>
      <h1 className="section-title">{title}</h1>
      <p className="muted">The pair you are looking for has left the building.</p>
      <Link to="/" className="btn btn-primary">Back to the collection</Link>
    </div>
  );
}

export default NotFound;
