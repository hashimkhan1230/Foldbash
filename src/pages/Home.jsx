import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTasks, FaChartLine, FaLock, FaGithub } from "react-icons/fa";
import './Home.css';

export default function Home() {
  const [message, setMessage] = useState(""); // ✅ state define

  const handleGetStarted = () => {
    // Professional message
    setMessage("🚀 Welcome to FoldBash! Get ready to organize your tasks like a pro.");
    
    // Remove message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Organize Your Day</h1>
        <p className="hero-subtitle">
          Manage tasks, stay productive, and track your goals — all in one place.
        </p>

        <div className="hero-buttons">
          <Link to="/">
            <button className="btn btn-primary btn-lg" onClick={handleGetStarted}>
              Get Started
            </button>
          </Link>
        </div>

        {/* Message Box */}
        {message && <div className="get-started-message">{message}</div>}
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose FoldBash?</h2>
        <div className="features-row">

          <div className="feature-card">
            <FaTasks className="feature-icon" />
            <h4>Simple & Clean</h4>
            <p>Organize your daily tasks with a clean and easy interface.</p>
          </div>

          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h4>Track Progress</h4>
            <p>Monitor completed tasks and improve your productivity.</p>
          </div>

          <div className="feature-card">
            <FaLock className="feature-icon" />
            <h4>Secure Login</h4>
            <p>Your data is safe with our secure login system.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Developed by Hashim Khan&nbsp;
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub size={20} />
          </a>
        </p>
        <p>© 2025 FoldBash — All Rights Reserved</p>
      </footer>
    </div>
  );
}
