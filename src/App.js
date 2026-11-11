import React, { useEffect, useRef } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import { StoreProvider } from "./context/StoreContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import BagDrawer from "./components/BagDrawer/BagDrawer";
import CompareBar from "./components/Compare/CompareBar";
import CompareModal from "./components/Compare/CompareModal";
import Toast from "./components/Toast/Toast";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import SavedPage from "./pages/SavedPage/SavedPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// Scroll to the top on navigation, or to a section when a link passes { scrollTo }.
function useScrollOnNavigate() {
  const { pathname, state, key } = useLocation();

  useEffect(() => {
    const target = state?.scrollTo && document.getElementById(state.scrollTo);
    if (target) {
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname, state, key]);
}

function Page() {
  const location = useLocation();
  const firstPaint = useRef(true);
  useScrollOnNavigate();

  // fade between routes, but never delay the very first paint
  useEffect(() => {
    firstPaint.current = false;
  }, []);

  return (
    <motion.main
      id="main"
      className="page"
      tabIndex={-1}
      key={location.pathname}
      initial={firstPaint.current ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/sneaker/:id" element={<ProductPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </motion.main>
  );
}

function skipToContent(event) {
  event.preventDefault();
  document.getElementById("main")?.focus();
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <HashRouter>
          <a href="#main" className="skip-link" onClick={skipToContent}>
            Skip to content
          </a>
          <Navbar />
          <Page />
          <Footer />
          <BagDrawer />
          <CompareBar />
          <CompareModal />
          <Toast />
        </HashRouter>
      </StoreProvider>
    </MotionConfig>
  );
}

export default App;
