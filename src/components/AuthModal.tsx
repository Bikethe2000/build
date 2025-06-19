// src/components/AuthModal.tsx
import React from "react";

interface AuthModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
  children: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "none",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#888",
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    width: "90%",
    maxWidth: 500,
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
};

export default AuthModal;

