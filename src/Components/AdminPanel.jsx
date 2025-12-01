import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, updateDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [subscriptions, setSubscriptions] = useState([]);

  // Fetch all subscriptions in real-time
  useEffect(() => {
    const q = query(collection(db, "subscriptions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const subs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubscriptions(subs);
    });

    return () => unsubscribe();
  }, []);

  // Approve subscription
  const handleApprove = async (id) => {
    try {
      const subRef = doc(db, "subscriptions", id);
      await updateDoc(subRef, { status: "approved" });
      alert("Subscription approved!");
    } catch (error) {
      console.error(error);
      alert("Error approving subscription");
    }
  };

  // Set subscription pending
  const handlePending = async (id) => {
    try {
      const subRef = doc(db, "subscriptions", id);
      await updateDoc(subRef, { status: "pending" });
      alert("Subscription set to pending!");
    } catch (error) {
      console.error(error);
      alert("Error setting subscription pending");
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin Panel - Subscription Requests</h2>

      {subscriptions.length === 0 ? (
        <p className="no-subscriptions">No subscription requests yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id}>
                <td>{sub.displayName || "N/A"}</td>
                <td>{sub.email}</td>
                <td>{sub.plan}</td>
                <td className={sub.status}>{sub.status}</td>
                <td>
                  {sub.status !== "approved" && (
                    <button
                      className="approve-btn"
                      onClick={() => handleApprove(sub.id)}
                    >
                      Approve
                    </button>
                  )}
                  {sub.status !== "pending" && (
                    <button
                      className="pending-btn"
                      onClick={() => handlePending(sub.id)}
                    >
                      Set Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
