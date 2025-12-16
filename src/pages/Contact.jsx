import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import FormHandler from "../Components/FormHandler";

export default function Contact() {
  return (
    <div className="container py-5" style={{ color: "white" }}>
      <div
        className="card shadow-lg p-4"
        style={{
          background: "#0f0f0f",
          borderRadius: "20px",
          border: "1px solid #1a73e8",
        }}
      >
        {/* TITLE */}
        <h2 className="text-center mb-4" style={{ color: "#1a73e8" }}>
          Contact Us
        </h2>

        <div className="row">
          {/* LEFT INFO */}
          <div className="col-md-5 mb-4">
            <h4 style={{ color: "#1a73e8" }}>Get in Touch</h4>

            <p>
              <FaEnvelope color="#1a73e8" />{" "}
              <span className="ms-2">Hashimkhanmai0@gmail.com</span>
            </p>

            <p>
              <FaPhoneAlt color="#1a73e8" />{" "}
              <span className="ms-2">+91 8859876802</span>
            </p>

            <p>
              <FaMapMarkerAlt color="#1a73e8" />{" "}
              <span className="ms-2">New Delhi, India</span>
            </p>

            {/* SOCIAL */}
            <h5 className="mt-4" style={{ color: "#1a73e8" }}>
              Follow Me
            </h5>

            <div className="d-flex gap-3 align-items-center mt-2">
              <a
                href="https://github.com/hashimkhan1230"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-2"
                style={{
                  color: "#1a73e8",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                <FaGithub size={22} />
                <span>Hashim Paathan</span>
              </a>

              <a href="#" className="text-white">
                <FaInstagram size={22} />
              </a>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-md-7">
            <h4 style={{ color: "#1a73e8" }}>Send a Message</h4>

            <FormHandler actionUrl="https://formspree.io/f/xgvgyyze">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-control mb-3"
                required
                style={{
                  background: "#111",
                  color: "white",
                  border: "1px solid #1a73e8",
                }}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-control mb-3"
                required
                style={{
                  background: "#111",
                  color: "white",
                  border: "1px solid #1a73e8",
                }}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                className="form-control mb-3"
                rows="4"
                required
                style={{
                  background: "#111",
                  color: "white",
                  border: "1px solid #1a73e8",
                }}
              />
            </FormHandler>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="text-center mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(26,115,232,0.3)" }}
        >
          <p className="mb-1">
            Developed by{" "}
            <a
              href="https://github.com/hashimkhan1230"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#1a73e8",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              <FaGithub style={{ marginRight: "6px" }} />
              Hashim Paathan
            </a>
          </p>
          <p style={{ fontSize: "13px", opacity: 0.7 }}>
            © 2025 FoldBash — All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
