import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.png";
import "../App.css";

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [showMsg, setShowMsg] = useState(false);

  const navbarRef = useRef(null);
  const msgRef = useRef(null);

  const handleTasksClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowMsg(true);

      setTimeout(() => {
        setShowMsg(false);
      }, 5000);

    } else {
      navigate("/Todos");
    }
  };

  // ---------- AUTO-CLOSE NAVBAR WITHOUT BREAKING MESSAGE ----------
  useEffect(() => {
    const navCollapse = document.getElementById("mainNavbar");

    const handleClickOutside = (e) => {
      // IMPORTANT: If user clicks on message popup → don't close navbar
      if (msgRef.current && msgRef.current.contains(e.target)) return;

      // Close navbar normally
      if (navCollapse && navCollapse.classList.contains("show")) {
        navCollapse.classList.remove("show");
      }
    };

    const handleScroll = () => {
      if (navCollapse && navCollapse.classList.contains("show")) {
        navCollapse.classList.remove("show");
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeNavbar = () => {
    const nav = document.getElementById("mainNavbar");
    if (nav && nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

  return (
    <>
      <header ref={navbarRef}>
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
          <div className="container">
            <Link className="navbar-brand" to="/" onClick={closeNavbar}>
              Fold<span className="fw-bold">Bash</span>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse animated-menu" id="mainNavbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                <li className="nav-item">
                  <Link className="nav-link" to="/Todos"
                    onClick={(e) => {
                      handleTasksClick(e);
                      closeNavbar();
                    }}>
                    Tasks
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/About" onClick={closeNavbar}>About</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Subscription" onClick={closeNavbar}>Subscription</Link>
                </li>
              </ul>

              <div className="d-flex align-items-center">

                {user ? (
                  <>
                    <Link to="/Profile" className="d-flex align-items-center text-white me-3" onClick={closeNavbar}>
                      <img src={user.photoURL || profilePic} className="profile-img" alt="Profile" />
                      <span className="ms-2">{user.displayName || user.email.split("@")[0]}</span>
                    </Link>

                    <button className="btn btn-outline-light btn-sm" onClick={() => { onLogout(); closeNavbar(); }}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeNavbar}>
                      <button className="btn btn-outline-light btn-sm me-2">Login</button>
                    </Link>

                    <Link to="/signup" onClick={closeNavbar}>
                      <button className="btn btn-primary btn-sm">Sign Up</button>
                    </Link>
                  </>
                )}

              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* 🔥 MESSAGE NOW WORKS ALWAYS */}
      {showMsg && (
        <div ref={msgRef} className="login-warning">
          Bhai, meri baat sun!  
          Tasks ka pura fayda uthana hai to pehle login karo 😎  
          Password mat bhoolna! 🔑
        </div>
      )}
    </>
  );
}
