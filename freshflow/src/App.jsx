import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Navbar from "./components/Navbar";
import ComponentDemo from "./pages/ComponentDemo";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div
        style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111827" : "#f3f4f6",
        color: darkMode ? "#ffffff" : "#000000",
        transition: "0.3s",
        }}
  >
        <Navbar />

        <div style={{ padding: "10px 20px" }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/demo" element={<ComponentDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;