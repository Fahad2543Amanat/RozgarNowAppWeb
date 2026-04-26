import { useNavigate } from "react-router-dom";

function WorkerDashboard() {
  const navigate = useNavigate();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const myJobs = JSON.parse(localStorage.getItem("myJobs")) || [];

  const totalJobs = jobs.length;
  const appliedJobs = myJobs.length;
  const completedJobs = myJobs.filter(j => j.status === "Completed").length;
  const activeJobs = myJobs.filter(j => j.status !== "Completed").length;

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Worker Dashboard</h2>
          <p style={styles.subText}>Professional overview of your work</p>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.grid}>
        <GlassCard icon="📦" title="Total Jobs" value={totalJobs} />
        <GlassCard icon="📨" title="Applied" value={appliedJobs} />
        <GlassCard icon="⚡" title="Active" value={activeJobs} />
        <GlassCard icon="✅" title="Completed" value={completedJobs} />
      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>
        <ActionCard title="📦 Browse Jobs" onClick={() => navigate("/worker/jobs")} />
        <ActionCard title="🧾 My Jobs" onClick={() => navigate("/worker/my-jobs")} />
        <ActionCard title="💬 Chat" onClick={() => navigate("/worker/chat")} />
        <ActionCard title="💰 Earnings" onClick={() => navigate("/worker/earnings")} />
      </div>

      {/* RECENT JOBS */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Jobs</h3>

        {jobs.slice(0, 3).map(job => (
          <div key={job.id} style={styles.glassCard}>
            <h4 style={styles.cardTitle}>{job.title}</h4>
            <p style={styles.cardText}>{job.description}</p>
          </div>
        ))}
      </div>

      {/* MY WORK */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>My Work</h3>

        {myJobs.slice(0, 3).map(job => (
          <div key={job.id} style={styles.glassCard}>
            <h4 style={styles.cardTitle}>{job.title}</h4>
            <p style={styles.cardText}>Status: {job.status}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* 🔹 GLASS CARD */
function GlassCard({ icon, title, value }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.icon}>{icon}</div>
      <h4 style={styles.statTitle}>{title}</h4>
      <h2 style={styles.statValue}>{value}</h2>
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

/* 🎨 PREMIUM GLASS STYLES */
const styles = {
  container: {
    padding: "25px",
    minHeight: "100vh",
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #fff2d7, #ffbb00)",
    color: "white"
  },

  header: {
    marginBottom: "20px"
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color :"#000000",
  },

  subText: {
    margin: 0,
    color: "#000000",
    fontSize: "13px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "15px",
    marginBottom: "25px",
    
  },

  /* 🌫 GLASS CARD */
  statCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderRadius: "15px",
    padding: "18px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)"
  },

  icon: {
    fontSize: "22px"
  },

  statTitle: {
    margin: "6px 0",
    fontSize: "13px",
    color: "#1a1a1a"
  },

  statValue: {
    margin: 0,
    color: "#ff9f1c"
  },

  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    marginBottom: "25px"
  },

  actionCard: {
    background: "linear-gradient(135deg, #ff6a00, #ff9f1c)",
    padding: "14px",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "600",
    cursor: "pointer",
    color: "white",
    boxShadow: "0 8px 20px rgba(255,106,0,0.25)"
  },

  section: {
    marginTop: "20px"
  },

  sectionTitle: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#000000"
  },

  /* 🌫 GLASS LIST CARD */
  glassCard: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "1px solid rgba(255,255,255,0.1)"
  },

  cardTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color :"#ff6a00"
  },

  cardText: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "#474747"
  }
};

export default WorkerDashboard;