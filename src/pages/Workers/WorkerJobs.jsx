/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import axios from "axios";
function WorkerJobs() {
  const [jobs, setJobs] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [search, setSearch] = useState("");

  // 🟠 MODAL STATES
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState("");

   // ================= FETCH ALL JOBS FROM BACKEND =================
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/job/all`
        );

        console.log("ALL JOBS:", res.data);

        // ✅ IMPORTANT FIX
        setJobs(res.data.data || []);

      } catch (error) {
        console.log("FETCH JOBS ERROR:", error);
      }
    };

    loadJobs();

    // 🟡 keep old logic for applied jobs
    setMyJobs(JSON.parse(localStorage.getItem("myJobs")) || []);
  }, []);

   // ================= FILTER =================
  const filteredJobs = jobs.filter(job =>
    (job.title || job.Title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🚀 OPEN MODAL
  const openBidModal = (job) => {
    const exists = myJobs.find(j => j._id === job._id);

    if (exists) {
      alert("⚠ Already Applied");
      return;
    }

    setSelectedJob(job);
  };

  // 🚀 SUBMIT BID
  const submitBid = async () => {
  if (!selectedJob) return;

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const payload = {
      jobId: selectedJob._id,
      workerId: user.id,
      amount: bidAmount || "Accept Range"
    };

    await axios.post(
      `${import.meta.env.VITE_API_URL}/bid/create`,
      payload
    );

    // ✅ OLD LOGIC (KEEP SAME)
    const newJob = {
      ...selectedJob,
      status: "Pending",
      progress: 0,
      bid: bidAmount || "Accept Range",
      appliedAt: new Date().toLocaleString()
    };

    const updated = [...myJobs, newJob];

    localStorage.setItem("myJobs", JSON.stringify(updated));
    setMyJobs(updated);

    setSelectedJob(null);
    setBidAmount("");

    alert("✅ Applied Successfully");

  } catch (error) {
    console.log("BID ERROR:", error);
    alert("❌ Failed to submit bid");
  }
};

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <h2 style={styles.title}>📦 Available Jobs</h2>

      {/* SEARCH */}
      <input
        placeholder="🔍 Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* JOB LIST */}
      {/* JOB LIST */}
      <div style={styles.grid}>

        {filteredJobs.map(job => (
          <div key={job._id} style={styles.card}>

            <h3 style={styles.jobTitle}>
              {job.title || job.Title}
            </h3>

            <p style={styles.desc}>
              {job.description || job.Description}
            </p>

            <div style={styles.infoBox}>
              👤 Client <br />
              📍 {job.location || job.Location} <br />
              💰 {job.budgetMin || job.BudgetMin} - {job.budgetMax || job.BudgetMax}
            </div>

            <button
              onClick={() => openBidModal(job)}
              style={styles.applyBtn}
            >
              Apply / Bid
            </button>

          </div>
        ))}

      </div>

      {/* 🟠 BID MODAL */}
      {selectedJob && (
        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <h3>💼 Apply for Job</h3>
            <p style={{ fontSize: "13px" }}>
              {selectedJob.title || selectedJob.Title}
            </p>

            <div style={styles.rangeBox}>
              💰 Market Range: 
              {selectedJob.budgetMin || selectedJob.BudgetMin} - 
              {selectedJob.budgetMax || selectedJob.BudgetMax}
            </div>

            <p style={{ fontSize: "12px", color: "#666" }}>
              Enter your bid or leave empty to accept range
            </p>

            <input
              placeholder="Enter your bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              style={styles.input}
            />

            <div style={styles.modalActions}>

              <button onClick={submitBid} style={styles.submitBtn}>
                Submit Bid
              </button>

              <button
                onClick={() => setSelectedJob(null)}
                style={styles.cancelBtn}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* 🎨 ORANGE + WHITE THEME */
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
    background: "#fff",
    minHeight: "100vh"
  },

  title: {
    color: "#ff6a00",
    marginBottom: "10px"
  },

  search: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #eee",
    marginBottom: "15px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "12px"
  },

  card: {
    border: "1px solid #ffe0cc",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(255,106,0,0.08)"
  },

  jobTitle: {
    margin: 0,
    color: "#ff6a00"
  },

  desc: {
    fontSize: "13px",
    color: "#555"
  },

  infoBox: {
    background: "#fff7f0",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "12px",
    marginTop: "10px"
  },

  applyBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  /* 🟠 MODAL */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    width: "300px",
    textAlign: "center"
  },

  rangeBox: {
    background: "#fff7f0",
    padding: "10px",
    borderRadius: "10px",
    margin: "10px 0",
    fontSize: "13px"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #eee",
    marginBottom: "10px"
  },

  modalActions: {
    display: "flex",
    gap: "10px"
  },

  submitBtn: {
    flex: 1,
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  cancelBtn: {
    flex: 1,
    background: "#ddd",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default WorkerJobs;