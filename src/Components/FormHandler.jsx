import React, { useState } from "react";

export default function FormHandler({ actionUrl, children }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.target);

    // Email validation
    const email = formData.get("email");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setToast({ type: "error", message: "Invalid Email Address" });
      setLoading(false);
      return;
    }

    // API request
    const response = await fetch(actionUrl, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    setLoading(false);

    if (response.ok) {
      setToast({ type: "success", message: "Message Sent Successfully!" });
      e.target.reset();
    } else {
      setToast({ type: "error", message: "Failed to send message" });
    }

    // hide toast after 4 sec
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {children}

        <button
          type="submit"
          className="btn btn-primary w-100 mt-2"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: toast.type === "success" ? "#28a745" : "#dc3545",
            padding: "12px 18px",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            animation: "slideUp 0.4s ease-out",
            zIndex: 9999,
          }}
        >
          {toast.message}
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
