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

  // 🟡 FILTER STATES (NEW ADDED)
  const [category, setCategory] = useState("All");
  const [distance, setDistance] = useState(10);
  const [jobType, setJobType] = useState("All");
  const [distances, setDistances] = useState({});

  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
  const generated = {};

  jobs.forEach(job => {
    generated[job._id] = Math.floor(Math.random() * 10) + 1;
  });

  setDistances(generated);

}, [jobs]); // NEW ADDED

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

  const startVoiceSearch = () => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support voice search");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // you can change to "ur-PK"
  recognition.interimResults = false;

  setIsListening(true);

  recognition.start();

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;

    console.log("VOICE INPUT:", text);

    setSearch(text); // 🔥 auto fill search input
    setIsListening(false);
  };

  recognition.onerror = () => {
    setIsListening(false);
    alert("Voice recognition failed");
  };

  recognition.onend = () => {
    setIsListening(false);
  };
};
   // ================= FILTER =================
  const filteredJobs = jobs.filter(job => {
    const matchSearch =
      (job.title || job.Title || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      category === "All" || job.category === category;

    const matchType =
      jobType === "All" || job.jobType === jobType;

    return matchSearch && matchCategory && matchType;
  });

  // 🚀 OPEN MODAL
  const openBidModal = (job) => {
    const exists = myJobs.find(j => j._id === job._id);

    if (exists) {
      alert("⚠ Already Applied");
      return;
    }

    setSelectedJob(job);
  };

//   const submitBid = async () => {
//   try {
//     if (!selectedJob) return;

//     const user = JSON.parse(localStorage.getItem("user"));

//     console.log("SELECTED JOB:", selectedJob);

//     const payload = {
//       // 🔥 EXISTING
//       JobId: selectedJob.id,
//       ClientId: selectedJob.clientId,
//       WorkerId: user.id || user._id,
//       BidAmount: bidAmount || "Accept Range",

//       // 🔥 NEW DATA (IMPORTANT)
//       JobTitle: selectedJob.title,
//       BudgetMin: selectedJob.budgetMin,
//       BudgetMax: selectedJob.budgetMax,

//       WorkerName: user.name || user.fullName || "Worker",
//       WorkerLocation: user.location || "Unknown"
//     };

//     console.log("BID PAYLOAD:", payload);

//     await axios.post(
//       `${import.meta.env.VITE_API_URL}/bid/create`,
//       payload
//     );

//     alert("✅ Bid Submitted Successfully");

//     setSelectedJob(null);
//     setBidAmount("");

//   } catch (error) {
//     console.log("BID ERROR:", error.response?.data || error);
//     alert(
//       error.response?.data?.message ||
//       JSON.stringify(error.response?.data) ||
//       "Bid failed"
//     );
//   }
// };
const submitBid = async () => {
  try {
    if (!selectedJob) return;

    const user = JSON.parse(localStorage.getItem("user"));

    console.log("SELECTED JOB:", selectedJob);
    console.log("USER:", user);

    const payload = {
      // 🔥 REQUIRED (exact same as backend model)
      JobId: selectedJob.id,
      ClientId: selectedJob.clientId,
      WorkerId: user.id || user._id,

      BidAmount: bidAmount || "Accept Range",

      // 🔥 NEW REQUIRED FIELDS
      JobTitle: selectedJob.title,          // ✅ FIX
      BudgetMin: selectedJob.budgetMin,     // ✅ FIX
      BudgetMax: selectedJob.budgetMax,     // ✅ FIX

      WorkerName: user.name || user.username || "Worker",   // ✅ FIX
      WorkerLocation: user.location || "Pakistan"           // ✅ FIX
    };

    console.log("FINAL PAYLOAD:", payload);

    await axios.post(
      `${import.meta.env.VITE_API_URL}/bid/create`,
      payload
    );

    alert("✅ Bid Submitted Successfully");

    setSelectedJob(null);
    setBidAmount("");

  } catch (error) {
    console.log("BID ERROR FULL:", error.response?.data);
    alert(JSON.stringify(error.response?.data));
  }
};
  return (
    <div style={styles.container}>

      {/* HEADER */}
      <h2 style={styles.title}>📦 FIND JOBS</h2>

      {/* SEARCH */}
      {/* ================= SEARCH BAR ================= */}
      <div style={styles.searchBox}>
        <input
          placeholder="🔍 Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {/* 🎤 Voice Search (NEW ADDED UI ONLY) */}
        <button
  onClick={startVoiceSearch}
  style={{
    ...styles.voiceBtn,
    background: isListening ? "#ff6a00" : "#eee",
    color: isListening ? "#fff" : "#000",
    transform: isListening ? "scale(1.1)" : "scale(1)"
  }}
>
  {isListening ? "🎙️ Listening..." : "🎤"}
</button>
      </div>

      {/* ================= FILTERS ================= */}
      <div style={styles.filterBox}>

        {/* Category Filter */}
        <select 
        style={styles.filterBtn}
        onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Cleaning</option>
          <option>Plumbing</option>
          <option>Delivery</option>
        </select>

        {/* Job Type Filter */}
        <select 
        style={styles.filterBtn}
        onChange={(e) => setJobType(e.target.value)}>
          <option>All</option>
          <option>Full Time</option>
          <option>Part Time</option>
        </select>

        {/* Distance Filter */}
        <div style={styles.range}>
        <input
          
          type="range"
          min="1"
          max="50"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <span>{distance} KM</span>

        </div>

      </div>

      {/* ================= JOB CARDS ================= */}
      <div style={styles.grid}>

        {filteredJobs.map(job => (
          <div key={job._id} style={styles.card}>

            {/* JOB TITLE */}
            <h3 style={{color: "#ff6a00", padding:'2px'}}>💼 {job.title || job.Title}</h3>

            {/* DESCRIPTION */}
            <p style={{ padding:'3px'}}>{job.description}</p>

            {/* INFO */}
            <div style={styles.infoBox}>
              💰 {job.budgetMin} - {job.budgetMax} <br />

              {/* ⭐ Employer Rating (NEW UI PLACEHOLDER) */}
              ⭐ Rating: 4.5 <br />

              {/* 📍 Distance (NEW UI PLACEHOLDER) */}
              📍 {distances[job._id]} km <br />

              {/* ⏰ Time Posted */}
              ⏰ Just now
            </div>

            {/* BUTTONS */}
            <div style={styles.btnRow}>

              {/* ⭐ SAVE JOB (NEW ADDED) */}
              <button style={styles.saveBtn}>
                ⭐ Save
              </button>

              {/* APPLY */}
              <button
                onClick={() => openBidModal(job)}
                style={styles.applyBtn}
              >
                Apply
              </button>

            </div>

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

/* 🎨 MODERN ORANGE + CLEAN WHITE UI */
const styles = {

  container: {
    padding: "24px",
    fontFamily: "Inter, Arial, sans-serif",
    background: "#f8f9fb",
    minHeight: "100vh"
  },

  title: {
    color: "#ff6a00",
    marginBottom: "16px",
    fontSize: "22px",
    fontWeight: "700"
  },

  /* ================= SEARCH SECTION ================= */
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  search:{
    flex: 1,
    minWidth: "200px",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #ff6a00",
    outline: "none",
    background: "#fff",
    fontSize: "14px"
  },


  voiceBtn: {
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #ff6a00",
    background: "#fff",
    cursor: "pointer"
  },

  /* ================= FILTER ================= */
  filterBox: {
    display: "flex",
    gap: "8px",
    marginBottom: "18px",
    flexWrap: "wrap",
    // border: "1px solid #e01c1c",
  },

  filterBtn: {
    padding: "7px 12px",
    borderRadius: "20px",
    border: "1px solid #ff6a00",
    background: "#fff",
    cursor: "pointer",
    fontSize: "12px",
    transition: "0.2s"
  },

  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  saveBtn: {
    padding: "12px",
    borderRadius: "12px",
    // border: "none",
    background: "#fff",
    color: "#000000",
    fontWeight: "600",
    cursor: "pointer",
    border: "1px solid #ff6a00",
  },

  btnRow :{
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
    alignItems: "center",
    flexWrap: "wrap",
  },


  /* ================= GRID ================= */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "16px"
  },

  /* ================= CARD ================= */
  card: {
    border: "1px solid #ff6a00",
    background: "#fff",
    padding: "10px",
    borderRadius: "14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    // display: "flex",
    flexDirection: "column",
    // gap: "8px"
  },

  jobTitle: {
    margin: 0,
    color: "#ff6a00",
    fontSize: "16px",
    fontWeight: "700"
  },

  desc: {
    fontSize: "13px",
    color: "#666",
    lineHeight: "1.4"
  },

  infoBox: {
    background: "#fff7f0",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "12px",
    lineHeight: "1.5",
    color: "#0e0e0e",
    // border: "1px solid green",
    marginBottom: "12px",
    fontWeight:'bold'
    
  },

  /* ================= BUTTON ================= */
  applyBtn: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },

  /* ================= MODAL ================= */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  modal: {
    background: "#fff",
    padding: "22px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  },

  rangeBox: {
    background: "#fff7f0",
    padding: "12px",
    borderRadius: "10px",
    margin: "12px 0",
    fontSize: "13px",
    color: "#444"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    marginBottom: "12px",
    outline: "none",
    boxSizing: "border-box"
  },
  range:{
    // border :"1px solid red",
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
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
    padding: "11px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  },

  cancelBtn: {
    flex: 1,
    background: "#e5e5e5",
    border: "none",
    padding: "11px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "500"
  }
};

export default WorkerJobs;