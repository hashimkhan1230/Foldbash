import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Components
import Header from "./Components/Header";
import ChatSupport from "./Components/ChatSupport";


// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

import Todos from "./Components/Todos";
import TaskManagement from "./Components/TaskManagement";
import ProjectManagement from "./Components/ProjectManagement";
import Teamwork from "./Components/Teamwork";
import Notes from "./Components/Notes";
import HabitTracker from "./Components/HabitTracker";
import TimeManagement from "./Components/TimeManagement";

import Subscription from "./Components/Subscription";
import About from "./pages/About";
import AdminPanel from "./Components/AdminPanel";
import Contact from "./pages/Contact";
import Help from "./pages/Help";


export default function App() {
  const [user, setUser] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  // Firebase: Keep user logged in
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsub();
  }, []);

  const handleLogout = () => auth.signOut();

  return (
    <>
      <BrowserRouter>
        
        {/* HEADER */}
        <Header user={user} onLogout={handleLogout} />

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />

          <Route path="/taskmanagement" element={<TaskManagement />} />
          <Route path="/projectmanagement" element={<ProjectManagement />} />
          <Route path="/teamwork" element={<Teamwork />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/habittracker" element={<HabitTracker />} />
          <Route path="/timemanagement" element={<TimeManagement />} />

          <Route path="/about" element={<About />} />
          <Route path="/subscription" element={<Subscription user={user} />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
         

        </Routes>
      </BrowserRouter>


      {/* FLOATING CHAT BUTTON */}
      <div
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          position: "fixed",
          bottom: "22px",
          right: "22px",
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "#1a73e8",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(0,0,0,0.45)",
          zIndex: 9999,
          transition: "0.25s",
        }}
      >
        {chatOpen ? "✖" : "💬"}
      </div>

      {/* CHAT BOX (SLIDE OPEN) */}
      <div
        style={{
          position: "fixed",
          bottom: chatOpen ? "90px" : "-500px",
          right: "20px",
          width: "330px",
          maxWidth: "92%",
          transition: "all 0.35s ease",
          zIndex: 9999,
        }}
      >
        <ChatSupport user={user} />
      </div>
    </>
  );
}
