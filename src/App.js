import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import sneakers from "./data/sneakers";
import SneakerList from "./components/SneakerList";
import SneakerDetail from "./components/SneakerDetail";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <header className="navbar">
        <Link to="/" className="logo">
          🔥 Sneaker Showcase
        </Link>
        <span className="nav-count">{sneakers.length} pairs</span>
      </header>

      <main className="app-container">
        <Routes>
          <Route path="/" element={<SneakerList sneakers={sneakers} />} />
          <Route path="/sneaker/:id" element={<SneakerDetail sneakers={sneakers} />} />
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>Page not found</h2>
                <Link to="/" className="btn">Back to all sneakers</Link>
              </div>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        Built with React by Rajveer Singh
      </footer>
    </Router>
  );
}

export default App;
