import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaInstagram, FaGithub } from "react-icons/fa";
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
        <h2 className="text-center mb-4" style={{ color: "#1a73e8" }}>
          Contact Us
        </h2>

        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-md-5 mb-4">
            <h4 style={{ color: "#1a73e8" }}>Get in Touch</h4>

            <p><FaEnvelope color="#1a73e8" /> Hashimkhanmai0@gmail.com</p>
            
            <p><FaPhoneAlt color="#1a73e8" /> +91 8859876802</p>
            <p><FaMapMarkerAlt color="#1a73e8" /> New Delhi, India</p>

            <h5 className="mt-4" style={{ color: "#1a73e8" }}>Follow Us</h5>

            <p className="d-flex gap-3">
              <a href="#" className="text-white"><FaInstagram size={22} /></a>
              <a href="#" className="text-white"><FaGithub size={22} /></a>
            </p>
          </div>

          {/* RIGHT SIDE FORM - FORMSPREE */}
          <div className="col-md-7">
            <h4 style={{ color: "#1a73e8" }}>Send a Message</h4>

            <FormHandler actionUrl="https://formspree.io/f/xgvgyyze">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="form-control mb-3"
                required
                style={{ background: "#111", color: "white", border: "1px solid #1a73e8" }}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="form-control mb-3"
                required
                style={{ background: "#111", color: "white", border: "1px solid #1a73e8" }}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                className="form-control mb-3"
                rows="4"
                required
                style={{ background: "#111", color: "white", border: "1px solid #1a73e8" }}
              ></textarea>

            </FormHandler>
          </div>
        </div>
      </div>
    </div>
  );
}
