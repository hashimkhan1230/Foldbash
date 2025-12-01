import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/profile.png";
import '../App.css';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();
  const [showMsg, setShowMsg] = useState(false);

  const handleTasksClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowMsg(true); // show professional message
      setTimeout(() => setShowMsg(false), 5000); // hide after 5 sec
    } else {
      navigate("/Todos");
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
          <div className="container">
            <Link className="navbar-brand" to="/">Fold<span className="fw-bold">Bash</span></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/Todos" onClick={handleTasksClick}>Tasks</Link>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/About">About</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Subscription">Subscription</Link></li>
              </ul>

              <div className="d-flex align-items-center mt-3 mt-lg-0">
                {user ? (
                  <>
                    <Link to="/Profile" className="d-flex align-items-center text-white me-3">
                      <img src={user.photoURL || profilePic} alt="Profile" style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", border: "2px solid white" }} />
                      <span className="ms-2">{user.displayName || user.email.split("@")[0]}</span>
                    </Link>
                    <button className="btn btn-outline-light btn-sm" onClick={onLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login"><button className="btn btn-outline-light btn-sm me-2">Login</button></Link>
                    <Link to="/signup"><button className="btn btn-primary btn-sm">Sign Up</button></Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Professional message banner */}
      {showMsg && (
        <div style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          backgroundColor: "#0b3d91",
          color: "#fff",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
          zIndex: 1000,
          maxWidth: "350px",
          fontWeight: "bold"
        }}>
         “Bhai, meri baat sun! 
Har cheez ka fayda uthane ke liye pehle login kar lo.
Aur haan, password mat bhoolna! 🔑
Forgot password ka option hai, lekin jyada rely mat karna. 😉
Samjha? 👌
        </div>
      )}
    </>
  );
}
