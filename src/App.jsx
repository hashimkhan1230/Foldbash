import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./Components/Header";
import Todos from "./Components/Todos";
import TaskManagement from "./Components/TaskManagement";
import ProjectManagement from "./Components/ProjectManagement";
import Teamwork from "./Components/Teamwork";
import Notes from "./Components/Notes";
import HabitTracker from "./Components/HabitTracker";
import TimeManagement from "./Components/TimeManagement";
import Subscription from "./Components/Subscription";
import AdminPanel  from "./Components/AdminPanel";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      {/* Header */}
      <Header user={user} onLogout={handleLogout} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        <Route
          path="/profile"
          element={<Profile user={user} onLogout={handleLogout} />}
        />

        {/* Feature Components */}
        <Route path="/taskmanagement" element={<TaskManagement />} />
        <Route path="/projectmanagement" element={<ProjectManagement />} />
        <Route path="/teamwork" element={<Teamwork />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/habittracker" element={<HabitTracker />} />
        <Route path="/timemanagement" element={<TimeManagement />} />
        <Route path="/admin" element={<AdminPanel />} />


        {/* Pages */}
        <Route path="/about" element={<About />} />

        {/* Subscription Page */}
        <Route
          path="/subscription"
          element={<Subscription user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
