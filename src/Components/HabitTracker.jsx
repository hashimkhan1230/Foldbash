import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Adjust path if needed
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [days, setDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

  // ----------------------- LOAD HABITS FROM FIRESTORE -----------------------
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "habits"));
        const loadedHabits = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setHabits(loadedHabits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  // ----------------------- ADD HABIT -----------------------
  const addHabit = async () => {
    if (!newHabit.trim()) return;

    const habitObj = {
      name: newHabit,
      progress: Array(days.length).fill(false),
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "habits"), habitObj);
      setHabits([...habits, { id: docRef.id, ...habitObj }]);
      setNewHabit("");
    } catch (error) {
      console.error("Error adding habit:", error);
    }
  };

  // ----------------------- TOGGLE DAY -----------------------
  const toggleDay = async (habitId, dayIndex) => {
    const habit = habits.find((h) => h.id === habitId);
    const updatedProgress = habit.progress.map((done, i) => (i === dayIndex ? !done : done));

    try {
      await updateDoc(doc(db, "habits", habitId), { progress: updatedProgress });
      setHabits(habits.map((h) => (h.id === habitId ? { ...h, progress: updatedProgress } : h)));
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  // ----------------------- DELETE HABIT -----------------------
  const deleteHabit = async (habitId) => {
    try {
      await deleteDoc(doc(db, "habits", habitId));
      setHabits(habits.filter((h) => h.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  // ----------------------- RENDER -----------------------
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🏆 Habit Tracker</h1>

        {/* Add Habit */}
        <div style={styles.inputBox}>
          <input
            type="text"
            placeholder="New Habit..."
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            style={styles.input}
          />
          <button onClick={addHabit} style={styles.button}>Add</button>
        </div>

        {/* Habit List */}
        {habits.length === 0 ? (
          <p style={styles.empty}>No habits yet...</p>
        ) : (
          <div style={styles.habitList}>
            {habits.map((habit) => {
              const completedDays = habit.progress.filter(Boolean).length;
              const progressPercent = Math.round((completedDays / days.length) * 100);

              return (
                <div key={habit.id} style={styles.habitCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={styles.habitName}>{habit.name}</h3>
                    <button onClick={() => deleteHabit(habit.id)} style={styles.deleteBtn}>✖</button>
                  </div>

                  {/* Days Tracker */}
                  <div style={styles.daysRow}>
                    {days.map((day, index) => (
                      <div
                        key={index}
                        onClick={() => toggleDay(habit.id, index)}
                        style={{
                          ...styles.dayBox,
                          backgroundColor: habit.progress[index] ? "#238636" : "#30363d",
                        }}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Progress */}
                  <p style={styles.progressText}>Progress: {progressPercent}%</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>Developed by Hashim Khan</span>
        <a
          href="https://github.com/YOUR_GITHUB_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.githubLink}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub"
            style={{ width: "20px", height: "20px" }}
          />
        </a>
      </div>
    </div>
  );
}

// ---------------- STYLING ----------------
const styles = {
  wrapper: { background: "#0d1117", minHeight: "100vh", padding: "40px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  container: { maxWidth: "700px", margin: "0 auto", padding: "25px", borderRadius: "16px", background: "#161b22", color: "#fff", boxShadow: "0 0 20px rgba(0,0,0,0.3)" },
  heading: { textAlign: "center", fontSize: "30px", marginBottom: "20px", color: "#58a6ff" },
  inputBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #30363d", background: "#0d1117", color: "#fff", fontSize: "16px" },
  button: { padding: "12px 20px", background: "#238636", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" },
  habitList: { display: "flex", flexDirection: "column", gap: "20px" },
  habitCard: { background: "#21262d", padding: "15px", borderRadius: "12px", border: "1px solid #30363d" },
  habitName: { marginBottom: "10px", color: "#58a6ff" },
  daysRow: { display: "flex", gap: "10px", marginBottom: "10px" },
  dayBox: { flex: 1, padding: "10px", textAlign: "center", borderRadius: "8px", cursor: "pointer", color: "#fff", fontWeight: "bold" },
  progressText: { textAlign: "right", color: "#aaa" },
  empty: { textAlign: "center", color: "#777", fontStyle: "italic" },
  deleteBtn: { background: "#da3633", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "8px", cursor: "pointer" },
  footer: { textAlign: "center", color: "#aaa", padding: "10px 0", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" },
  githubLink: { display: "inline-block", verticalAlign: "middle" },
};
