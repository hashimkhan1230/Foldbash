import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function TaskManagement() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // ---------------- LOAD TASKS ----------------
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
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
    if (task.trim() === "") return;

    const newTaskObj = { name: task, completed: false };
    try {
      const docRef = await addDoc(collection(db, "tasks"), newTaskObj);
      setTasks([{ id: docRef.id, ...newTaskObj }, ...tasks]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ---------------- TOGGLE TASK ----------------
  const toggleTask = async (id) => {
    const taskToUpdate = tasks.find((t) => t.id === id);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      await updateDoc(doc(db, "tasks", id), { completed: updatedTask.completed });
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ---------------- DELETE TASK ----------------
  const deleteTaskFn = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // ---------------- FILTERED TASKS ----------------
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    if (filter === "pending") return !t.completed && matchesSearch;
    if (filter === "completed") return t.completed && matchesSearch;
    return matchesSearch; // all
  });

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📝 Task Manager</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        {/* Input Box */}
        <div style={styles.inputBox}>
          <input
            type="text"
            value={task}
            placeholder="Enter a new task..."
            onChange={(e) => setTask(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.button}>Add +</button>
        </div>

        {/* Filter Buttons */}
        <div style={styles.filterRow}>
          <button
            onClick={() => setFilter("all")}
            style={{ ...styles.filterBtn, background: filter === "all" ? "#238636" : "#30363d" }}
          >All</button>
          <button
            onClick={() => setFilter("pending")}
            style={{ ...styles.filterBtn, background: filter === "pending" ? "#238636" : "#30363d" }}
          >Pending</button>
          <button
            onClick={() => setFilter("completed")}
            style={{ ...styles.filterBtn, background: filter === "completed" ? "#238636" : "#30363d" }}
          >Completed</button>
        </div>

        {/* Task List */}
        <ul style={styles.list}>
          {filteredTasks.length === 0 ? (
            <p style={styles.empty}>No tasks found...</p>
          ) : (
            filteredTasks.map((t) => (
              <li key={t.id} style={styles.listItem}>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleTask(t.id)}
                />
                <span style={{
                  ...styles.taskText,
                  textDecoration: t.completed ? "line-through" : "none",
                  color: t.completed ? "#777" : "#fff",
                }}>{t.name}</span>
                <button onClick={() => deleteTaskFn(t.id)} style={styles.deleteBtn}>✖</button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Footer */}
      <div style={styles.footer}>Developed by Hashim Khan</div>
    </div>
  );
}

/* ---------------- STYLING ---------------- */
const styles = {
  wrapper: { background: "#0d1117", minHeight: "100vh", padding: "40px 0", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  container: { maxWidth: "520px", margin: "0 auto", padding: "25px", borderRadius: "16px", background: "#161b22", color: "#fff", boxShadow: "0 0 20px rgba(0,0,0,0.3)" },
  heading: { textAlign: "center", fontSize: "30px", marginBottom: "20px", color: "#58a6ff" },
  searchInput: { width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #30363d", background: "#0d1117", marginBottom: "15px", color: "#fff", fontSize: "16px" },
  inputBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #30363d", background: "#0d1117", color: "#fff", fontSize: "16px" },
  button: { padding: "12px 20px", background: "#238636", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" },
  filterRow: { display: "flex", justifyContent: "space-between", marginBottom: "20px", gap: "10px" },
  filterBtn: { flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #30363d", color: "#fff", cursor: "pointer", fontSize: "16px" },
  list: { padding: 0, listStyle: "none" },
  listItem: { background: "#21262d", padding: "12px", marginBottom: "10px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid #30363d" },
  taskText: { flex: 1, fontSize: "16px" },
  empty: { textAlign: "center", color: "#777" },
  deleteBtn: { background: "#da3633", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "8px", cursor: "pointer" },
  footer: { textAlign: "center", color: "#aaa", padding: "10px 0", fontSize: "14px" },
};
