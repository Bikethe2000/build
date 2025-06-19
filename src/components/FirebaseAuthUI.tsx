import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const DEFAULT_AVATAR = "https://www.gravatar.com/avatar/?d=mp&f=y";

interface FirebaseAuthUIProps {
  onLoginSuccess: () => void;
}

const FirebaseAuthUI: React.FC<FirebaseAuthUIProps> = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        const photoURL = imageUrl.trim() !== "" ? imageUrl.trim() : DEFAULT_AVATAR;

        await setDoc(doc(db, "users", uid), {
          email,
          photoURL,
          isAdmin: false,
          createdAt: new Date(),
        });

        navigate("/"); // Default user route after register
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        // Check if user is admin (in 'admins' collection)
        const adminDoc = await getDoc(doc(db, "admins", uid));
        if (adminDoc.exists()) {
          localStorage.setItem("adminUser", uid); // <-- ADD THIS LINE
          navigate("/admin/dashboard");
        } else {
          localStorage.removeItem("adminUser"); // <-- ADD THIS LINE
          navigate("/"); // Default user route
        }
      }
      onLoginSuccess(); // This closes the modal!
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {isRegister && (
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            style={styles.input}
          />
        )}
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 15 }}>
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError(null);
          }}
          style={styles.toggleButton}
        >
          {isRegister ? "Login here" : "Register here"}
        </button>
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    padding: "10px 15px",
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "10px 15px",
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  toggleButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 14,
    padding: 0,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
};

export default FirebaseAuthUI;
