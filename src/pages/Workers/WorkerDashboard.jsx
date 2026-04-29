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

  const completion = 85;
const isMobile = window.innerWidth < 768;
  
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

  

  return (
    <div style={styles.container}>

      {/* ================= TOP SECTION (NEW) ================= */}
      <div style={styles.topBar}>

  {/* LEFT SIDE */}
  <div style={styles.topLeft}>
    <h3 style={styles.title}>Worker Dashboard</h3>
    
  </div>

  {/* RIGHT SIDE */}
  <div style={styles.topIcons}>
    <span style={styles.icon}>🔔</span>
  </div>

</div>
<p style={styles.subText}>Professional overview of your work</p>

      {/* PROFILE COMPLETION */}
      {/* ================= PROFILE HEADER (UPDATED) ================= */}
<div style={styles.profileBox}>

  {/* LEFT SIDE */}
  <div style={styles.profileLeft}>
    
    {/* PROFILE IMAGE */}
    <img
      src={worker.profileImage || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
      alt="profile"
      style={styles.profileImg}
    />

    {/* USER INFO */}
    <div>
      <h4 style={styles.profileName}>
        👋 {worker.name || "Worker"}
      </h4>

      <p style={styles.profileSub}>
        📍 {worker.city || "City"}, {worker.country || "Pakistan"}
      </p>
    </div>
  </div>

  {/* RIGHT SIDE (CIRCLE PROGRESS) */}
  <div style={styles.circleBox}>
    <div style={styles.circleWrapper}>
  <svg width="70" height="70">
    
    {/* Background circle */}
    <circle
      cx="35"
      cy="35"
      r="30"
      stroke="#eee"
      strokeWidth="6"
      fill="none"
    />

    {/* Progress circle */}
    <circle
      cx="35"
      cy="35"
      r="30"
      stroke="#ff6a00"
      strokeWidth="6"
      fill="none"
      strokeDasharray={2 * Math.PI * 30}
      strokeDashoffset={
        2 * Math.PI * 30 * (1 - completion / 100)
      }
      strokeLinecap="round"
      transform="rotate(-90 35 35)"
    />
  </svg>

  <div style={styles.circleText}>
    {completion}%
  </div>
</div>
    <p style={styles.small}>Profile</p>
  </div>

</div>

      {/* ================= WALLET CARD (NEW) ================= */}
      {/* ================= WALLET CARD (UPDATED PREMIUM) ================= */}
<div style={styles.wallet}>

  {/* LEFT - WALLET BALANCE */}
  <div style={styles.walletItem}>
    <div style={styles.walletIcon}>👛</div>
    <p style={styles.walletLabel}>Wallet Balance</p>
    <h2 style={styles.walletValue}>Rs {earnings}</h2>
  </div>

  {/* DIVIDER */}
  <div style={styles.walletDivider}></div>

  {/* RIGHT - TOTAL EARNINGS */}
  <div style={styles.walletItem}>
    <div style={styles.walletIcon}>💰</div>
    <p style={styles.walletLabel}>Total Earnings</p>
    <h2 style={styles.walletValue}>Rs {earnings}</h2>
  </div>

</div>

      {/* ================= OLD HEADER (UNCHANGED) ================= */}
      {/* <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Worker Dashboard</h2>
          
        </div>
      </div> */}

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
const isMobile = window.innerWidth < 768;
const styles = {
  container: {
    padding: isMobile ? "12px" : "20px",
     paddingBottom: 70,
     maxWidth: "1200px",
    margin: "0 auto"
     },

  topBar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  flexWrap: "wrap"
},

topLeft: {
  display: "flex",
  alignItems: "center"
},

title: {
  margin: 0,
  fontSize: isMobile ? "18px" : "28px",
  fontWeight: "700",
  color: "#ff6a00"   // 🔥 orange
},

topIcons: {
  display: "flex",
  gap: "10px",
  cursor: "pointer",
  fontSize: "18px"
},

icon: {
  fontSize: "18px"
},

  profileBox: {
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  justifyContent: "space-between",
  alignItems: isMobile ? "flex-start" : "center",
  padding: "15px",
  borderRadius: "16px",
  background: "#fff3e6", // 🔥 light orange
  marginBottom: "15px",
  boxShadow: "0 5px 20px rgba(255,106,0,0.1)"
},

profileLeft: {
  display: "flex",
  alignItems: "center",
  gap: "12px"
},

profileImg: {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #ff6a00",

},

profileName: {
  margin: 0,
  fontSize: "14px",
  fontWeight: "600",
  color: "#222"
},

profileSub: {
  margin: 0,
  fontSize: "12px",
  color: "#666"
},

/* RIGHT SIDE CIRCLE */
circleBox: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
},

circleWrapper: {
  position: "relative",
  width: "70px",
  height: "70px"
},

circleText: {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "14px",
  fontWeight: "600",
  color: "#ff6a00"
},
 wallet: {
  flexDirection: isMobile ? "column" : "row",
  background: "linear-gradient(135deg,#ff6a00,#ff9f1c)",
  padding: "18px",
  borderRadius: "16px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  color: "#fff",
  boxShadow: "0 10px 30px rgba(255,106,0,0.3)"
},

walletItem: {
  flex: 1,
  textAlign: "center"
},

walletIcon: {
  fontSize: "22px",
  marginBottom: "5px"
},

walletLabel: {
  fontSize: "12px",
  opacity: 0.9,
  marginBottom: "4px"
},

walletValue: {
  margin: 0,
  fontSize: "18px",
  fontWeight: "700"
},

walletDivider: {
  width: "1px",
  height: "50px",
  background: "rgba(255,255,255,0.6)"
},

  header: { marginBottom: 20 },

  // title: { color: "#ff6a00" },

  grid: {
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(auto-fit,minmax(140px,1fr))",
    gap: 10
  },

  card: {
    background: "#fff",
    padding: 15,
    borderRadius: 10
  },

  actions: {
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(auto-fit,minmax(140px,1fr))",
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