import { useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs")) || [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const saveJobs = (updated) => {
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  const deleteJob = (id) => {
    const updated = jobs.filter(j => j.id !== id);
    saveJobs(updated);
  };

  const updateStatus = (id, status) => {
    const updated = jobs.map(j =>
      j.id === id ? { ...j, status } : j
    );
    saveJobs(updated);
  };

  const startEdit = (job) => {
    setEditingId(job.id);
    setEditForm(job);
  };

  const saveEdit = () => {
    const updated = jobs.map(j =>
      j.id === editingId ? editForm : j
    );
    saveJobs(updated);
    setEditingId(null);
  };

  const filtered = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : job.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>📦 Jobs</h2>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.input}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>

      {/* LIST */}
      {filtered.map(job => (
        <div key={job.id} style={styles.card}>

          {editingId === job.id ? (
            <>
              {/* EDIT MODE */}
              <input
                value={editForm.title}
                onChange={(e)=>setEditForm({...editForm, title:e.target.value})}
                style={styles.input}
              />

              <textarea
                value={editForm.description}
                onChange={(e)=>setEditForm({...editForm, description:e.target.value})}
                style={styles.textarea}
              />

              <div style={styles.grid2}>
                <input
                  value={editForm.budgetMin}
                  onChange={(e)=>setEditForm({...editForm, budgetMin:e.target.value})}
                  placeholder="Min Budget"
                  style={styles.input}
                />

                <input
                  value={editForm.budgetMax}
                  onChange={(e)=>setEditForm({...editForm, budgetMax:e.target.value})}
                  placeholder="Max Budget"
                  style={styles.input}
                />
              </div>

              <input
                type="date"
                value={editForm.deadline}
                onChange={(e)=>setEditForm({...editForm, deadline:e.target.value})}
                style={styles.input}
              />

              <div style={styles.actions}>
                <button onClick={saveEdit} style={styles.btnPrimary}>
                  Save
                </button>

                <button onClick={()=>setEditingId(null)} style={styles.btnDanger}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {/* VIEW MODE */}
              <div style={styles.topRow}>
                <h3 style={styles.title}>{job.title}</h3>

                <span style={styles.badge}>{job.status}</span>
              </div>

              <p style={styles.desc}>{job.description}</p>

              <div style={styles.infoGrid}>
                <div>💰 {job.budgetMin} - {job.budgetMax}</div>
                <div>⏳ {job.deadline}</div>
                <div>🧠 {job.skills}</div>
                <div>🔥 {job.priority}</div>
              </div>

              <div style={styles.actions}>
                <button onClick={()=>updateStatus(job.id,"Active")} style={styles.btnPrimary}>
                  Active
                </button>

                <button onClick={()=>updateStatus(job.id,"Completed")} style={styles.btnSuccess}>
                  Complete
                </button>

                <button onClick={()=>startEdit(job)} style={styles.btnEdit}>
                  Edit
                </button>

                <button onClick={()=>deleteJob(job.id)} style={styles.btnDanger}>
                  Delete
                </button>
              </div>
            </>
          )}

        </div>
      ))}

    </div>
  );
}

/* 🎨 RESPONSIVE UI */
const styles = {
  container: {
    padding: "12px",
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  header: {
    marginBottom: "10px"
  },

  controls: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "15px"
  },

  input: {
    flex: 1,
    minWidth: "140px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "#fff"
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #eee",
    minHeight: "80px"
  },

  card: {
    background: "#fff",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)"
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    alignItems: "center"
  },

  title: {
    margin: 0,
    fontSize: "16px"
  },

  desc: {
    color: "#666",
    fontSize: "14px"
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "8px",
    fontSize: "13px",
    marginTop: "10px",
    color: "#444"
  },

  badge: {
    background: "#ff6a00",
    color: "white",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "12px"
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px"
  },

  btnPrimary: {
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    flex: 1
  },

  btnSuccess: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    flex: 1
  },

  btnEdit: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    flex: 1
  },

  btnDanger: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    flex: 1
  }
};

export default Jobs;