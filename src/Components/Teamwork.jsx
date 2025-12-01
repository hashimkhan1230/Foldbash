import React, { useState, useEffect } from "react";
import { db } from "../firebase";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export default function Teamwork() {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [role, setRole] = useState("");
  const [sortType, setSortType] = useState("az");

  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  // -----------------------
  // FETCH MEMBERS FROM FIRESTORE
  // -----------------------
  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "members"));
      const loadedMembers = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setMembers(loadedMembers);
    };

    fetchMembers();
  }, []);

  // -----------------------
  // ADD MEMBER
  // -----------------------
  const addMember = async () => {
    if (!newMember.trim()) return;
    try {
      const docRef = await addDoc(collection(db, "members"), {
        name: newMember,
        role: role || "Member",
        leader: members.length === 0,
        tasks: [],
        notes: "",
        createdAt: new Date(),
      });

      setMembers([
        ...members,
        {
          id: docRef.id,
          name: newMember,
          role: role || "Member",
          leader: members.length === 0,
          tasks: [],
          notes: "",
        },
      ]);

      setNewMember("");
      setRole("");
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  // -----------------------
  // ADD TASK TO MEMBER
  // -----------------------
  const addTask = async (memberId) => {
    if (!taskText.trim()) return;

    const memberRef = doc(db, "members", memberId);
    const member = members.find((m) => m.id === memberId);

    const newTask = {
      id: Date.now(),
      name: taskText,
      completed: false,
      priority,
      deadline,
    };

    try {
      await updateDoc(memberRef, {
        tasks: [...member.tasks, newTask],
      });

      setMembers(
        members.map((m) =>
          m.id === memberId
            ? { ...m, tasks: [...m.tasks, newTask] }
            : m
        )
      );

      setTaskText("");
      setDeadline("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // -----------------------
  // TOGGLE TASK COMPLETION
  // -----------------------
  const toggleTask = async (memberId, taskId) => {
    const memberRef = doc(db, "members", memberId);
    const member = members.find((m) => m.id === memberId);

    const updatedTasks = member.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );

    try {
      await updateDoc(memberRef, { tasks: updatedTasks });
      setMembers(
        members.map((m) =>
          m.id === memberId ? { ...m, tasks: updatedTasks } : m
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // -----------------------
  // DELETE TASK
  // -----------------------
  const deleteTask = async (memberId, taskId) => {
    const memberRef = doc(db, "members", memberId);
    const member = members.find((m) => m.id === memberId);

    const updatedTasks = member.tasks.filter((t) => t.id !== taskId);

    try {
      await updateDoc(memberRef, { tasks: updatedTasks });
      setMembers(
        members.map((m) =>
          m.id === memberId ? { ...m, tasks: updatedTasks } : m
        )
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // -----------------------
  // DELETE MEMBER
  // -----------------------
  const deleteMember = async (memberId) => {
    try {
      await deleteDoc(doc(db, "members", memberId));
      setMembers(members.filter((m) => m.id !== memberId));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // -----------------------
  // SORT MEMBERS
  // -----------------------
  const sortMembers = () => {
    let sorted = [...members];
    if (sortType === "az")
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sortType === "za")
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sortType === "most") sorted.sort((a, b) => b.tasks.length - a.tasks.length);
    if (sortType === "least") sorted.sort((a, b) => a.tasks.length - b.tasks.length);
    return sorted;
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>👥 Teamwork Pro Dashboard</h1>

        {/* Member Input */}
        <div style={styles.inputRow}>
          <input
            type="text"
            value={newMember}
            placeholder="Enter member name..."
            onChange={(e) => setNewMember(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            value={role}
            placeholder="Role (Developer / Designer / Manager)"
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
          />
          <button onClick={addMember} style={styles.button}>
            Add Member
          </button>
        </div>

        {/* Sorting */}
        <div style={styles.sortRow}>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            style={styles.select}
          >
            <option value="az">Sort: A → Z</option>
            <option value="za">Sort: Z → A</option>
            <option value="most">Most Tasks</option>
            <option value="least">Least Tasks</option>
          </select>
        </div>

        {/* Members List */}
        {sortMembers().map((member) => {
          const completedTasks = member.tasks.filter((t) => t.completed).length;
          const progressPercent = member.tasks.length
            ? Math.round((completedTasks / member.tasks.length) * 100)
            : 0;

          return (
            <div key={member.id} style={styles.memberCard}>
              {/* Header */}
              <div style={styles.memberHeader}>
                <div style={styles.avatar}>
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={styles.memberName}>
                    {member.name}{" "}
                    {member.leader && <span style={styles.leaderBadge}>⭐ Leader</span>}
                  </h3>
                  <p style={styles.roleText}>{member.role}</p>
                </div>
                <button onClick={() => deleteMember(member.id)} style={styles.deleteBtn}>
                  ✖
                </button>
              </div>

              {/* Task Input */}
              <div style={styles.taskRow}>
                <input
                  type="text"
                  placeholder="New Task..."
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  style={styles.input}
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={styles.selectSmall}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  style={styles.selectSmall}
                />
                <button onClick={() => addTask(member.id)} style={styles.buttonSmall}>
                  +
                </button>
              </div>

              {/* Task List */}
              <ul style={styles.list}>
                {member.tasks.map((task) => (
                  <li key={task.id} style={styles.taskItem}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(member.id, task.id)}
                    />
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          textDecoration: task.completed ? "line-through" : "none",
                          color: task.completed ? "#777" : "#fff",
                        }}
                      >
                        {task.name}
                      </span>
                      <div style={styles.metaRow}>
                        <span style={{ color: "#58a6ff" }}>Priority: {task.priority}</span>
                        {task.deadline && <span style={{ color: "#a3a3a3" }}>Due: {task.deadline}</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(member.id, task.id)}
                      style={styles.deleteBtn}
                    >
                      ✖
                    </button>
                  </li>
                ))}
              </ul>

              {/* Progress Bar */}
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${progressPercent}%`,
                  }}
                />
              </div>
              <p style={styles.progressText}>Progress: {progressPercent}%</p>
            </div>
          );
        })}
      </div>
      <p style={styles.footer}>
        Developed by <strong>Hashim Khan</strong>
      </p>
    </div>
  );
}

// ------------------- STYLES -------------------
const styles = {
  wrapper: { background: "#0d1117", minHeight: "100vh", padding: "40px 0", color: "#fff" },
  container: { width: "90%", maxWidth: "800px", margin: "0 auto", background: "#161b22", padding: "25px", borderRadius: "16px" },
  heading: { textAlign: "center", color: "#58a6ff", fontSize: "32px", marginBottom: "20px" },
  inputRow: { display: "flex", gap: "10px", marginBottom: "20px" },
  taskRow: { display: "flex", gap: "10px", marginBottom: "15px" },
  sortRow: { display: "flex", justifyContent: "flex-end", marginBottom: "20px" },
  input: { flex: 1, background: "#0d1117", border: "1px solid #30363d", padding: "10px", borderRadius: "8px", color: "#fff" },
  button: { padding: "10px 18px", background: "#238636", border: "none", borderRadius: "10px", color: "#fff", cursor: "pointer" },
  buttonSmall: { padding: "10px 14px", background: "#238636", border: "none", borderRadius: "10px", color: "#fff", cursor: "pointer" },
  memberCard: { background: "#21262d", borderRadius: "12px", padding: "15px", marginBottom: "20px", border: "1px solid #30363d" },
  deleteBtn: { background: "#da3633", border: "none", borderRadius: "8px", padding: "5px 10px", color: "#fff", cursor: "pointer" },
  memberHeader: { display: "flex", alignItems: "center", marginBottom: "15px" },
  avatar: { width: "45px", height: "45px", borderRadius: "50%", background: "#30363d", color: "#fff", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px" },
  memberName: { fontSize: "20px", marginBottom: "5px" },
  roleText: { fontSize: "14px", color: "#aaa" },
  leaderBadge: { background: "#f0c420", padding: "3px 8px", borderRadius: "6px", fontSize: "12px", color: "#000" },
  list: { padding: 0, listStyle: "none" },
  taskItem: { display: "flex", gap: "10px", background: "#161b22", padding: "10px", borderRadius: "8px", border: "1px solid #30363d", marginBottom: "10px" },
  select: { background: "#0d1117", border: "1px solid #30363d", padding: "10px", borderRadius: "8px", color: "#fff" },
  selectSmall: { background: "#0d1117", border: "1px solid #30363d", padding: "10px", borderRadius: "8px", color: "#fff" },
  progressBar: { width: "100%", height: "10px", background: "#30363d", borderRadius: "10px", marginTop: "10px" },
  progressFill: { height: "100%", background: "#238636", borderRadius: "10px" },
  progressText: { textAlign: "right", color: "#aaa", fontSize: "14px" },
  metaRow: { fontSize: "12px", marginTop: "3px", display: "flex", gap: "10px" },
  footer: { marginTop: "30px", textAlign: "center", color: "#aaa" },
};
