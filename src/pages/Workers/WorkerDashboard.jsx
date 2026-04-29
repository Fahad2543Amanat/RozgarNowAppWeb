import { useNavigate } from "react-router-dom";

function WorkerDashboard() {
  const navigate = useNavigate();

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const myJobs = JSON.parse(localStorage.getItem("myJobs")) || [];
  const worker = JSON.parse(localStorage.getItem("workerData")) || {};

  const totalJobs = jobs.length;
  const appliedJobs = myJobs.length;
  const completedJobs = myJobs.filter(j => j.status === "Completed").length;
  const activeJobs = myJobs.filter(j => j.status !== "Completed").length;

  // 💰 Earnings (OLD LOGIC SAME)
  const earnings = myJobs
    .filter(j => j.status === "Completed")
    .reduce((acc, job) => {
      const bid = Number(job.bid);
      const fallback =
        (Number(job.budgetMin || 0) + Number(job.budgetMax || 0)) / 2;
      const earning = bid > 0 ? bid : fallback;
      return acc + earning;
    }, 0);

  const isMobile = window.innerWidth < 768;

  return (
    <div style={styles.container}>

      {/* ================= TOP SECTION (NEW) ================= */}
      <div style={styles.topBar}>
        <div>
          <h3>👋 Hi, {worker.name || "Worker"}</h3>
          <p style={styles.small}>Ready to earn today?</p>
        </div>

        <div style={styles.topIcons}>
          <span>🔔</span>
          {/* <span>💬</span> */}
        </div>
      </div>

      {/* PROFILE COMPLETION */}
      <div style={styles.profileBox}>
        <p>Profile Completion: 70%</p>
        <div style={styles.progress}>
          <div style={{ ...styles.progressFill, width: "70%" }} />
        </div>
      </div>

      {/* ================= WALLET CARD (NEW) ================= */}
      <div style={styles.wallet}>
        <h3>💰 Wallet</h3>
        <h2>Rs {earnings}</h2>
        <p>Total Earnings</p>

        {/* <div style={styles.walletBtns}>
          <button onClick={() => navigate("/worker/jobs")}>Find Jobs</button>
          <button onClick={() => navigate("/worker/my-jobs")}>My Applications</button>
          <button onClick={() => navigate("/worker/chat")}>Message</button>
          <button onClick={() => navigate("/worker/earnings")}>Wallet</button>
        </div> */}
      </div>

      {/* ================= OLD HEADER (UNCHANGED) ================= */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Worker Dashboard</h2>
          <p style={styles.subText}>Professional overview of your work</p>
        </div>
      </div>

      {/* ================= OLD STATS (UNCHANGED) ================= */}
      <div style={styles.grid}>
        <Card title="Total Jobs" value={totalJobs} icon="📦" />
        <Card title="Applied Jobs" value={appliedJobs} icon="📨" />
        <Card title="Active Jobs" value={activeJobs} icon="⚡" />
        <Card title="Completed Jobs" value={completedJobs} icon="✅" />
        {/* <Card title="Earnings" value={`Rs ${earnings}`} icon="💰" /> */}
      </div>

      {/* ================= ACTIONS (UNCHANGED) ================= */}
      <div style={styles.actions}>
        <ActionCard title="📦 Browse Jobs" onClick={() => navigate("/worker/jobs")} />
        <ActionCard title="🧾 My Jobs" onClick={() => navigate("/worker/my-jobs")} />
        <ActionCard title="💬 Chat" onClick={() => navigate("/worker/chat")} />
        <ActionCard title="💰 Earnings" onClick={() => navigate("/worker/earnings")} />
      </div>

      {/* ================= RECOMMENDED JOBS (UPGRADED) ================= */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recommended Jobs</h3>

        {jobs.slice(0, 4).map(job => (
          <div key={job.id} style={styles.recentCard}>
            <h4 style={styles.jobTitle}>{job.title}</h4>
            <p style={styles.desc}>{job.description}</p>

            <p style={styles.small}>💰 Salary: {job.budgetMin} - {job.budgetMax}</p>
            <p style={styles.small}>📍 Distance: ~2km</p>

            <div style={styles.row}>
              <button onClick={() => navigate(`/worker/job/${job.id}`)}>View</button>
              <button onClick={() => navigate("/worker/jobs")}>Apply</button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ACTIVE JOBS (NEW) ================= */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Active Jobs</h3>

        {myJobs.slice(0, 3).map(job => (
          <div key={job.id} style={styles.recentCard}>
            <h4 style={styles.jobTitle}>{job.title}</h4>
            <p style={styles.small}>Start: {job.startDate || "N/A"}</p>
            <p style={styles.small}>Status: {job.status}</p>

            <div style={styles.progress}>
              <div style={{ ...styles.progressFill, width: "50%" }} />
            </div>
          </div>
        ))}
      </div>

      {/* ================= BOTTOM NAV (MOBILE ONLY) ================= */}
      {isMobile && (
        <div style={styles.bottomNav}>
          <button onClick={()=>navigate("/worker")}>🏠</button>
          <button onClick={()=>navigate("/worker/jobs")}>🔍</button>
          <button onClick={()=>navigate("/worker/emergency")}>🚨</button>
          <button onClick={()=>navigate("/worker/earnings")}>💰</button>
          <button onClick={()=>navigate("/worker/profile")}>👤</button>
        </div>
      )}

    </div>
  );
}

/* ================= REUSABLE ================= */
function Card({ title, value, icon }) {
  return (
    <div style={styles.card}>
      <div>{icon}</div>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

function ActionCard({ title, onClick }) {
  return (
    <div style={styles.actionCard} onClick={onClick}>
      {title}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: { padding: 20, paddingBottom: 70 },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10
  },

  topIcons: { 
    display: "flex",
     gap: 10 ,
     cursor: "pointer"
    },

  profileBox: {
    marginBottom: 15
  },

  progress: {
    height: 6,
    background: "#eee",
    borderRadius: 10
  },

  progressFill: {
    height: "100%",
    background: "#ff6a00",
    borderRadius: 10
  },

  wallet: {
    background: "#fff3e6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  walletBtns: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 8
  },

  header: { marginBottom: 20 },

  title: { color: "#ff6a00" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
    gap: 10
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 10
  },

  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
    gap: 10,
    marginTop: 20
  },

  actionCard: {
    background: "#ff6a00",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    cursor: "pointer"
  },

  section: { marginTop: 20 },

  sectionTitle: { marginBottom: 10 },

  recentCard: {
    padding: 12,
    background: "#fff",
    borderRadius: 10,
    marginBottom: 10
  },

  jobTitle: { color: "#ff6a00" },

  desc: { fontSize: 12 },

  small: { fontSize: 12, color: "#666" },

  row: {
    display: "flex",
    gap: 8,
    marginTop: 5
  },

  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    background: "#fff",
    padding: 10,
    borderTop: "1px solid #eee"
  }
};

export default WorkerDashboard;