import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";  // your firebase.js export

import Header from "./Components/Header";
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
import AdminPanel  from "./Components/AdminPanel";


export default function App() {
  const [user, setUser] = useState(null);

  // Firebase keeps user logged in after refresh
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // user will stay logged in
    });

    return () => unsub();
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <BrowserRouter>
      <Header user={user} onLogout={handleLogout} />

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
      </Routes>
    </BrowserRouter>
  );
}
