import React from "react";
import profilePic from "../assets/profile.png";

export default function Profile({ user, onLogout }) {
  if (!user) {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-danger">User not logged in!</h3>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          background: "#0e0e0e", // BLACK BOX
          color: "white",
          border: "1px solid #1a73e8", // Blue border
        }}
      >
        {/* PROFILE IMAGE */}
        <div className="text-center">
          <img
            src={user.photoURL || profilePic}
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #1a73e8", // Blue ring
            }}
          />

          {/* USER NAME */}
          <h3 className="mt-3 fw-bold" style={{ color: "#1a73e8" }}>
            {user.displayName || user.email.split("@")[0]}
          </h3>

          {/* USER EMAIL */}
          <p className="text-light" style={{ opacity: 0.8 }}>
            {user.email}
          </p>

          {/* PHONE NUMBER */}
          <p className="text-light mt-1">
            <strong style={{ color: "#1a73e8" }}>Phone:</strong>{" "}
            <span style={{ opacity: 0.9 }}>Add Phone Number</span>
          </p>
        </div>

        {/* LINE DIVIDER */}
        <hr style={{ borderColor: "#333" }} />

        {/* SUBSCRIPTION BOX */}
        <div className="mt-3">
          <h5 className="fw-bold" style={{ color: "#1a73e8" }}>
            Subscription
          </h5>

          <div
            className="p-3 rounded"
            style={{
              background: "#121212",
              border: "1px solid #1a73e8",
            }}
          >
            <p className="m-0">
              <strong style={{ color: "#1a73e8" }}>Status:</strong> Free Plan
            </p>
            <p className="m-0 mt-1">
              <strong style={{ color: "#1a73e8" }}>Upgrade:</strong>{" "}
              <span className="text-primary">Coming Soon 🚀</span>
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="d-grid gap-2 mt-4">
          <button
            className="btn"
            style={{
              background: "#1a73e8",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </button>

          <button
            className="btn btn-danger"
            onClick={onLogout}
            style={{ fontWeight: "bold" }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
