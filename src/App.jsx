<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainSection from "./components/MainSection";
import Dashboard from "./Admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const admin = localStorage.getItem("isAdmin") === "true";
      setIsAdmin(admin);
    };

    checkAdmin();

    // Optional: listen for storage changes from other tabs
    window.addEventListener("storage", checkAdmin);

    return () => {
      window.removeEventListener("storage", checkAdmin);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainSection />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute isAllowed={isAdmin} redirectTo="/admin/dashboard">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
=======
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
// import PopupChatBot from "./components/Chatbot";
import ChatBot from "react-chatbotify";
import PrintXcelerateChatbot from "./components/Chatbot";

export default function App() {
  // const [email, setEmail] = useState("");
  // const [msg, setMsg] = useState("");
  // const [status, setStatus] = useState(""); // "success" | "error"

  // function doPost(e) {
  //   e.preventDefault();

  //   try {
  //     const data = {
  //       email,
  //       // εδώ θα προσθέσεις αν θες και ip, userAgent, language, url από το client-side
  //     };

  //     // Για παράδειγμα μπορείς να στείλεις το data σε ένα API endpoint

  //     setStatus("success");
  //     setMsg("Subscribed successfully!");
  //     setEmail("");
  //   } catch (error) {
  //     setStatus("error");
  //     setMsg("Subscription failed.");
  //   }
  // }

  // const addToCart = (productName) => {
  //   alert(`Added "${productName}" to cart!`);
  // };

  return (
    <>
      <header>
        <div className="container header-container">
          <h1 className="logo">PrintXcelerate</h1>
          <nav>
            <a href="#products" className="nav-link">
              Products
            </a>
            <a href="#features" className="nav-link">
              Why Us
            </a>
            <a href="#newsletter" className="nav-link">
              Newsletter
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-container">
            <h2>Transform Your Prints with Speed &amp; Style</h2>
            <p>Premium-quality prints delivered fast, with unmatched service.</p>
            <a href="#products" className="btn btn-primary">
              Shop Now
            </a>
          </div>
        </section>

        <section
          className="products"
          id="products"
          aria-label="Featured products"
        >
          <div className="container">
            <h3>Featured Products</h3>
            <div className="product-grid">
              <article className="product-card" tabIndex={0}>
                <img src="images/watch1.avif" alt="Smart Watch Charger Case" />
                <h4>Smart Watch Charger Case</h4>
                <p className="price">€2.99</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => window.open("https://payhip.com/b/4hCOf", "_blank")}
                >
                  Shop Now
                </button>
              </article>

              <article className="product-card" tabIndex={0}>
                <img src="images/aa_box.jpg" alt="Sticker Pack" />
                <h4>AA Batteries Box</h4>
                <p className="price">€4.44</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => window.open("https://payhip.com/PrintXcelerate", "_blank")}
                >
                  Shop Now
                </button>
              </article>

              <article className="product-card" tabIndex={0}>
                <img src="images/card-holder.avif" alt="Business Card Holder" />
                <h4>Business Card Holder</h4>
                <p className="price">€3.99</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => window.open("https://payhip.com/b/HoTBb", "_blank")}
                >
                  Shop Now
                </button>
              </article>
            </div>
          </div>
        </section>

        <section className="features" id="features" aria-label="Why choose us">
          <div className="container">
            <h3>Why Choose Us</h3>
            <div className="features-grid">
              <div className="feature" tabIndex={0}>
                <span className="feature-icon" aria-hidden="true">
                  🚀
                </span>
                <h4>Fast Shipping</h4>
                <p>Get your orders delivered within 2–3 business days.</p>
              </div>

              <div className="feature" tabIndex={0}>
                <span className="feature-icon" aria-hidden="true">
                  🔒
                </span>
                <h4>Secure Checkout</h4>
                <p>Your payment and data are fully encrypted and safe.</p>
              </div>

              <div className="feature" tabIndex={0}>
                <span className="feature-icon" aria-hidden="true">
                  💬
                </span>
                <h4>24/7 Support</h4>
                <p>We’re always here to help — anytime you need us.</p>
              </div>
            </div>
          </div>
        </section>
        {/* <PopupChatBot /> */}
        <PrintXcelerateChatbot />
      </main>

      <footer>
        <div className="container footer-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p>© 2025 PrintXcelerate. All rights reserved.</p>
          <div className="social-icons" style={{ display: "flex", gap: "20px" }}>
            <a
              href="https://instagram.com/printxcelerate"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: "#E1306C" }}
            >
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a
              href="https://tiktok.com/@printxcelerate"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ color: "#000000" }}
            >
              <FontAwesomeIcon icon={faTiktok} size="2x" />
            </a>
          </div>
        </div>
      </footer>
    </>
>>>>>>> fc63dbbb6009028740d07703f32fd538f8bca8d3
  );
}