import React, { useEffect, useRef, useState } from "react";
import "./Todos.css";
import Chart from "chart.js/auto";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // apne firebase config ka path

export default function Todos() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState({
    Tasks: 0,
    Projects: 0,
    Time: 0,
    Habits: 0,
    TeamWork: 0,
    Notes: 0,
  });

  useEffect(() => {
    // Firestore listener for real-time updates
    const unsubscribe = onSnapshot(collection(db, "progress"), (snapshot) => {
      const newData = { ...progressData };
      snapshot.docs.forEach((doc) => {
        newData[doc.id] = doc.data().value; // doc.id should match chart labels
      });
      setProgressData(newData);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  useEffect(() => {
    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Tasks", "Projects", "Time", "Habits", "Team Work", "Notes"],
        datasets: [
          {
            label: "Progress",
            data: [
              progressData.Tasks,
              progressData.Projects,
              progressData.Time,
              progressData.Habits,
              progressData.TeamWork,
              progressData.Notes,
            ],
            backgroundColor: "rgba(13, 110, 253, 0.7)",
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 }, // assuming 0-100%
        },
      },
    });
  }, [progressData]); // update chart whenever progressData changes

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      <div className="chart-box">
        <canvas ref={chartRef} height="120"></canvas>
      </div>

      <div className="sections-grid">
        <div className="section-card" onClick={() => navigate("/TaskManagement")}>
          <h3>📌 Task Management</h3>
          <p>Organize and track your daily tasks efficiently.</p>
        </div>

        <div className="section-card" onClick={() => navigate("/ProjectManagement")}>
          <h3>📁 Project Management</h3>
          <p>Manage long-term projects with milestones.</p>
        </div>

        <div className="section-card" onClick={() => navigate("/TimeManagement")}>
          <h3>⏳ Time Management</h3>
          <p>Plan your day and improve productivity.</p>
        </div>

        <div className="section-card" onClick={() => navigate("/HabitTracker")}>
          <h3>🔥 Habit Tracker</h3>
          <p>Build new habits and track consistency.</p>
        </div>

        <div className="section-card" onClick={() => navigate("/Teamwork")}>
          <h3>🤝 Team Work</h3>
          <p>Collaborate and manage group tasks.</p>
        </div>

        <div className="section-card" onClick={() => navigate("/notes")}>
          <h3>📝 Notes</h3>
          <p>Save important notes and quick reminders.</p>
        </div>
      </div>
    </div>
  );
}
