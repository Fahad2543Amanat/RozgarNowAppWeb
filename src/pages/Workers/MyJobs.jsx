/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const my = JSON.parse(localStorage.getItem("myJobs")) || [];
    setJobs(my);
  }, []);

  // 🔄 complete job
  const completeJob = (id) => {
    const updated = jobs.map(j =>
      j.id === id ? { ...j, status: "Completed", progress: 100 } : j
    );

    setJobs(updated);
    localStorage.setItem("myJobs", JSON.stringify(updated));
  };

  // 🔍 filter logic
  const filteredJobs = jobs.filter(job => {
    if (filter === "All") return true;
    return job.status === filter;
  });

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>🧾 My Jobs</h2>
        <p style={styles.subText}>Track your work & progress</p>
      </div>

      {/* FILTERS */}
      <div style={styles.filters}>
        <button onClick={() => setFilter("All")} style={styles.filterBtn}>All</button>
        <button onClick={() => setFilter("Pending")} style={styles.filterBtn}>Pending</button>
        <button onClick={() => setFilter("Completed")} style={styles.filterBtn}>Completed</button>
      </div>

      {/* JOB LIST */}
      <div style={styles.grid}>

        {filteredJobs.length === 0 ? (
          <p style={styles.empty}>🚀 No jobs found</p>
        ) : (
          filteredJobs.map(job => (
            <div key={job.id} style={styles.card}>

              {/* TITLE */}
              <h3 style={styles.jobTitle}>{job.title}</h3>

              {/* STATUS */}
              <span style={{
                ...styles.badge,
                background: job.status === "Completed" ? "#22c55e" : "#ff6a00"
              }}>
                {job.status}
              </span>

              {/* DETAILS */}
              <p style={styles.desc}>{job.description}</p>

              <div style={styles.infoBox}>
                👤 Client: {job.clientName || "Unknown"} <br />
                📍 Location: {job.location || "Remote"} <br />
                💰 Bid: {job.bid || "Market Price"}
              </div>

              {/* PROGRESS */}
              <div style={styles.progressBar}>
                <div
                  style={{
                    width: job.progress + "%",
                    height: "100%",
                    background: "#ff9f1c"
                  }}
                />
              </div>

              <small>{job.progress || 0}% Completed</small>

              {/* ACTION */}
              {job.status !== "Completed" && (
                <button
                  onClick={() => completeJob(job.id)}
                  style={styles.completeBtn}
                >
                  Mark Complete
                </button>
              )}

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

  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },

  filterBtn: {
    padding: "8px 12px",
    border: "1px solid #ff6a00",
    background: "#fff",
    color: "#ff6a00",
    borderRadius: "8px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "12px"
  },

  card: {
    background: "#fff",
    border: "1px solid #ffe0cc",
    borderRadius: "14px",
    padding: "15px",
    boxShadow: "0 6px 20px rgba(255,106,0,0.08)"
  },

  jobTitle: {
    margin: 0,
    color: "#ff6a00"
  },

  desc: {
    fontSize: "13px",
    color: "#555",
    margin: "8px 0"
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

  completeBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  empty: {
    textAlign: "center",
    color: "#999"
  }
};

export default MyJobs;