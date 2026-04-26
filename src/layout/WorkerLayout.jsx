import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function WorkerLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 📱 screen detect
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
          <h3 style={{ margin: 0 }}>Worker Panel</h3>
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
        <h2 style={{ color: "white" }}>Worker Panel</h2>

        {/* DASHBOARD */}
        <NavLink onClick={() => setOpen(false)} to="/worker" style={styles.link}>
          📊 Dashboard
        </NavLink>

        {/* AVAILABLE JOBS */}
        <NavLink onClick={() => setOpen(false)} to="/worker/jobs" style={styles.link}>
          📦 Available Jobs
        </NavLink>

        {/* MY JOBS */}
        <NavLink onClick={() => setOpen(false)} to="/worker/my-jobs" style={styles.link}>
          🧾 My Jobs
        </NavLink>

        {/* TASKS */}
        <NavLink onClick={() => setOpen(false)} to="/worker/tasks" style={styles.link}>
          📝 Tasks
        </NavLink>

        {/* CHAT */}
        <NavLink onClick={() => setOpen(false)} to="/worker/chat" style={styles.link}>
          💬 Chat
        </NavLink>

        {/* EARNINGS */}
        <NavLink onClick={() => setOpen(false)} to="/worker/earnings" style={styles.link}>
          💰 Earnings
        </NavLink>

        {/* PROFILE */}
        <NavLink onClick={() => setOpen(false)} to="/worker/profile" style={styles.link}>
          👤 Profile
        </NavLink>

        {/* SETTINGS */}
        <NavLink onClick={() => setOpen(false)} to="/worker/settings" style={styles.link}>
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

export default WorkerLayout;

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