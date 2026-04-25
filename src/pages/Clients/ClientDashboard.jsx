import { useNavigate } from "react-router-dom";
function ClientDashboard() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const total = jobs.length;
  const completed = jobs.filter(j => j.status === "Completed").length;
  const active = jobs.filter(j => j.status === "Active").length;
  const pending = jobs.filter(j => j.status === "Pending").length;
 const navigate = useNavigate();
  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>🔥 Dashboard</h2>
          <p style={styles.subText}>Manage your projects efficiently</p>
        </div>

        {/* <button style={styles.primaryBtn}>+ New Job</button> */}
      </div>

      {/* STATS */}
      <div style={styles.grid}>
        <Card title="Total Jobs" value={total} icon="📦" />
        <Card title="Active" value={active} icon="⚡" />
        <Card title="Completed" value={completed} icon="✅" />
        <Card title="Pending" value={pending} icon="⏳" />
      </div>

      {/* QUICK ACTIONS */}
      <div style={styles.actions}>
        <ActionCard onClick={() => navigate("/client/create-job")} title="➕ Create Job" />
        <ActionCard onClick={() => navigate("/client/chat")} title="💬 Chat with Worker" />
        <ActionCard onClick={() => navigate("/client/reports")} title="📊 Reports" />
      </div>

      {/* RECENT JOBS */}
      <div style={styles.section}>
        <h3>Recent Jobs</h3>

        {jobs.slice(0, 4).map(job => (
          <div key={job.id} style={styles.jobCard}>
            <div style={styles.jobInfo}>
              <h4 style={{ margin: 0 }}>{job.title}</h4>
              <p style={styles.desc}>{job.description}</p>
            </div>

            <span style={{
              ...styles.badge,
              background:
                job.status === "Completed"
                  ? "#22c55e"
                  : job.status === "Active"
                  ? "#ff7a00"
                  : "#f59e0b"
            }}>
              {job.status}
            </span>
          </div>
        ))}

        {jobs.length === 0 && <p>No jobs found</p>}
      </div>

    </div>
  );
}

/* 🔹 CARD */
function Card({ title, value, icon }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h4 style={{ margin: "5px 0" }}>{title}</h4>
      <h2 style={{ color: "#ff6a00", margin: 0 }}>{value}</h2>
    </div>
  );
}

/* 🔹 ACTION CARD */
function ActionCard({ title, onClick }) {
  return (
    <div style={styles.actionCard} onClick={onClick}>
      {title}
    </div>
  );
}

/* 🎨 RESPONSIVE STYLES */
const styles = {
  container: {
    padding: "20px",
    background: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  /* HEADER */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "10px"
  },

  subText: {
    color: "#777",
    margin: 0
  },

  primaryBtn: {
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    minWidth: "120px"
  },

  /* STATS GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    marginBottom: "20px"
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #f1f1f1",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    textAlign: "center"
  },

  icon: {
    fontSize: "20px"
  },

  /* ACTIONS */
  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    marginBottom: "20px"
  },

  actionCard: {
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "600",
    cursor: "pointer"
  },

  /* SECTION */
  section: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #eee"
  },

  jobCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
    flexWrap: "wrap",
    gap: "8px"
  },

  jobInfo: {
    flex: 1,
    minWidth: "200px"
  },

  desc: {
    color: "#777",
    margin: 0,
    fontSize: "13px"
  },

  badge: {
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "white"
  }
};

export default ClientDashboard;