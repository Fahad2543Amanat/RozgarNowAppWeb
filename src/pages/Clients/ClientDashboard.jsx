import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function ClientDashboard() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const total = jobs.length;
  const completed = jobs.filter(j => j.status === "Completed").length;
  const active = jobs.filter(j => j.status === "Active").length;
  const pending = jobs.filter(j => j.status === "Pending").length;
  const [toast, setToast] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
  { id: 1, text: "New applicant for React Developer job", read: false },
  { id: 2, text: "Job proposal received", read: false },
  { id: 3, text: "Worker completed your task", read: true },
  { id: 4, text: "New message from Ali", read: false },
  { id: 5, text: "Payment received", read: true },
]);

const [openNotif, setOpenNotif] = useState(false);
const unreadCount = notifications.filter(n => !n.read).length;
  const handleAction = (action, name) => {
  setToast(`${action} for ${name}`);

  setTimeout(() => {
    setToast("");
  }, 2500);
};
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);



  return (
    <div style={styles.container}>

      {/* ================= TOP BAR ================= */}
      <div style={styles.topBar}>
        <div style={styles.brand}>
          <div style={styles.logo}>
    {user?.logoUrl ? (
      <img
        src={`${import.meta.env.VITE_API_URL}/Uploads/${user.logoUrl}`}
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
    ) : (
      "🟠"
    )}
  </div>
          <div>
            <h3 style={{ margin: 0 }}>
            {user?.company || "Employer"}
             </h3>
            <span style={styles.verified}>{user?.verificationStatus === "Approved"
        ? "✔ Verified Company"
        : "⏳ Pending Verification"}</span>
          </div>
        </div>

        <div style={styles.topRight}>
          <div style={{ position: "relative", cursor: "pointer" }}>

  <span
    style={styles.notify}
    onClick={() => setOpenNotif(!openNotif)}
  >
    Version 1.0.1🔔
  </span>

  {/* BADGE */}
  {unreadCount > 0 && (
    <span style={styles.badgeCount}>
      {unreadCount}
    </span>
  )}

  {/* DROPDOWN */}
  {openNotif && (
    <div style={styles.notifDropdown}>

      {notifications.slice(0, 5).map((n) => (
        <div
          key={n.id}
          style={{
            ...styles.notifItem,
            background: n.read ? "#fff" : "#fff3e6"
          }}
          onClick={() => {
            setNotifications(prev =>
              prev.map(x =>
                x.id === n.id ? { ...x, read: true } : x
              )
            );
          }}
        >
          {n.text}
        </div>
      ))}

      <div
        style={styles.viewAll}
        onClick={() => navigate("/client/client-notification")}
      >
        View All Notifications →
      </div>

    </div>
  )}

</div>
        </div>
      </div>

      {/* ================= HERO ================= */}
<div style={{
  ...styles.hero,
  flexDirection: window.innerWidth < 768 ? "column" : "row",
  alignItems: window.innerWidth < 768 ? "flex-start" : "center",
  gap: window.innerWidth < 768 ? "12px" : "0px"
}}>
  
  <div>
    <h2 style={{ margin: 0 }}>Welcome Back {user?.name}👋</h2>
    <p style={{ marginTop: 5, opacity: 0.9 }}>
      Manage jobs & hire skilled workers faster
    </p>
  </div>

  <button
    style={{
      ...styles.primaryBtn,
      width: window.innerWidth < 768 ? "100%" : "auto"
    }}
    onClick={() => navigate("/client/create-job")}
  >
    + Post New Job
  </button>

</div>

      {/* ================= STATS ================= */}
      <div style={styles.statsGrid}>
        <StatCard title="Total Jobs" value={total} icon="📦" />
        <StatCard title="Active" value={active} icon="⚡" />
        <StatCard title="Completed" value={completed} icon="✅" />
        <StatCard title="Pending" value={pending} icon="⏳" />
      </div>

      {/* ================= QUICK ACTIONS (Create Job removed) ================= */}
      <div style={styles.actions}>
        <ActionCard onClick={() => navigate("/client/chat")} title="💬 Chat" />
        <ActionCard onClick={() => navigate("/client/reports")} title="📊 Reports" />
      </div>

      {/* ================= RECENT JOBS ================= */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Jobs</h3>

        {jobs.slice(0, 4).map(job => (
          <div key={job.id} style={styles.jobCard}>
            <div style={styles.jobTop}>
              <h4 style={styles.jobTitle}>{job.title}</h4>

              <span
                style={{
                  ...styles.badge,
                  background:
                    job.status === "Completed"
                      ? "#22c55e"
                      : job.status === "Active"
                      ? "#ff7a00"
                      : "#f59e0b"
                }}
              >
                {job.status}
              </span>
            </div>

            <p style={styles.desc}>{job.description}</p>

            <div style={styles.jobBottom}>
              <span>💰 {job.budgetMin} - {job.budgetMax}</span>
              <span>⏳ {job.deadline}</span>
              <span>⚡ {job.priority}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= RECENT APPLICATIONS ================= */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Recent Applications</h3>

        {[1, 2, 3].map((item) => (
          <div key={item} style={styles.appCard}>

            <div style={styles.appTop}>
              <div style={styles.avatar}>👷</div>

              <div>
                <h4 style={{ margin: 0 }}>Ali Khan</h4>
                <small style={{ color: "#777" }}>
                  React Developer • Lahore • 3y Exp
                </small>
              </div>
            </div>

            <div style={styles.skills}>
              <span>React</span>
              <span>Node</span>
              <span>Firebase</span>
            </div>

            <div style={styles.appActions}>
  
  <button
    onClick={() => handleAction("Message sent", "Ali Khan")}
    style={styles.msg}
  >
    Message
  </button>

  <button
    onClick={() => handleAction("Shortlisted", "Ali Khan")}
    style={styles.short}
  >
    Shortlist
  </button>

  <button
    onClick={() => handleAction("Hired", "Ali Khan")}
    style={styles.hire}
  >
    Hire
  </button>

  <button
    onClick={() => handleAction("Rejected", "Ali Khan")}
    style={styles.reject}
  >
    Reject
  </button>

</div>
          </div>
        ))}
      </div>

      {/* ================= ANALYTICS ================= */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Analytics Overview</h3>

        <div style={styles.analyticsGrid}>

          <div style={styles.analyticsCard}>
            <h4>🔥 Hiring Trend</h4>
            <p>Last 7 days activity</p>

            <div style={styles.bar}>
              <div style={styles.barFill}></div>
            </div>

            <small style={{ color: "green" }}>+12% increase</small>
          </div>

          <div style={styles.analyticsCard}>
            <h4>📊 Job Performance</h4>
            <div style={styles.circle}>85%</div>
            <small>Good performance</small>
          </div>

          <div style={styles.analyticsCard}>
            <h4>👥 Applications</h4>
            <h2 style={{ color: "#ff7a00" }}>24</h2>
            <small>+5 new today</small>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM NAV (MOBILE ONLY) ================= */}
      {isMobile && (
  <div style={styles.bottomNav}>
    <span style={styles.navItem}>🏠</span>
    <span style={styles.navItem}>📦</span>
    <span style={styles.navItem}>💬</span>
    <span style={styles.navItem}>👥</span>
    <span style={styles.navItem}>⋮</span>
  </div>
)}
        

      {toast && (
  <div style={styles.toast}>
    {toast}
  </div>
)}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value, icon }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statIcon}>{icon}</div>
      <h4 style={{ margin: 0 }}>{title}</h4>
      <h2 style={styles.statValue}>{value}</h2>
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
  container: {
    padding: 20,
    background: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  /* TOP BAR */
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },

  logo: {
    fontSize: 28
  },

  verified: {
    fontSize: 12,
    color: "#ff7a00"
  },

  notify: {
    fontSize: 22,
    cursor :"pointer"
  },

  /* HERO */
  hero: {
    background: "linear-gradient(135deg,#ff7a00,#ffb347)",
    color: "#fff",
    padding: 20,
    borderRadius: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  primaryBtn: {
    background: "#fff",
    color: "#ff7a00",
    border: "none",
    padding: "10px 15px",
    borderRadius: 10,
    fontWeight: "bold",
    cursor: "pointer"
  },

  /* STATS */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
    gap: 12,
    marginBottom: 20
  },

  statCard: {
    background: "#fff",
    border: "1px solid #eee",
    padding: 15,
    borderRadius: 14,
    textAlign: "center",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)"
  },

  statIcon: {
    fontSize: 18
  },

  statValue: {
    color: "#ff7a00"
  },

  /* ACTIONS */
  actions: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 10,
    marginBottom: 20
  },

  actionCard: {
    background: "#fff",
    border: "1px solid #ff7a00",
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
    cursor: "pointer",
    color: "#ff7a00",
    fontWeight: "bold"
  },

  section: {
    marginTop: 20
  },

  sectionTitle: {
    marginBottom: 10
  },

  /* JOB */
  jobCard: {
    padding: 15,
    borderRadius: 14,
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
    marginBottom: 10
  },

  jobTop: {
    display: "flex",
    justifyContent: "space-between"
  },

  jobTitle: {
    margin: 0
  },

  desc: {
    fontSize: 13,
    color: "#666"
  },

  jobBottom: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12
  },

  badge: {
    padding: "5px 10px",
    borderRadius: 20,
    color: "#fff"
  },

  /* APPLICATIONS */
  appCard: {
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 12,
    marginBottom: 10
  },

  appTop: {
    display: "flex",
    gap: 10
  },

  avatar: {
    fontSize: 28
  },

  skills: {
    display: "flex",
    gap: 6,
    marginTop: 8,
    flexWrap: "wrap"
  },

  skillsSpan: {
    background: "#fff3e6",
    color: "#ff7a00",
    padding: "3px 8px",
    borderRadius: 10,
    fontSize: 11
  },

  appActions: {
    display: "flex",
    gap: 6,
    marginTop: 10,
    flexWrap: "wrap"
  },

  msg: {
  background: "#3498db",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s"
},

