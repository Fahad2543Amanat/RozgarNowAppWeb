/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

function WorkerSettings() {
  const [settings, setSettings] = useState({
    notifications: true,
    availability: "Online",
    autoApplyAlerts: true
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workerSettings"));
    if (saved) setSettings(saved);
  }, []);

  // 💾 SAVE SETTINGS
  const saveSettings = () => {
    localStorage.setItem("workerSettings", JSON.stringify(settings));
    alert("Settings Saved ✅");
  };

  // 🔄 RESET ALL DATA
  const resetData = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all worker data?"
    );

    if (!confirmReset) return;

    localStorage.removeItem("myJobs");
    localStorage.removeItem("chat");
    localStorage.removeItem("workerProfile");
    localStorage.removeItem("workerSettings");

    alert("All data reset successfully ⚠");
    window.location.reload();
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <h2 style={styles.title}>⚙️ Worker Settings</h2>
      <p style={styles.subText}>Manage your account preferences</p>

      {/* SETTINGS CARD */}
      <div style={styles.card}>

        {/* NOTIFICATIONS */}
        <div style={styles.row}>
          <span>🔔 Notifications</span>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) =>
              setSettings({
                ...settings,
                notifications: e.target.checked
              })
            }
          />
        </div>

        {/* AUTO ALERTS */}
        <div style={styles.row}>
          <span>📢 Auto Job Alerts</span>
          <input
            type="checkbox"
            checked={settings.autoApplyAlerts}
            onChange={(e) =>
              setSettings({
                ...settings,
                autoApplyAlerts: e.target.checked
              })
            }
          />
        </div>

        {/* AVAILABILITY */}
        <div style={styles.column}>
          <span>🟢 Availability</span>

          <select
            value={settings.availability}
            onChange={(e) =>
              setSettings({
                ...settings,
                availability: e.target.value
              })
            }
            style={styles.select}
          >
            <option>Online</option>
            <option>Offline</option>
            <option>Busy</option>
          </select>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div style={styles.actions}>

        <button onClick={saveSettings} style={styles.saveBtn}>
          💾 Save Settings
        </button>

        <button onClick={resetData} style={styles.resetBtn}>
          ⚠ Reset All Data
        </button>

      </div>

      {/* INFO CARD */}
      <div style={styles.infoCard}>
        <h4>📊 System Info</h4>

        <p>✔ Connected to Jobs System</p>
        <p>✔ Linked with MyJobs</p>
        <p>✔ Syncs with Profile & Earnings</p>
        <p>✔ LocalStorage-based persistence</p>
      </div>

    </div>
  );
}

/* 🎨 ORANGE + WHITE THEME */
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    minHeight: "100vh",
    background: "#fff"
  },

  title: {
    margin: 0,
    color: "#ff6a00"
  },

  subText: {
    margin: "5px 0 15px 0",
    color: "#666",
    fontSize: "13px"
  },

  card: {
    background: "#fff",
    border: "1px solid #ffe0cc",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(255,106,0,0.08)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #f5f5f5"
  },

  column: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #eee"
  },

  actions: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  saveBtn: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  resetBtn: {
    flex: 1,
    padding: "10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  infoCard: {
    marginTop: "20px",
    background: "#fff7f0",
    padding: "15px",
    borderRadius: "12px",
    fontSize: "13px",
    color: "#444"
  }
};

export default WorkerSettings;