import React, { useEffect, useState } from "react";
import profilePic from "../assets/profile.png";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Profile({ user, onLogout }) {
  const [plan, setPlan] = useState("Free");

  // 🔥 Fetch Subscription Plan Live From Firestore
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setPlan(data.plan || "Free");
      }
    });

    return () => unsub();
  }, [user]);

  // NOT LOGGED IN
  if (!user) {
    return (
      <div className="container mt-5">
        <h3 className="text-center text-danger">User not logged in!</h3>
      </div>
    );
  }

  // Badge color
  const planColor =
    plan === "Free"
      ? "gray"
      : plan === "Premium"
      ? "#ffd700"
      : plan === "Go"
      ? "#00eaff"
      : plan === "Plus"
      ? "#a855f7"
      : plan === "Pro"
      ? "#ff4444"
      : "white";

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          background: "#0e0e0e",
          color: "white",
          border: "1px solid #1a73e8",
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
              border: "3px solid #1a73e8",
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

          {/* PHONE */}
          <p className="text-light mt-1">
            <strong style={{ color: "#1a73e8" }}>Phone:</strong>{" "}
            <span style={{ opacity: 0.9 }}>Add Phone Number</span>
          </p>
        </div>

        <hr style={{ borderColor: "#333" }} />

        {/* SUBSCRIPTION SECTION */}
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
              <strong style={{ color: "#1a73e8" }}>Status:</strong>{" "}
              <span style={{ color: planColor, fontWeight: "bold" }}>
                {plan} Plan
              </span>
            </p>

            <p className="m-0 mt-1">
              <strong style={{ color: "#1a73e8" }}>Upgrade:</strong>{" "}
              <span className="text-primary">Available 🚀</span>
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
