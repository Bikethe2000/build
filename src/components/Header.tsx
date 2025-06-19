// src/components/Header.tsx
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./styles/Header.css";

interface HeaderProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, isAdmin, onLoginClick, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Κλείσιμο dropdown όταν κάνει click έξω
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="container header-container mx-auto mt-20">
        <h1 className="logo">PrintXcelerate</h1>

        <div style={{ marginLeft: "auto", position: "relative" }} ref={avatarRef}>
          {isLoggedIn ? (
            <>
              <button
                className="avatar-button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="User menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740" // μπορείς να βάλεις δικό σου avatar εδώ
                  alt="Avatar"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </button>
        
              {isLoggedIn && isAdmin && <a href="/admin/dashboard">Dashboard</a>}

              {dropdownOpen && (
                <div className="dropdown-menu" style={{
                  position: "absolute",
                  width: "200px",
                  height: "auto",
                  right: 0,
                  top: "40px",
                  background: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  borderRadius: "8px",
                  zIndex: 999,
                }}>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onLogout();
                    }}
                    style={{
                      padding: "10px 20px",
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      color: "red",
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="login-icon"
              aria-label="Login"
              style={{
                color: "#000",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
          )}
        </div>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#products" className="nav-link" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#features" className="nav-link" onClick={() => setMenuOpen(false)}>Why Us</a>
          <a href="#newsletter" className="nav-link" onClick={() => setMenuOpen(false)}>Newsletter</a>
          {isAdmin && (
            <a href="/admin/dashboard" className="admin-link">
              Admin Panel
            </a>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;
