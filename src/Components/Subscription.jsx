import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, where, onSnapshot } from "firebase/firestore";
import "./Subscription.css";
import IMG_UPI_QR from "../assets/upi-qr.png"; // UPI QR code image
import { FaGithub } from "react-icons/fa";

export default function Subscription({ user }) {
  const [tab, setTab] = useState("personal");
  const [message, setMessage] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [userPlanStatus, setUserPlanStatus] = useState(null); // null, pending, approved

  // Check user's subscription status
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const latest = snapshot.docs[snapshot.docs.length - 1].data();
        setUserPlanStatus(latest.status); // pending / approved
      } else {
        setUserPlanStatus(null);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleUpgrade = async (plan) => {
    if (!user) {
      setMessage("❌ Please login first to upgrade.");
      return;
    }

    // If user already has pending or approved subscription, do nothing
    if (userPlanStatus === "pending" || userPlanStatus === "approved") {
      setMessage("⚠ You already have an active or pending subscription!");
      return;
    }

    try {
      await addDoc(collection(db, "subscriptions"), {
        userId: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        plan: plan,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      setMessage(`✅ Subscription request for ${plan} sent! Complete payment below:`);
      setShowPayment(true);
    } catch (error) {
      setMessage(`❌ Error submitting subscription: ${error.message}`);
      setShowPayment(false);
    }
  };

  return (
    <div className="pricing-page">

      {/* Message */}
      {message && <div className="subscription-message">{message}</div>}

      {/* Toggle */}
      <div className="toggle-box">
        <button
          className={tab === "personal" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setTab("personal")}
        >
          Personal
        </button>
        <button
          className={tab === "business" ? "toggle-btn active" : "toggle-btn"}
          onClick={() => setTab("business")}
        >
          Business
        </button>
      </div>

      {/* Plans */}
      <div className="cards-wrapper">

        {/* Free Plan */}
        <div className="plan-card free">
          <h2>Free</h2>
          <h1>₹0</h1>
          <p>See what AI can do</p>
          <ul>
            <li>✓ Simple explanations</li>
            <li>✓ Limited Access</li>
            <li>✓ Limited memory</li>
          </ul>
          <button className="btn disabled">Your plan</button>
        </div>

        {/* Go Plan */}
        <div className="plan-card go">
          <div className="tag">SPECIAL OFFER</div>
          <h2>Go</h2>
          <div className="price-box">
            <span className="strike">₹399</span>
            <h1>₹0</h1>
            <small>/ month (first 12 months)</small>
          </div>
          <p>Do more with smarter AI</p>
          <ul>
            <li>✓ Better replies</li>
            <li>✓ Smarter reasoning</li>
            <li>✓ All Routes are Accessible</li>
            <li>✓ Use All Tasks</li>
            <li>✓ Everything unlocked</li>
          </ul>

          <button
            className="btn go-btn"
            onClick={() => handleUpgrade("Go")}
            disabled={userPlanStatus === "pending" || userPlanStatus === "approved"} // disable if user already upgraded
          >
            {userPlanStatus === "approved"
              ? "Subscribed"
              : userPlanStatus === "pending"
              ? "Pending Approval"
              : "Upgrade to Go"}
          </button>
        </div>

      </div>

      {/* Bank / UPI Info */}
      {showPayment && (
        <div className="payment-info">
          <h3>Bank / UPI Payment</h3>
          <p>Transfer the payment manually or scan the UPI QR:</p>
          <ul>
            <li>Bank: Airtel Payments Bank</li>
            <li>UPI: 8859876802@ybl</li>
          </ul>

          {/* QR Code */}
          <div className="qr-code">
            <img
              src={IMG_UPI_QR}
              alt="UPI QR Code"
              width="200"
              height="200"
            />
          </div>

          <p>Once payment is done, admin will approve your subscription manually.</p>
          <p>Once you done your payment contact Hashim Khan (Admin) at +91 8859876802</p>
        </div>
      )}

    <footer className="subscription-footer">
  <p>
    Developed by Hashim Khan&nbsp;
    <a
      href="https://github.com/your-github-username"
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
