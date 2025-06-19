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
  );
}
