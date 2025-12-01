import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";

export default function TimeManagement() {
  const [tasks, setTasks] = useState([]);
  const [time, setTime] = useState("");
  const [taskName, setTaskName] = useState("");
  const [search, setSearch] = useState("");

  // ---------------- LOAD TASKS FROM FIRESTORE ----------------
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "timeTasks"));
        const loadedTasks = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // ---------------- ADD TASK ----------------
  const addTask = async () => {
    if (!taskName.trim() || !time) return;
    const taskObj = { name: taskName, time, completed: false };

    try {
      const docRef = await addDoc(collection(db, "timeTasks"), taskObj);
      setTasks([...tasks, { id: docRef.id, ...taskObj }]);
      setTaskName("");
      setTime("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ---------------- TOGGLE COMPLETED ----------------
  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updatedTask = { ...task, completed: !task.completed };

    try {
      await updateDoc(doc(db, "timeTasks", id), { completed: updatedTask.completed });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ---------------- DELETE TASK ----------------
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "timeTasks", id));
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ---------------- FILTER TASKS ----------------
  const filteredTasks = tasks.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.time.includes(search)
  );

  // ---------------- RENDER ----------------
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>⏰ Time Management</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search tasks or time..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...styles.input, marginBottom: "15px" }}
        />

        {/* Add Task */}
        <div style={styles.inputBox}>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ ...styles.input, flex: 1 }}
          />
          <input
            type="text"
            value={taskName}
            placeholder="Task Name"
            onChange={(e) => setTaskName(e.target.value)}
            style={{ ...styles.input, flex: 2 }}
          />
          <button onClick={addTask} style={styles.button}>Add Task</button>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <p style={styles.empty}>No tasks found...</p>
        ) : (
          <ul style={styles.list}>
            {filteredTasks
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((task) => (
                <li key={task.id} style={styles.listItem}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span
                    style={{
                      ...styles.taskText,
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "#777" : "#fff",
                    }}
                  >
                    {task.time} - {task.name}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={styles.deleteBtn}
                  >
                    ✖
                  </button>
                </li>
              ))}
          </ul>
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
  wrapper: { background: "#0d1117", minHeight: "100vh", padding: "40px 0" },
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "25px",
    borderRadius: "16px",
    background: "#161b22",
    color: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.3)",
  },
  heading: { textAlign: "center", fontSize: "30px", marginBottom: "20px", color: "#58a6ff" },
  inputBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #30363d", background: "#0d1117", color: "#fff", fontSize: "16px" },
  button: { padding: "12px 20px", background: "#238636", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" },
  list: { padding: 0, listStyle: "none" },
  listItem: { background: "#161b22", padding: "10px", marginBottom: "8px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid #30363d" },
  taskText: { flex: 1, fontSize: "16px" },
  empty: { textAlign: "center", color: "#777", fontStyle: "italic" },
  deleteBtn: { background: "#da3633", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "8px", cursor: "pointer" },
  footer: {
    textAlign: "center",
    color: "#aaa",
    padding: "15px 0",
    marginTop: "20px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
  githubLink: { display: "inline-block", verticalAlign: "middle", transition: "transform 0.2s" },
};
