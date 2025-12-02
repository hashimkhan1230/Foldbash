import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import "../styles/support.css";

export default function TicketSystem() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tickets"), where("uid", "==", user.uid), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, snap => {
      setTickets(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  const createTicket = async (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;
    setCreating(true);
    await addDoc(collection(db, "tickets"), {
      uid: user.uid,
      title: title.trim(),
      description: desc.trim(),
      status: "open",
      createdAt: serverTimestamp()
    });
    setTitle(""); setDesc("");
    setCreating(false);
  };

  const closeTicket = async (id) => {
    await updateDoc(doc(db, "tickets", id), { status: "closed" });
  };

  if (!user) return <div className="ticket-box">Please login to create tickets.</div>;

  return (
    <div className="ticket-box">
      <h3>Your Tickets</h3>

      <form onSubmit={createTicket} className="ticket-form">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Short title" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe issue" rows={3}></textarea>
        <button type="submit" disabled={creating}>{creating ? "Creating..." : "Create Ticket"}</button>
      </form>

      <div className="ticket-list">
        {tickets.length === 0 && <div className="muted">No tickets yet</div>}
        {tickets.map(t => (
          <div key={t.id} className={`ticket-card ${t.status}`}>
            <div className="ticket-top">
              <strong>{t.title}</strong>
              <span className={`status ${t.status}`}>{t.status}</span>
            </div>
            <p className="ticket-desc">{t.description}</p>
            <div className="ticket-actions">
              {t.status !== "closed" && <button onClick={() => closeTicket(t.id)} className="small">Close</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
