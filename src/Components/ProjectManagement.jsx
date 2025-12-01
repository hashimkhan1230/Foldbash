import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [search, setSearch] = useState("");

  // ---------------- LOAD PROJECTS FROM FIRESTORE ----------------
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const loadedProjects = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setProjects(loadedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // ---------------- ADD PROJECT ----------------
  const addProject = async () => {
    if (!newProject.trim()) return;
    const projectObj = { name: newProject, tasks: [] };

    try {
      const docRef = await addDoc(collection(db, "projects"), projectObj);
      setProjects([...projects, { id: docRef.id, ...projectObj }]);
      setNewProject("");
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  // ---------------- DELETE PROJECT ----------------
  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // ---------------- EDIT PROJECT ----------------
  const editProject = async (projectId, newName) => {
    try {
      await updateDoc(doc(db, "projects", projectId), { name: newName });
      setProjects(
        projects.map((p) => (p.id === projectId ? { ...p, name: newName } : p))
      );
    } catch (error) {
      console.error("Error editing project:", error);
    }
  };

  // ---------------- ADD TASK ----------------
  const addTask = async (projectId, taskName, priority) => {
    if (!taskName.trim()) return;
    const project = projects.find((p) => p.id === projectId);
    const newTask = { id: Date.now().toString(), name: taskName, completed: false, priority };

    const updatedTasks = [...project.tasks, newTask];

    try {
      await updateDoc(doc(db, "projects", projectId), { tasks: updatedTasks });
      setProjects(
        projects.map((p) =>
          p.id === projectId ? { ...p, tasks: updatedTasks } : p
        )
      );
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // ---------------- TOGGLE TASK ----------------
  const toggleTask = async (projectId, taskId) => {
    const project = projects.find((p) => p.id === projectId);
    const updatedTasks = project.tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );

    try {
      await updateDoc(doc(db, "projects", projectId), { tasks: updatedTasks });
      setProjects(
        projects.map((p) =>
          p.id === projectId ? { ...p, tasks: updatedTasks } : p
        )
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  // ---------------- DELETE TASK ----------------
  const deleteTask = async (projectId, taskId) => {
    const project = projects.find((p) => p.id === projectId);
    const updatedTasks = project.tasks.filter((t) => t.id !== taskId);

    try {
      await updateDoc(doc(db, "projects", projectId), { tasks: updatedTasks });
      setProjects(
        projects.map((p) =>
          p.id === projectId ? { ...p, tasks: updatedTasks } : p
        )
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📁 Project Management</h1>

        {/* Add Project */}
        <div style={styles.inputBox}>
          <input
            type="text"
            value={newProject}
            placeholder="New Project Name"
            onChange={(e) => setNewProject(e.target.value)}
            style={styles.input}
          />
          <button onClick={addProject} style={styles.button}>Add Project</button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search projects or tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ ...styles.input, marginBottom: "15px" }}
        />

        {/* Projects List */}
        {projects.length === 0 ? (
          <p style={styles.empty}>No projects yet...</p>
        ) : (
          projects
            .filter(
              (p) =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.tasks.some((t) =>
                  t.name.toLowerCase().includes(search.toLowerCase())
                )
            )
            .map((project) => (
              <div key={project.id} style={styles.projectCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={styles.projectName}>{project.name}</h2>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => {
                        const newName = prompt("Enter new project name", project.name);
                        if (newName) editProject(project.id, newName);
                      }}
                      style={styles.smallButton}
                    >✏️</button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      style={styles.deleteBtn}
                    >🗑️</button>
                  </div>
                </div>

                {/* Add Task */}
                <AddTask project={project} addTask={addTask} />

                {/* Task List */}
                <ul style={styles.list}>
                  {project.tasks.length === 0 ? (
                    <p style={styles.empty}>No tasks...</p>
                  ) : (
                    project.tasks.map((task) => (
                      <li key={task.id} style={styles.listItem}>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(project.id, task.id)}
                        />
                        <span style={{
                          ...styles.taskText,
                          textDecoration: task.completed ? "line-through" : "none",
                          color: task.completed ? "#777" : "#fff",
                        }}>
                          {task.name}{" "}
                          {task.priority && (
                            <span style={{
                              color: task.priority === "High" ? "#ff4c4c" :
                                     task.priority === "Medium" ? "#ffae42" : "#58ff42",
                              fontWeight: "bold",
                            }}>
                              [{task.priority}]
                            </span>
                          )}
                        </span>
                        <button
                          onClick={() => deleteTask(project.id, task.id)}
                          style={styles.deleteBtn}
                        >✖</button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))
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

// ---------------- AddTask Component ----------------
const AddTask = ({ project, addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");

  return (
    <div style={{ display: "flex", marginBottom: "10px", gap: "10px" }}>
      <input
        type="text"
        placeholder="New Task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        style={{ flex: 2, padding: "10px", borderRadius: "8px" }}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ flex: 1, padding: "10px", borderRadius: "8px" }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={() => { addTask(project.id, taskName, priority); setTaskName(""); }}
        style={{ flex: 1, padding: "10px", borderRadius: "8px", background: "#238636", color: "#fff", border: "none", cursor: "pointer" }}
      >
        Add Task
      </button>
    </div>
  );
};

// ---------------- STYLING ----------------
const styles = {
  wrapper: { background: "#0d1117", minHeight: "100vh", padding: "40px 0" },
  container: { maxWidth: "700px", margin: "0 auto", padding: "25px", borderRadius: "16px", background: "#161b22", color: "#fff", boxShadow: "0 0 20px rgba(0,0,0,0.3)" },
  heading: { textAlign: "center", fontSize: "30px", marginBottom: "20px", color: "#58a6ff" },
  inputBox: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #30363d", background: "#0d1117", color: "#fff", fontSize: "16px" },
  button: { padding: "12px 20px", background: "#238636", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "16px" },
  smallButton: { padding: "6px 10px", borderRadius: "8px", background: "#58a6ff", color: "#fff", border: "none", cursor: "pointer" },
  projectCard: { background: "#21262d", padding: "20px", borderRadius: "12px", marginBottom: "20px", border: "1px solid #30363d" },
  projectName: { marginBottom: "10px", color: "#58a6ff" },
  list: { padding: 0, listStyle: "none" },
  listItem: { background: "#161b22", padding: "10px", marginBottom: "8px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid #30363d" },
  taskText: { flex: 1, fontSize: "16px" },
  empty: { textAlign: "center", color: "#777", fontStyle: "italic" },
  deleteBtn: { background: "#da3633", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "8px", cursor: "pointer" },
  footer: { textAlign: "center", color: "#aaa", padding: "15px 0", marginTop: "20px", fontSize: "14px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" },
  githubLink: { display: "inline-block", verticalAlign: "middle", transition: "transform 0.2s" },
};
