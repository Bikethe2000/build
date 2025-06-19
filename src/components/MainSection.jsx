import React, { useEffect, useState } from "react";
import FirebaseAuthUI from "./FirebaseAuthUI";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AuthModal from "./AuthModal";
import '../styles/App.css';
import '../styles/style.css';
import PrintXcelerateChatbot from "./Chatbot"
import CustomOrderForm from "./CustomOrderForm"
import { Footer } from "./Footer"
import Header from "./Header"
import Testimonials from "./Testimonials"
import PromoCodeBox from "./PromoCodeBox";

const MainSection = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
    const [showAuth, setShowAuth] = useState(false);
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        // Sync localStorage values on first load
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth)
        .then(() => {
            setIsLoggedIn(false);
            setIsAdmin(false);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("isAdmin");
        })
        .catch((error) => {
            console.error("Logout error:", error);
        });
    };


    return(
        <>
            <Header
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            onLoginClick={() => setShowAuth(true)}
            onLogout={handleLogout}
        />

        {isLoggedIn && <PromoCodeBox />}

        {showAuth && (
            <AuthModal
            show={showAuth}
            onClose={() => setShowAuth(false)}
            onSuccess={() => {
                setIsLoggedIn(true);
                setIsAdmin(localStorage.getItem("isAdmin") === "true");
                setShowAuth(false);
            }}
            >
            <FirebaseAuthUI onLoginSuccess={() => setShowAuth(false)} />
            </AuthModal>
        )}

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

                <section className="products" id="products" aria-label="Featured products">
                <div className="container">
                    <h3>Featured Products</h3>
                    <div className="product-grid">
                    <article className="product-card" tabIndex={0}>
                        <img src="/images/watch1.avif" alt="Smart Watch Charger Case" />
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
                        <img src="/images/aa_box.jpg" alt="Sticker Pack" />
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
                        <img src="/images/card-holder.avif" alt="Business Card Holder" />
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
                        <span className="feature-icon" aria-hidden="true">🚀</span>
                        <h4>Fast Shipping</h4>
                        <p>Get your orders delivered within 2–3 business days.</p>
                    </div>

                    <div className="feature" tabIndex={0}>
                        <span className="feature-icon" aria-hidden="true">🔒</span>
                        <h4>Secure Checkout</h4>
                        <p>Your payment and data are fully encrypted and safe.</p>
                    </div>

                    <div className="feature" tabIndex={0}>
                        <span className="feature-icon" aria-hidden="true">💬</span>
                        <h4>24/7 Support</h4>
                        <p>We’re always here to help — anytime you need us.</p>
                    </div>
                    </div>
                </div>
                </section>

                <Testimonials />
                <CustomOrderForm />
                <PrintXcelerateChatbot />
            </main> 
            <Footer />

        </>
        
    )
}

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#f9f9f9",
    padding: 30,
    borderRadius: 10,
    minWidth: 320,
    maxWidth: 450,
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    position: "relative",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: 14,
  },
};


export default MainSection;