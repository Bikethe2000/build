import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const validAdmins = {
  admin: "1234", // άλλαξε ή βάλε κι άλλους
  user2: "pass2",
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (validAdmins[username] === password) {
      localStorage.setItem("adminUser", username);
      navigate("/admin/dashboard");
    } else {
      alert("Λάθος στοιχεία!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
