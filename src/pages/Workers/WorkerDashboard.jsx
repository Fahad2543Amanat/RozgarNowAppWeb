import { useNavigate } from "react-router-dom";

function WorkerDashboard() {
  const navigate = useNavigate();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const myJobs = JSON.parse(localStorage.getItem("myJobs")) || [];

  const totalJobs = jobs.length;
  const appliedJobs = myJobs.length;
  const completedJobs = myJobs.filter(j => j.status === "Completed").length;
  const activeJobs = myJobs.filter(j => j.status !== "Completed").length;

  // 💰 EARNINGS LOGIC (same as Earnings page)
  const earnings = myJobs
    .filter(j => j.status === "Completed")
    .reduce((acc, job) => {
      const bid = Number(job.bid);

      const fallback =
        (Number(job.budgetMin || 0) + Number(job.budgetMax || 0)) / 2;

      const earning = bid > 0 ? bid : fallback;

      return acc + earning;
    }, 0);

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Worker Dashboard</h2>
          <p style={styles.subText}>Professional overview of your work</p>
        </div>
      </div>

      {/* STATS (CLIENT STYLE CARDS) */}
      <div style={styles.grid}>
        <Card title="Total Jobs" value={totalJobs} icon="📦" />
        <Card title="Applied Jobs" value={appliedJobs} icon="📨" />
        <Card title="Active Jobs" value={activeJobs} icon="⚡" />
        <Card title="Completed Jobs" value={completedJobs} icon="✅" />
        <Card title="Earnings" value={`Rs ${earnings}`} icon="💰" />
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

        {jobs.slice(0, 4).map(job => (
          <div key={job.id} style={styles.recentCard}>
            <h4 style={styles.jobTitle}>{job.title}</h4>
            <p style={styles.desc}>{job.description}</p>
          </div>
        ))}
      </div>

      {/* MY WORK */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>My Work</h3>

        {myJobs.slice(0, 4).map(job => (
          <div key={job.id} style={styles.recentCard}>
            <h4 style={styles.jobTitle}>{job.title}</h4>
            <p style={styles.desc}>Status: {job.status}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

/* =========================
   REUSABLE CARD
========================= */
function Card({ title, value, icon }) {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h4 style={styles.cardTitle}>{title}</h4>
      <h2 style={styles.cardValue}>{value}</h2>
    </div>
  );
}

/* =========================
   ACTION CARD
========================= */
function ActionCard({ title, onClick }) {
  return (
    <div style={styles.actionCard} onClick={onClick}>
      {title}
    </div>
  );
}

/* =========================
   STYLES (CLIENT STYLE MATCHED)
========================= */
const styles = {
  container: {
    padding: "20px",
    background: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  header: {
    marginBottom: "20px"
  },

  title: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#ff6a00"
  },

  subText: {
    margin: 0,
    color: "#777",
    fontSize: "13px"
  },

  /* GRID SAME AS CLIENT */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    marginBottom: "20px"
  },

  /* CARD (CLIENT STYLE) */
  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #eee",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
    textAlign: "center"
  },

  icon: {
    fontSize: "20px"
  },

  cardTitle: {
    margin: "5px 0",
    fontSize: "13px",
    color: "#444"
  },

  cardValue: {
    margin: 0,
    color: "#ff6a00"
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

  /* SECTIONS */
  section: {
    marginTop: "25px"
  },

  sectionTitle: {
    marginBottom: "12px",
    fontSize: "18px",
    fontWeight: "600",
    color: "#222"
  },

  /* LIST CARD */
  recentCard: {
    background: "#fff",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "1px solid #eee",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
  },

  jobTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    color: "#ff6a00"
  },

  desc: {
    margin: "5px 0 0 0",
    fontSize: "12px",
    color: "#555"
  }
};

export default WorkerDashboard;