short: {
  background: "#f1c40f",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s"
},

hire: {
  background: "#2ecc71",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s"
},

reject: {
  background: "#e74c3c",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s"
},
toast: {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "#ff7a00",
  color: "#fff",
  padding: "12px 16px",
  borderRadius: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  fontWeight: "bold",
  zIndex: 9999,
  animation: "fadeIn 0.3s ease"
},
  /* ANALYTICS */
  analyticsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: 12
  },

  analyticsCard: {
    padding: 15,
    borderRadius: 14,
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  },

  bar: {
    width: "100%",
    height: 8,
    background: "#eee",
    borderRadius: 10,
    overflow: "hidden"
  },

  barFill: {
    width: "70%",
    height: "100%",
    background: "#ff7a00"
  },

  circle: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "5px solid #ff7a00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    fontWeight: "bold"
  },

  /* BOTTOM NAV */
  bottomNav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    padding: 10,
    background: "#fff",
    borderTop: "1px solid #eee"
  },
  badgeCount: {
  position: "absolute",
  top: -5,
  right: -5,
  background: "red",
  color: "#fff",
  fontSize: 10,
  width: 18,
  height: 18,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
},

notifDropdown: {
  position: "absolute",
  right: 0,
  top: 35,
  width: 260,
  background: "#fff",
  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  borderRadius: 10,
  zIndex: 999,
  overflow: "hidden"
},

notifItem: {
  padding: 10,
  fontSize: 13,
  borderBottom: "1px solid #eee",
  cursor: "pointer"
},

viewAll: {
  padding: 10,
  textAlign: "center",
  fontSize: 12,
  fontWeight: "bold",
  color: "#ff7a00",
  cursor: "pointer",
  background: "#fff8f2"
}
};

export default ClientDashboard;