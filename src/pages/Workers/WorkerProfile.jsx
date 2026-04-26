/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

function WorkerProfile() {
  const [profile, setProfile] = useState({
    name: "Worker",
    skills: "React, JavaScript",
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);

  const [stats, setStats] = useState({
    applied: 0,
    completed: 0,
    earnings: 0,
  });

  useEffect(() => {
    // 👤 load profile
    const saved = JSON.parse(localStorage.getItem("workerProfile"));
    if (saved) {
      setProfile(saved);
      setForm(saved);
    }

    // 📊 load stats from system
    const myJobs = JSON.parse(localStorage.getItem("myJobs")) || [];

    const applied = myJobs.length;
    const completedJobs = myJobs.filter(j => j.status === "Completed");

    const earnings = completedJobs.reduce((acc, job) => {
      const bid = Number(job.bid);
      const fallback =
        (Number(job.budgetMin || 0) + Number(job.budgetMax || 0)) / 2;

      return acc + (bid > 0 ? bid : fallback);
    }, 0);

    setStats({
      applied,
      completed: completedJobs.length,
      earnings,
    });
  }, []);

  // 💾 save profile
  const saveProfile = () => {
    setProfile(form);
    localStorage.setItem("workerProfile", JSON.stringify(form));
    setEditMode(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.avatar}>
          {getInitials(profile.name)}
        </div>

        <div>
          <h2 style={styles.name}>{profile.name}</h2>
          <p style={styles.subText}>Professional Worker Profile</p>
        </div>

        <button
          onClick={() => setEditMode(!editMode)}
          style={styles.editBtn}
        >
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* STATS */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>📨 Applied</h3>
          <h2>{stats.applied}</h2>
        </div>

        <div style={styles.card}>
          <h3>✅ Completed</h3>
          <h2>{stats.completed}</h2>
        </div>

        <div style={styles.card}>
          <h3>💰 Earnings</h3>
          <h2>${stats.earnings.toFixed(2)}</h2>
        </div>

      </div>

      {/* PROFILE EDIT */}
      {editMode ? (
        <div style={styles.formCard}>

          <input
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Name"
            style={styles.input}
          />

          <textarea
            value={form.skills}
            onChange={(e) =>
              setForm({ ...form, skills: e.target.value })
            }
            placeholder="Skills (comma separated)"
            style={styles.textarea}
          />

          <button onClick={saveProfile} style={styles.saveBtn}>
            Save Profile
          </button>

        </div>
      ) : (
        <div style={styles.profileCard}>

          <h3>🧠 Skills</h3>
          <p style={styles.text}>{profile.skills}</p>

        </div>
      )}

      {/* EXPERIENCE SECTION */}
      <div style={styles.profileCard}>
        <h3>📊 Overview</h3>

        <ul style={styles.list}>
          <li>✔ Verified Worker Profile</li>
          <li>✔ Active in Job Market</li>
          <li>✔ Earnings Tracking Enabled</li>
          <li>✔ Task Progress System Connected</li>
        </ul>

      </div>

    </div>
  );
}

/* 🎨 ORANGE + WHITE PREMIUM THEME */
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    minHeight: "100vh",
    background: "#fff"
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px"
  },

  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px"
  },

  name: {
    margin: 0,
    color: "#ff6a00"
  },

  subText: {
    margin: 0,
    fontSize: "12px",
    color: "#666"
  },

  editBtn: {
    marginLeft: "auto",
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
    marginBottom: "20px"
  },

  card: {
    background: "#fff",
    border: "1px solid #ffe0cc",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(255,106,0,0.08)"
  },

  profileCard: {
    background: "#fff",
    border: "1px solid #ffe0cc",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px"
  },

  formCard: {
    background: "#fff7f0",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #eee",
    marginBottom: "10px"
  },

  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #eee",
    minHeight: "80px"
  },

  saveBtn: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    border: "none",
    borderRadius: "8px"
  },

  text: {
    fontSize: "13px",
    color: "#555"
  },

  list: {
    paddingLeft: "18px",
    fontSize: "13px",
    color: "#444"
  }
};

export default WorkerProfile;