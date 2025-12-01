import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import "./Auth.css";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setMessage(`👋 Welcome back, ${userCredential.user.displayName || email}!`);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="auth-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>

      {/* Footer: Outside auth-box */}
      <footer className="auth-footer">
        <p>
          Developed by Hashim Khan&nbsp;
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={18} />
          </a>
        </p>
        <p>© 2025 FoldBash — All Rights Reserved</p>
      </footer>
    </div>
  );
}
