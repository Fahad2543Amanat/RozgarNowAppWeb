import { useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs")) || [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // const [selectedJobs, setSelectedJobs] = useState([]);
  const [pinned, setPinned] = useState([]);

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
      j.id === id ? { ...j, status, updatedAt: Date.now() } : j
    );
    saveJobs(updated);
  };

  const startEdit = (job) => {
    setEditingId(job.id);
    setEditForm(job);
  };

  const saveEdit = () => {
    const updated = jobs.map(j =>
      j.id === editingId ? { ...editForm, updatedAt: Date.now() } : j
    );
    saveJobs(updated);
    setEditingId(null);
  };

  const togglePin = (id) => {
    setPinned(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const filtered = jobs.filter(job => {
    const matchSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : job.status === filter;
    return matchSearch && matchFilter;
  });

  const sortedJobs = [...filtered].sort((a, b) => {
    const aPinned = pinned.includes(a.id) ? 1 : 0;
    const bPinned = pinned.includes(b.id) ? 1 : 0;
    return bPinned - aPinned;
  });

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>📦 Jobs Management</h2>
      </div>

      {/* SEARCH / FILTER */}
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

      {/* JOB LIST */}
      {sortedJobs.map(job => (
        <div key={job.id} style={styles.card}>

          {/* TOP */}
          <div style={styles.topRow}>
            <h3 style={styles.title}>
              {job.title} {pinned.includes(job.id) && "📌"}
            </h3>

            <span style={{
              ...styles.badge,
              background:
                job.status === "Completed"
                  ? "#16a34a"
                  : job.status === "Active"
                  ? "#ff7a00"
                  : "#f59e0b"
            }}>
              {job.status}
            </span>
          </div>

          <p style={styles.desc}>{job.description}</p>

          {/* INFO */}
          <div style={styles.info}>
            <span>💰 {job.budgetMin} - {job.budgetMax}</span>
            <span>⏳ {job.deadline}</span>
            <span>🔥 {job.priority}</span>
          </div>

          {/* ACTIONS */}
          <div style={styles.actions}>

            <button onClick={() => updateStatus(job.id, "Active")} style={styles.btnOrange}>
              Active
            </button>

            <button onClick={() => updateStatus(job.id, "Completed")} style={styles.btnGreen}>
              Complete
            </button>

            <button onClick={() => togglePin(job.id)} style={styles.btnBlue}>
              Pin
            </button>

            <button onClick={() => startEdit(job)} style={styles.btnSoftBlue}>
              Edit
            </button>

            <button onClick={() => deleteJob(job.id)} style={styles.btnSoftRed}>
              Delete
            </button>

          </div>

          {/* EDIT MODE */}
          {editingId === job.id && (
            <div style={styles.editBox}>

              <input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                style={styles.input}
                placeholder="Job Title"
              />

              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                style={styles.input}
                placeholder="Description"
              />

              <div style={styles.grid2}>
                <input
                  value={editForm.budgetMin}
                  onChange={(e) => setEditForm({ ...editForm, budgetMin: e.target.value })}
                  style={styles.input}
                  placeholder="Min Budget"
                />

                <input
                  value={editForm.budgetMax}
                  onChange={(e) => setEditForm({ ...editForm, budgetMax: e.target.value })}
                  style={styles.input}
                  placeholder="Max Budget"
                />
              </div>

              <div style={styles.actions}>
                <button onClick={saveEdit} style={styles.btnOrange}>Save</button>
                <button onClick={() => setEditingId(null)} style={styles.btnSoftRed}>Cancel</button>
              </div>

            </div>
          )}

        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: 16,
    background: "#f9fafb",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  header: {
    marginBottom: 15
  },

  controls: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
    flexWrap: "wrap"
  },

  input: {
    flex: 1,
    minWidth: "140px",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff"
  },

  card: {
    background: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    overflow: "hidden"
  },

  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10
  },

  title: {
    margin: 0,
    fontSize: "16px"
  },

  desc: {
    color: "#6b7280",
    fontSize: 13
  },

  info: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 12,
    marginTop: 8,
    color: "#374151"
  },

  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 12
  },

  editBox: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 10
  },

  badge: {
    padding: "4px 10px",
    borderRadius: 20,
    color: "#fff",
    fontSize: 11
  },

  /* BUTTONS */
  btnOrange: {
    background: "#ff7a00",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  btnGreen: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  btnBlue: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  btnSoftBlue: {
    background: "#eff6ff",
    color: "#2563eb",
    border: "1px solid #bfdbfe",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  btnSoftRed: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  }
};

export default Jobs;