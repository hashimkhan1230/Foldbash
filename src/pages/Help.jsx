import React, { useState } from "react";
import { FaChevronDown, FaLifeRing, FaBug, FaFileContract } from "react-icons/fa";
import FormHandler from "../Components/FormHandler";

export default function Help() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <div className="container py-5 help-wrapper">

      <div className="help-card">
        <h2 className="help-title">Help & Support</h2>

        {/* 1️⃣ HELP CENTER */}
        <div className="help-section">
          <div className="help-header" onClick={() => toggle(1)}>
            <FaLifeRing className="help-icon" />
            Help Center
            <FaChevronDown className={`help-chevron ${open === 1 ? "rotate" : ""}`} />
          </div>

          {open === 1 && (
            <div className="help-content">
              <p className="help-text">How can we help you?</p>

              <FormHandler actionUrl="https://formspree.io/f/xgvgyyze">
                <input type="email" name="email" placeholder="Your Email" className="help-input" required />
                <textarea name="support_message" placeholder="Describe your issue..." rows="3" className="help-input" required />
              </FormHandler>
            </div>
          )}
        </div>

        {/* 2️⃣ REPORT BUG */}
        <div className="help-section">
          <div className="help-header" onClick={() => toggle(2)}>
            <FaBug className="help-icon" />
            Report a Bug
            <FaChevronDown className={`help-chevron ${open === 2 ? "rotate" : ""}`} />
          </div>

          {open === 2 && (
            <div className="help-content">
              <p className="help-text">Tell us what issue you're facing.</p>

              <FormHandler actionUrl="https://formspree.io/f/xgvgyyze">
                <input type="email" name="email" placeholder="Your Email" className="help-input" required />
                <textarea name="bug_report" placeholder="Explain the bug..." rows="3" className="help-input" required />
              </FormHandler>
            </div>
          )}
        </div>

        {/* 3️⃣ TERMS & POLICIES */}
        <div className="help-section">
          <div className="help-header" onClick={() => toggle(3)}>
            <FaFileContract className="help-icon" />
            Terms & Policies
            <FaChevronDown className={`help-chevron ${open === 3 ? "rotate" : ""}`} />
          </div>

          {open === 3 && (
            <div className="help-content">
              <p className="help-text">Read our guidelines & privacy rules.</p>
            </div>
          )}
        </div>
      </div>

      {/* INLINE PREMIUM CSS */}
      <style>{`
        .help-wrapper {
          color: white;
        }

        .help-card {
          background: #0c0c0e;
          padding: 25px;
          border-radius: 22px;
          border: 2px solid rgba(26,115,232,0.5);
          box-shadow: 0 0 25px rgba(26,115,232,0.15);
        }

        .help-title {
          text-align: center;
          margin-bottom: 25px;
          color: #1a73e8;
          font-weight: bold;
        }

        .help-section {
          margin-bottom: 16px;
        }

        .help-header {
          background: #111118;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(26,115,232,0.4);
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: 0.25s;
        }

        .help-header:hover {
          background: #13131f;
          border-color: #1a73e8;
          transform: translateY(-1px);
        }

        .help-icon {
          color: #1a73e8;
          font-size: 18px;
        }

        .help-chevron {
          margin-left: auto;
          transition: 0.3s;
        }

        .help-chevron.rotate {
          transform: rotate(180deg);
        }

        .help-content {
          background: #0d0d15;
          border: 1px solid rgba(26,115,232,0.3);
          padding: 14px;
          margin-top: 8px;
          border-radius: 12px;
          animation: fadeSlide 0.3s ease;
        }

        .help-text {
          opacity: 0.8;
          margin-bottom: 8px;
        }

        .help-input {
          background: #0a0f16;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 10px;
          width: 100%;
          color: white;
          resize: none;
          transition: 0.2s;
        }

        .help-input:focus {
          border-color: #1a73e8;
          outline: none;
          background: #0e1520;
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}
