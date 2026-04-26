/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const myJobs = JSON.parse(localStorage.getItem("myJobs")) || [];

    // 🧠 convert jobs → tasks system
    const generatedTasks = myJobs.map(job => ({
      ...job,
      taskId: job.id,
      taskTitle: job.title,
      status: job.status || "Pending",
      progress: job.progress || 0
    }));

    setTasks(generatedTasks);
  }, []);

  // 🔄 UPDATE TASK STATUS
  const updateStatus = (id, status) => {
    const updated = tasks.map(task =>
      task.taskId === id ? { ...task, status } : task
    );

    setTasks(updated);

    // sync with myJobs
    localStorage.setItem("myJobs", JSON.stringify(updated));
  };

  // 📊 UPDATE PROGRESS
  const updateProgress = (id, value) => {
    const updated = tasks.map(task =>
      task.taskId === id ? { ...task, progress: value } : task
    );

    setTasks(updated);

    localStorage.setItem("myJobs", JSON.stringify(updated));
  };

  // 🔍 FILTER
  const filteredTasks = tasks.filter(task => {
    const matchSearch = task.taskTitle
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ? true : task.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>📝 My Tasks</h2>
        <p style={styles.subText}>Track and manage your job tasks</p>
      </div>

      {/* SEARCH + FILTER */}
      <div style={styles.topBar}>
        <input
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={styles.select}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* TASK LIST */}
      <div style={styles.grid}>

        {filteredTasks.length === 0 ? (
          <p style={styles.empty}>No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task.taskId} style={styles.card}>

              {/* TITLE */}
              <h3 style={styles.taskTitle}>{task.taskTitle}</h3>

              {/* STATUS BADGE */}
              <span style={{
                ...styles.badge,
                background:
                  task.status === "Completed"
                    ? "#22c55e"
                    : task.status === "In Progress"
                    ? "#ff9f1c"
                    : "#ff6a00"
              }}>
                {task.status}
              </span>

              {/* INFO */}
              <div style={styles.infoBox}>
                👤 {task.clientName || "Client"} <br />
                📍 {task.location || "Remote"} <br />
                💰 Bid: {task.bid || "Not Set"}
              </div>

              {/* PROGRESS */}
              <div style={styles.progressBar}>
                <div
                  style={{
                    width: task.progress + "%",
                    height: "100%",
                    background: "#ff9f1c"
                  }}
                />
              </div>

              <small>{task.progress}% completed</small>

              {/* SLIDER */}
              <input
                type="range"
                min="0"
                max="100"
                value={task.progress}
                onChange={(e) =>
                  updateProgress(task.taskId, Number(e.target.value))
                }
                style={{ width: "100%" }}
              />

              {/* ACTIONS */}
              <div style={styles.actions}>

                {task.status !== "Completed" && (
                  <button
                    onClick={() => updateStatus(task.taskId, "Completed")}
                    style={styles.completeBtn}
                  >
                    ✔ Complete
                  </button>
                )}

                {task.status === "Pending" && (
                  <button
                    onClick={() => updateStatus(task.taskId, "In Progress")}
                    style={styles.progressBtn}
                  >
                    ⚡ Start
                  </button>
                )}

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

/* 🎨 ORANGE + WHITE THEME */
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    minHeight: "100vh",
    background: "#fff"
  },

  header: {
    marginBottom: "15px"
  },

  title: {
    margin: 0,
    color: "#ff6a00"
  },

  subText: {
    margin: "5px 0",
    color: "#666",
    fontSize: "13px"
  },

  topBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    flexWrap: "wrap"
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "8px"
  },

  select: {
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "8px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "12px"
  },

  card: {
    background: "#fff",
    border: "1px solid #ffe0cc",
    padding: "15px",
    borderRadius: "14px",
    boxShadow: "0 6px 20px rgba(255,106,0,0.08)"
  },

  taskTitle: {
    margin: 0,
    color: "#ff6a00"
  },

  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "11px",
    marginTop: "5px"
  },

  infoBox: {
    background: "#fff7f0",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "12px",
    marginTop: "10px"
  },

  progressBar: {
    height: "6px",
    background: "#eee",
    borderRadius: "10px",
    overflow: "hidden",
    marginTop: "10px"
  },

  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "10px"
  },

  completeBtn: {
    flex: 1,
    padding: "8px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px"
  },

  progressBtn: {
    flex: 1,
    padding: "8px",
    background: "#ff9f1c",
    color: "white",
    border: "none",
    borderRadius: "8px"
  },

  empty: {
    textAlign: "center",
    color: "#999"
  }
};

export default Tasks;