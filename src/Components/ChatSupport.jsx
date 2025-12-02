import React, { useState, useEffect } from "react";
import "./chat.css";

export default function ChatSupport() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Clear chat on refresh
  useEffect(() => {
    setMessages([]);
  }, []);

  // ---- AI Reply System ----
  const getAIReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! 👋 How can I help you today?";
    }

    if (msg.includes("password") || msg.includes("reset")) {
      return "To reset your password, go to Profile → Settings → Reset Password.";
    }

    if (msg.includes("subscription") || msg.includes("upgrade")) {
      return "You can upgrade your subscription from the Subscription page anytime.";
    }

    if (msg.includes("bug") || msg.includes("issue") || msg.includes("problem")) {
      return "Please report the bug in the Help → Report Bug section. I'll assist you further!";
    }

    if (msg.includes("contact") || msg.includes("support")) {
      return "You can contact our support team using the Contact page.";
    }

    return "I’m not fully sure, but I will continue learning! 😊";
  };

  // ---- Send user message ----
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setInput("");

    setTimeout(() => {
      const reply = getAIReply(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <div className="chat-box">

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-msg ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-box">
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
