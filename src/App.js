import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { StoreProvider } from "./store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Drawer from "./components/Drawer";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Saved from "./pages/Saved";
import NotFound from "./pages/NotFound";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.scrollTo) window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.state]);

  return (
    <main id="main" className="page" key={location.pathname} tabIndex={-1}>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/sneaker/:id" element={<Detail />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <StoreProvider>
      <Router>
        <a href="#main" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }}>
          Skip to content
        </a>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        <Drawer />
        <Toast />
      </Router>
    </StoreProvider>
  );
}

export default App;
