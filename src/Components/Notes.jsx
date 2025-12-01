// src/components/NotesFirebase.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export default function NotesFirebase() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load notes from Firestore in real-time
  useEffect(() => {
    const q = collection(db, "notes");
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
      setNotes(list);
    });

    return () => unsub();
  }, []);

  const addNote = async () => {
    const text = newNote.trim();
    if (!text) return;
    try {
      await addDoc(collection(db, "notes"), {
        text,
        createdAt: serverTimestamp(),
      });
      setNewNote("");
    } catch (err) {
      console.error(err);
      alert("Failed to add note");
    }
  };

  const editNote = async (id, currentText) => {
    const newText = window.prompt("Edit note:", currentText);
    if (!newText) return;
    try {
      await updateDoc(doc(db, "notes", id), { text: newText });
    } catch (err) {
      console.error(err);
      alert("Failed to edit note");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📝 Notes</h1>

        {/* Add note */}
        <div style={styles.inputRow}>
          <input
            placeholder="Write a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            style={styles.input}
          />
          <button onClick={addNote} style={styles.button}>Add Note</button>
        </div>

        {/* Notes list */}
        {notes.length === 0 ? (
          <p style={styles.empty}>No notes yet. Start writing!</p>
        ) : (
          <ul style={styles.list}>
            {notes.map((n) => (
              <li key={n.id} style={styles.noteItem}>
                <div style={{ flex: 1 }}>{n.text}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => editNote(n.id, n.text)} style={styles.smallBtn}>Edit</button>
                  <button onClick={() => deleteNote(n.id)} style={styles.deleteBtn}>✖</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={styles.footer}>Developed by <strong>Hashim Khan</strong></div>
    </div>
  );
}

// ---------------- Styles ----------------
const styles = {
  wrapper: { background: "#0d1117", minHeight: "100vh", padding: 40, color: "#fff" },
  container: { width: "100%", maxWidth: 700, margin: "0 auto", background: "#161b22", borderRadius: 12, padding: 22, boxShadow: "0 8px 28px rgba(0,0,0,0.6)" },
  heading: { textAlign: "center", color: "#58a6ff", fontSize: 28, marginBottom: 16 },
  inputRow: { display: "flex", gap: 10, marginBottom: 12 },
  input: { flex: 1, padding: 10, borderRadius: 8, border: "1px solid #30363d", background: "#0d1117", color: "#fff" },
  button: { padding: "10px 14px", background: "#238636", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer" },
  list: { listStyle: "none", padding: 0, marginTop: 10 },
  noteItem: { display: "flex", justifyContent: "space-between", alignItems: "center", background: "#21262d", padding: 12, borderRadius: 8, marginBottom: 8 },
  smallBtn: { padding: "6px 10px", background: "#58a6ff", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer" },
  deleteBtn: { padding: "6px 10px", background: "#da3633", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer" },
  empty: { textAlign: "center", color: "#777", padding: 20 },
  footer: { textAlign: "center", color: "#aaa", marginTop: 18 },
};
