/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [theme, setTheme] = useState("light");
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    setName(localStorage.getItem("client_name") || "");
    setTheme(localStorage.getItem("theme") || "light");
    setNotifications(localStorage.getItem("notifications") === "true");
  }, []);

  const saveSettings = () => {
    localStorage.setItem("client_name", name);
    localStorage.setItem("theme", theme);
    localStorage.setItem("notifications", notifications);

    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const resetSettings = () => {
    localStorage.removeItem("client_name");
    localStorage.removeItem("theme");
    localStorage.removeItem("notifications");

    setName("");
    setTheme("light");
    setNotifications(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>⚙️ Settings</h2>
        <p>Manage your account & preferences</p>
      </div>

      {/* CARD */}
      <div style={styles.card}>

        <h3>👤 Account</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={styles.input}
        />

        <h3>🎨 Theme Mode</h3>

        <div style={styles.row}>
          <button
            onClick={() => setTheme("light")}
            style={{
              ...styles.themeBtn,
              background: theme === "light" ? "#ff6a00" : "#f3f4f6",
              color: theme === "light" ? "#fff" : "#000"
            }}
          >
            Light
          </button>

          <button
            onClick={() => setTheme("dark")}
            style={{
              ...styles.themeBtn,
              background: theme === "dark" ? "#ff6a00" : "#f3f4f6",
              color: theme === "dark" ? "#fff" : "#000"
            }}
          >
            Dark
          </button>
        </div>

        <h3>🔔 Notifications</h3>

        <label style={styles.switchRow}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enable Notifications
        </label>

      </div>

      {/* ACTIONS */}
      <div style={styles.actions}>

        <button onClick={saveSettings} style={styles.saveBtn}>
          💾 Save Settings
        </button>

        <button onClick={resetSettings} style={styles.resetBtn}>
          🔄 Reset
        </button>

        <button onClick={logout} style={styles.logoutBtn}>
          🚪 Logout
        </button>

      </div>

      {/* TOAST */}
      {savedMsg && (
        <div style={styles.toast}>
          ✔ Settings Saved Successfully
        </div>
      )}

    </div>
  );
}

export default Settings;

const styles = {
  page: {
    padding: "clamp(12px, 2vw, 24px)",
    fontFamily: "Arial",
    background: "linear-gradient(135deg,#fff7ed,#ffffff)",
    minHeight: "100vh"
  },

  header: {
    marginBottom: 20
  },

  /* CARD */
  card: {
    background: "#fff",
    padding: "clamp(14px, 2vw, 20px)",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(255,106,0,0.08)",
    border: "1px solid #ffe1cc",
    marginBottom: 15
  },

  /* INPUT */
  input: {
    width: "92%",
    padding: "12px",
    borderRadius: 10,
    border: "1px solid #ffd2b3",
    outline: "none",
    marginBottom: 15,
    fontSize: "14px"
  },

  /* THEME ROW */
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: 15,
    flexWrap: "wrap"
  },

  themeBtn: {
    flex: "1 1 120px",
    padding: "10px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold"
  },

  switchRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    fontSize: "14px"
  },

  /* ACTIONS */
  actions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  saveBtn: {
    flex: "1 1 150px",
    padding: "12px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg,#ff6a00,#ff9f1c)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },

  resetBtn: {
    flex: "1 1 150px",
    padding: "12px",
    borderRadius: 12,
    border: "none",
    background: "#f3f4f6",
    cursor: "pointer"
  },

  logoutBtn: {
    flex: "1 1 150px",
    padding: "12px",
    borderRadius: 12,
    border: "none",
    background: "#111827",
    color: "#fff",
    cursor: "pointer"
  },

  /* TOAST */
  toast: {
    marginTop: 15,
    padding: 10,
    background: "#22c55e",
    color: "#fff",
    borderRadius: 10,
    textAlign: "center",
    fontSize: "14px"
  }
};