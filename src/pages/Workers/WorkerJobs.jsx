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
  // const [distances, setDistances] = useState({});

  const [isListening, setIsListening] = useState(false);

  const [flippedCard, setFlippedCard] = useState(null);

  const [detailJob, setDetailJob] = useState(null);

  const handleFlip = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
  };
  // useEffect(() => {
  // const generated = {};

//   jobs.forEach(job => {
//     generated[job._id] = Math.floor(Math.random() * 10) + 1;
//   });

//   setDistances(generated);

// }, [jobs]); // NEW ADDED

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

  const openDetailModal = (job) => {
  setDetailJob(job);
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
        <div
          key={job._id}
          style={{
            ...styles.cardContainer
          }}
          // onClick={() => handleFlip(job._id)}
        >

          {/* FLIP INNER */}
          <div
            style={{
              ...styles.cardInner,
              transform: flippedCard === job._id ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >

            {/* ================= FRONT SIDE ================= */}
            {/* ================= FRONT SIDE ================= */}
<div style={styles.cardFront}>

  {/* TOP HEADER */}
  <div style={styles.topSection}>

    {/* COMPANY NAME */}
    <div style={styles.companyName}>
      {job.companyName || "Company Name"}
    </div>

    {/* LOGO */}
    <div style={styles.logoWrapper}>

      <div style={styles.logo}>
        🏢
      </div>

    </div>

  </div>

  {/* CENTER CONTENT */}
  <div style={styles.centerSection}>

    {/* JOB TITLE */}
    <h3 style={styles.titles}>
      💼 {job.title || job.Title}
    </h3>

    {/* DETAILS */}
    <div style={styles.infoBox}>

      <div style={styles.infoItem}>
        <span>💰 Budget</span>
        <strong>
          {job.budgetMin} - {job.budgetMax}
        </strong>
      </div>

      <div style={styles.infoItem}>
        <span>⭐ Rating</span>
        <strong>4.5</strong>
      </div>

      <div style={styles.infoItem}>
        <span>📍 Location</span>
        <strong>{job.location || job.Location}</strong>
      </div>

      <div style={styles.infoItem}>
        <span>⏰ Deadline</span>
        <strong>{job.deadline || job.Deadline}</strong>
      </div>

      <div style={styles.infoItem}>
        <span>🕒 Time</span>
        <strong>{job.time || job.Time}</strong>
      </div>

    </div>

  </div>

  {/* BOTTOM BUTTON SECTION */}
  <div style={styles.bottomSection}>

    <div style={styles.btnRow}>

      <button
         onClick={(e) => {
    e.stopPropagation(); // card flip stop
    openDetailModal(job); // open modal
  }}
        style={styles.flipBtn}
      >
        View Details
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          openBidModal(job);
        }}
        style={styles.applyBtn}
      >
        Apply Now
      </button>

    </div>

  </div>

</div>

            {/* ================= BACK SIDE ================= */}
            <div style={styles.cardBack}>

              <h3 style={{ color: "#ff6a00" }}>Job Description</h3>

              <p style={{ padding: "10px", lineHeight: "1.6" }}>
                {job.description}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip(job._id);
                }}
                style={styles.backBtn}
              >
                Back
              </button>

            </div>

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

      {/* ================= VIEW DETAILS MODAL ================= */}
{detailJob && (
  <div style={styles.modalOverlay} onClick={() => setDetailJob(null)}>

    {/* prevent closing when clicking inside modal */}
    <div
      style={styles.modal}
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}
      <h2 style={{ color: "#ff6a00", marginBottom: "10px" }}>
        💼 Job Description
      </h2>
      
      {/* DESCRIPTION */}
      <div
        style={{
          marginTop: "12px",
          padding: "12px",
          background: "#fff7f2",
          borderRadius: "10px",
          fontSize: "13px",
          color: "#444",
          lineHeight: "1.5"
        }}
      >
        {detailJob.description}
      </div>

      {/* CLOSE BUTTON */}
      <button
        onClick={() => setDetailJob(null)}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "10px",
          background: "#ff6a00",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600"
        }}
      >
        Close
      </button>

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

  bottomSection: {
  padding: "18px",
  borderTop: "1px solid rgba(255,106,0,0.08)",
  background: "#fff",
},

btnRow: {
  display: "flex",
  gap: "12px",
},

  // btnRow: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   marginTop: "10px",
  // },



  /* ================= GRID ================= */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "16px"
  },

 cardContainer: {
  perspective: "1200px",
  width: "100%",
  maxWidth: "460px",
  height: "520px",
  margin: "0 auto",
  cursor: "pointer",
},

cardInner: {
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 0.8s",
},

cardFront: {
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  borderRadius: "24px",
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 10px 30px rgba(255,106,0,0.15)",
  border: "1px solid rgba(255,106,0,0.12)",
  display: "flex",
  flexDirection: "column",
},
topSection: {
  background: "linear-gradient(135deg, #ff6a00, #ff8c42)",
  padding: "20px",
  // borderBottomLeftRadius: "10px",
  // borderBottomRightRadius: "10px",
  textAlign: "center",
  position: "relative",
  height:'10px'
},


  cardBack: {
    position: "absolute",
    width: "90%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    background: "#f9fafb",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  },

companyName: {
  color: "#fff",
  fontSize: "20px",
  fontWeight: "700",
  letterSpacing: "0.5px",
  marginBottom: "10px", // was 18px
},
logoWrapper: {
  display: "flex",
  justifyContent: "center",
  marginBottom: "12px", // was -50px
},


 logo: {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#fff",
  border: "1px solid #ff6803",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.18)",
},
centerSection: {
  padding: "45px 22px 18px", // was 65px top
},

titles: {
  textAlign: "center",
  color: "#ff6a00",
  fontSize: "20px",
  fontWeight: "800",
  marginBottom: "2px", // was 22px
},

  /* ================= CARD ================= */
  // card: {
  //   border: "1px solid #ff6a00",
  //   background: "#fff",
  //   padding: "10px",
  //   borderRadius: "14px",
  //   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  //   // display: "flex",
  //   flexDirection: "column",
  //   // gap: "8px"
  // },

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
  display: "flex",
  flexDirection: "column",
  gap: "12px",
},

infoItem: {
  background: "#fff7f2",
  border: "1px solid rgba(255,106,0,0.12)",
  borderRadius: "14px",
  padding: "12px 14px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "14px",
  color: "#444",
  fontWeight: "500",
},
  timeBox: {
  // marginTop: "8px",
  // padding: "8px 10px",
  // background: "#fff3e8",
  // borderRadius: "10px",
  fontSize: "13px",
  color: "#292828",
  lineHeight: "1.7"
},

  /* ================= BUTTON ================= */
  applyBtn: {
  flex: 1,
  background: "linear-gradient(135deg, #ff6a00, #ff8c42)",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(255,106,0,0.25)",
  transition: "0.3s",
},

  flipBtn: {
  flex: 1,
  background: "#fff3eb",
  color: "#ff6a00",
  border: "none",
  padding: "12px",
  borderRadius: "14px",
  fontWeight: "700",
  cursor: "pointer",
  transition: "0.3s",
},

  backBtn: {
    marginTop: "15px",
    background: "#ff6a00",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    width: "100%",
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