import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import sneakers from "./data/sneakers";
import SneakerList from "./components/SneakerList";
import SneakerDetail from "./components/SneakerDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-heading">🔥 Sneaker Showcase</h1>
        <p className="app-subheading">Browse our latest drops</p>

        <Routes>
          <Route path="/" element={<SneakerList sneakers={sneakers} />} />
          <Route path="/sneaker/:id" element={<SneakerDetail sneakers={sneakers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
