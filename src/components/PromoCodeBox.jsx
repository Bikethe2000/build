import React, { useState } from "react";

const PromoCodeBox = ({ code = "Order15" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
      alert("Failed to copy promo code.");
    }
  };

  return (
    <div
      style={{
        background: "#e6f7ff",
        border: "1px dashed #007bff",
        borderRadius: 8,
        margin: "24px auto",
        maxWidth: 400,
        padding: 20,
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        fontSize: 18,
      }}
    >
      <strong>Welcome! 🎉</strong>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Use promo code:{" "}
        <span
          style={{
            fontWeight: "bold",
            color: "#007bff",
            background: "#fff",
            padding: "4px 10px",
            borderRadius: 4,
            border: "1px dashed #007bff",
            marginLeft: 5,
            fontSize: 20,
            letterSpacing: 1,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {code}
          <button
            onClick={handleCopy}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: 8,
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Copy promo code"
            title="Copy promo code"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "#007bff" }}
            >
              <rect
                x="9"
                y="9"
                width="13"
                height="13"
                rx="2"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
              />
              <rect
                x="3"
                y="3"
                width="13"
                height="13"
                rx="2"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
              />
            </svg>
          </button>
          {copied && (
            <span
              style={{ color: "#28a745", fontSize: 14, marginLeft: 8 }}
            >
              Copied!
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default PromoCodeBox;
