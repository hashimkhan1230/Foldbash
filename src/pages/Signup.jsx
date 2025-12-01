import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { FaGithub } from "react-icons/fa";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      setMessage(`✅ Sign Up successful! Welcome, ${name}. Redirecting to login...`);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        {message && <p className="auth-message">{message}</p>}
        <p className="auth-text">
          Already have an account? <a href="/login">Login</a>
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
