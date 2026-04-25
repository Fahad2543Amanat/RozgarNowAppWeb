import { useState } from "react";
import { useNavigate } from "react-router-dom";

function WorkerDashboard() {
  const navigate = useNavigate();

  // ✅ FIX: no unused setJobs
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const [appliedJobs, setAppliedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedJobs")) || [];
  });

  const [search, setSearch] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(() => {
    return JSON.parse(localStorage.getItem("chat")) || [];
  });

  // 📌 APPLY / BID
  const applyJob = (job) => {
    const alreadyApplied = appliedJobs.find((j) => j.id === job.id);

    if (alreadyApplied) {
      alert("Already applied");
      return;
    }

    const newApplication = {
      ...job,
      bid: bidAmount || "N/A",
      status: "Applied",
      progress: 0,
      appliedAt: new Date().toLocaleString()
    };

    const updated = [...appliedJobs, newApplication];

    setAppliedJobs(updated);
    localStorage.setItem("appliedJobs", JSON.stringify(updated));

    setBidAmount("");
  };

  // 📈 UPDATE PROGRESS
  const updateProgress = (id, value) => {
    const updated = appliedJobs.map((job) =>
      job.id === id ? { ...job, progress: value } : job
    );

    setAppliedJobs(updated);
    localStorage.setItem("appliedJobs", JSON.stringify(updated));
  };

  // 💬 CHAT
  const sendMessage = () => {
    if (!message) return;

    const newMsg = {
      id: Date.now(),
      text: message,
      sender: "Worker",
      time: new Date().toLocaleTimeString()
    };

    const updated = [...chat, newMsg];

    setChat(updated);
    localStorage.setItem("chat", JSON.stringify(updated));

    setMessage("");
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // 🔍 FILTER
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  // 📊 STATS
  const total = jobs.length;
  const applied = appliedJobs.length;
  const active = appliedJobs.filter((j) => j.progress > 0).length;

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2>Worker Dashboard 🛠️</h2>
          <p>Find jobs, bid & track progress</p>
        </div>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.cardSmall}>📦 {total} Jobs</div>
        <div style={styles.cardSmall}>📨 {applied} Applied</div>
        <div style={styles.cardSmall}>⚡ {active} Active</div>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* JOB LIST */}
      <h3>Available Jobs</h3>

      {filteredJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job.id} style={styles.jobCard}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>

            <input
              placeholder="Enter your bid (optional)"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              style={styles.inputSmall}
            />

            <button onClick={() => applyJob(job)} style={styles.button}>
              Apply / Bid
            </button>
          </div>
        ))
      )}

      {/* MY APPLICATIONS */}
      <h3 style={{ marginTop: 25 }}>My Work</h3>

      {appliedJobs.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        appliedJobs.map((job) => (
          <div key={job.id} style={styles.jobCard}>
            <h4>{job.title}</h4>
            <p>{job.description}</p>

            <small>Bid: {job.bid}</small>

            {/* PROGRESS BAR */}
            <div style={styles.progressBar}>
              <div
                style={{
                  width: job.progress + "%",
                  height: "100%",
                  background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
                  transition: "0.3s"
                }}
              />
            </div>

            {/* SLIDER */}
            <input
              type="range"
              min="0"
              max="100"
              value={job.progress}
              onChange={(e) =>
                updateProgress(job.id, Number(e.target.value))
              }
              style={{ width: "100%", marginTop: 8 }}
            />

            <small>{job.progress}% completed</small>
          </div>
        ))
      )}

      {/* CHAT */}
      <div style={styles.chatBox}>
        <h3>Client Chat</h3>

        <div style={styles.chatWindow}>
          {chat.map((m) => (
            <div key={m.id} style={styles.msg}>
              <b>{m.sender}:</b> {m.text}
              <small> {m.time}</small>
            </div>
          ))}
        </div>

        <div style={styles.row}>
          <input
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.inputSmall}
          />
          <button onClick={sendMessage} style={styles.buttonSmall}>
            Send
          </button>
        </div>
      </div>

    </div>
  );
}

/* 🎨 PREMIUM RESPONSIVE STYLES */
const styles = {
  container: {
    padding: "16px",
    background: "linear-gradient(135deg, #fff7ed, #ffffff)",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20
  },

  logoutBtn: {
    background: "linear-gradient(90deg, #ff4d4d, #ff7a7a)",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: 10,
    cursor: "pointer"
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 10,
    marginBottom: 15
  },

  cardSmall: {
    background: "#fff",
    padding: 12,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    border: "1px solid #eee"
  },

  inputSmall: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #eee",
    marginBottom: 8
  },

  button: {
    width: "100%",
    padding: 10,
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer"
  },

  jobCard: {
    background: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
  },

  progressBar: {
    height: 6,
    background: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    margin: "8px 0"
  },

  chatBox: {
    marginTop: 20,
    background: "#fff",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  chatWindow: {
    height: 150,
    overflowY: "auto",
    marginBottom: 10,
    border: "1px solid #eee",
    padding: 10
  },

  msg: {
    fontSize: 12,
    marginBottom: 5
  },

  row: {
    display: "flex",
    gap: 10
  },

  buttonSmall: {
    padding: 10,
    background: "linear-gradient(90deg, #22c55e, #16a34a)",
    color: "white",
    border: "none",
    borderRadius: 10
  }
};

export default WorkerDashboard;