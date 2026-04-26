/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

function Earnings() {
  const [jobs, setJobs] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const myJobs = JSON.parse(localStorage.getItem("myJobs")) || [];

    setJobs(myJobs);

    // 💰 EARNINGS CALCULATION LOGIC
    const completedJobs = myJobs.filter(j => j.status === "Completed");

    const total = completedJobs.reduce((acc, job) => {
      const bid = Number(job.bid);

      // ✅ priority: worker bid → else budgetMin/max avg
      const fallback =
        (Number(job.budgetMin || 0) + Number(job.budgetMax || 0)) / 2;

      const earning = bid > 0 ? bid : fallback;

      return acc + earning;
    }, 0);

    setTotalEarnings(total);
  }, []);

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>💰 Earnings Dashboard</h2>
        <p style={styles.subText}>Your completed work income overview</p>
      </div>

      {/* SUMMARY CARD */}
      <div style={styles.summaryCard}>
        <h1 style={styles.total}>Rs.{totalEarnings.toFixed(2)}</h1>
        <p>Total Earnings</p>
      </div>

      {/* JOB LIST */}
      <h3 style={styles.sectionTitle}>Completed Jobs Breakdown</h3>

      <div style={styles.grid}>

        {jobs.filter(j => j.status === "Completed").length === 0 ? (
          <p style={styles.empty}>No completed jobs yet</p>
        ) : (
          jobs
            .filter(j => j.status === "Completed")
            .map(job => {
              const bid = Number(job.bid);
              const fallback =
                (Number(job.budgetMin || 0) + Number(job.budgetMax || 0)) / 2;

              const earning = bid > 0 ? bid : fallback;

              return (
                <div key={job.id} style={styles.card}>

                  <h3 style={styles.jobTitle}>{job.title}</h3>

                  <p style={styles.desc}>{job.description}</p>

                  <div style={styles.infoBox}>
                    👤 Client: {job.clientName || "Unknown"} <br />
                    📍 Location: {job.location || "Remote"} <br />
                    💰 Earned: <b>Rs.{earning}</b>
                  </div>

                  <span style={styles.badge}>Completed</span>

                </div>
              );
            })
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

  summaryCard: {
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    marginBottom: "20px",
    boxShadow: "0 8px 20px rgba(255,106,0,0.25)"
  },

  total: {
    margin: 0,
    fontSize: "28px"
  },

  sectionTitle: {
    marginBottom: "10px",
    color: "#333"
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

  infoBox: {
    background: "#fff7f0",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "12px",
    marginTop: "10px"
  },

  badge: {
    display: "inline-block",
    marginTop: "10px",
    background: "#22c55e",
    color: "white",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px"
  },

  empty: {
    textAlign: "center",
    color: "#999"
  }
};

export default Earnings;