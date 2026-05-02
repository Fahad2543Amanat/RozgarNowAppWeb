import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ClientLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // 📱 detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.wrapper}>

      {/* 📱 TOP BAR */}
      {isMobile && (
        <div style={styles.topbar}>
          <button onClick={() => setOpen(true)} style={styles.menuBtn}>
            ☰
          </button>
          <h3 style={{ margin: 0 }}>Client Panel</h3>
        </div>
      )}

      {/* 📱 OVERLAY */}
      {isMobile && open && (
        <div onClick={() => setOpen(false)} style={styles.overlay} />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          left: isMobile ? (open ? "0" : "-260px") : "0",
        }}
      >
        <h2 style={{ color: "white" }}>Client Panel</h2>

        {/* DASHBOARD */}
        <NavLink onClick={() => setOpen(false)} to="/client" style={styles.link}>
          📊 Dashboard
        </NavLink>

        {/* JOBS LIST PAGE (NEW) */}
        <NavLink onClick={() => setOpen(false)} to="/client/jobs" style={styles.link}>
          📦 Jobs
        </NavLink>
        <NavLink onClick={() => setOpen(false)} to="/client/clientbids" style={styles.link}>
          📦 View Applications
        </NavLink>

        {/* CREATE JOB */}
        <NavLink onClick={() => setOpen(false)} to="/client/create-job" style={styles.link}>
          ➕ Create Job
        </NavLink>

        {/* CHAT */}
        <NavLink onClick={() => setOpen(false)} to="/client/chat" style={styles.link}>
          💬 Chat
        </NavLink>

        {/* REPORTS (NEW PAGE ADDED) */}
        <NavLink onClick={() => setOpen(false)} to="/client/reports" style={styles.link}>
          📈 Reports
        </NavLink>

        {/* PROFILE (NEW PAGE ADDED) */}
        <NavLink onClick={() => setOpen(false)} to="/client/profile" style={styles.link}>
          👤 Profile
        </NavLink>
        {/* client-notification*/}
        <NavLink onClick={() => setOpen(false)} to="/client/client-notification" style={styles.link}>
          🔔 Notification
        </NavLink>

        {/* SETTINGS (NEW PAGE ADDED) */}
        <NavLink onClick={() => setOpen(false)} to="/client/settings" style={styles.link}>
          ⚙️ Settings
        </NavLink>

        {/* LOGOUT */}
        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div
        style={{
          ...styles.main,
          marginLeft: isMobile ? "0" : "240px",
          paddingTop: isMobile ? "70px" : "20px",
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default ClientLayout;

/* 🎨 STYLES */
const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f5f5",
  },

  topbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "55px",
    background: "#111827",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "0 15px",
    zIndex: 2000,
  },

  menuBtn: {
    fontSize: "22px",
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
  },

  sidebar: {
    width: "210px",
    background: "#111827",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    height: "100vh",
    top: 0,
    position: "fixed",
    transition: "0.3s",
    zIndex: 3000,
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "12px",
    borderRadius: "8px",
    background: "#1f2937",
  },

  logout: {
    marginTop: "20px",
    padding: "10px",
    background: "#ff6a00",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    zIndex: 2500,
  },
};