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
          <h2 style={{ margin: 0 }}>Dashboard</h2>
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
    {/* RECENT JOBS */}
<div style={styles.section}>
  <h3 style={styles.sectionTitle}>Recent Jobs</h3>

  {jobs.slice(0, 4).map(job => (
    <div key={job.id} style={styles.recentCard}>

      {/* TOP */}
      <div style={styles.topRow}>
        <h4 style={styles.title}>{job.title}</h4>

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

      {/* DESC */}
      <p style={styles.desc}>{job.description}</p>

      {/* DIVIDER */}
      <div style={styles.divider}></div>

      {/* INFO */}
      <div style={styles.infoRow}>
        <span>💰 {job.budgetMin} - {job.budgetMax}</span>
        <span>⏳ {job.deadline}</span>
        <span>⚡{job.priority}</span>
      </div>

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
  // section: {
  //   background: "#fff",
  //   padding: "15px",
  //   borderRadius: "12px",
  //   border: "1px solid #eee"
  // },
 section: {
  marginTop: "25px"
},

sectionTitle: {
  marginBottom: "12px",
  fontSize: "18px",
  fontWeight: "600"
},

recentCard: {
  background: "#fff",
  padding: "16px",
  borderRadius: "14px",
  marginBottom: "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: "10px" // 🔥 main fix
},

topRow: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px"
},

title: {
  margin: 0,
  fontSize: "15px",
  fontWeight: "600",
  flex: 1
},

desc: {
  margin: 0,
  fontSize: "13px",
  color: "#666",
  lineHeight: "1.5",
  display: "-webkit-box",
  WebkitLineClamp: 2,   // 🔥 2 lines max
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
},

divider: {
  height: "1px",
  background: "#eee"
},

infoRow: {
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  fontSize: "12px",
  color: "#444",
  gap: "8px"
},

badge: {
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "11px",
  whiteSpace: "nowrap"
}
  
};

export default ClientDashboard;