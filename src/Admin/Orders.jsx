import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Παραγγελίες</h2>
      {orders.length === 0 && <p>Δεν υπάρχουν παραγγελίες.</p>}
      {orders.map((order, i) => (
        <div key={i} style={{ border: "1px solid gray", marginBottom: 10, padding: 10 }}>
          <p><strong>Όνομα:</strong> {order.name}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Filament:</strong> {order.filament}</p>
          <p><strong>Ποιότητα:</strong> {order.quality}</p>
          <p><strong>Όγκος:</strong> {order.estimatedVolume?.toFixed(2)} mm³</p>
          <p><strong>Κόστος:</strong> {order.estimatedCost?.toFixed(2)} €</p>
        </div>
      ))}
      <button onClick={() => navigate("/admin/dashboard")}>Πίσω</button>
    </div>
  );
}
