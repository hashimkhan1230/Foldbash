import React from "react";
import './About.css'; // create this CSS file for styles if needed
import aboutIllustration from "../assets/about-illustration.png"; // add your illustration if available
import { FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-title">About FoldBash</h1>
        <p className="about-subtitle">
          FoldBash is your all-in-one productivity platform. Organize tasks, manage projects, track habits, and plan your time — all in a clean and intuitive interface.
        </p>
      </section>

      {/* Illustration */}
      <div className="about-illustration">
        <img src={aboutIllustration} alt="About FoldBash" />
      </div>

      {/* Features / Mission Section */}
      <section className="about-features">
        <h2 className="section-title">Our Mission</h2>
        <p>
          We aim to help individuals and teams achieve their goals efficiently by providing a seamless, reliable, and visually appealing productivity tool.
        </p>

        <div className="features-row">
          <div className="feature-card">
            <h3>💼 Task Management</h3>
            <p>Plan, track, and complete your tasks with ease.</p>
          </div>

          <div className="feature-card">
            <h3>📁 Project Management</h3>
            <p>Manage projects with milestones and track progress.</p>
          </div>

          <div className="feature-card">
            <h3>⏱️ Time Management</h3>
            <p>Plan your day, set priorities, and boost productivity.</p>
          </div>

          <div className="feature-card">
            <h3>🔥 Habit Tracker</h3>
            <p>Build consistent habits and achieve long-term goals.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <p>
          Developed by Hashim Khan&nbsp;
          <a
            href="https://github.com/hashimkhan1230"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
        </p>
        <p>© 2025 FoldBash — All Rights Reserved</p>
      </footer>
    </div>
  );
}
