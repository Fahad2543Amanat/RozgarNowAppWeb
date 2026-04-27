import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  

  /* ================= COMMON ================= */
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  /* ================= WORKER ================= */
  const [worker, setWorker] = useState({
    name: "",
    phone: "",
    cnic: "",
    city: "",
    skills: [],
    experience: "",
    location: "",
    radius: "10km",
    verificationStatus: "Pending", // ✅ NEW
  });

  const skillsList = [
    "Electrician","Plumber","Carpenter","Driver",
    "Painter","Welder","Cook","Cleaner"
  ];

  /* ================= CLIENT ================= */
  const [client, setClient] = useState({
    company: "",
    owner: "",
    phone: "",
    category: "",
    address: "",
    verificationStatus: "Pending",
  });

  /* ================= HANDLERS ================= */

  const toggleSkill = (skill) => {
    if (worker.skills.includes(skill)) {
      setWorker({
        ...worker,
        skills: worker.skills.filter(s => s !== skill)
      });
    } else {
      setWorker({
        ...worker,
        skills: [...worker.skills, skill]
      });
    }
  };

  // ✅ FIXED GPS FUNCTION
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("GPS not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;

        setWorker({
          ...worker,
          location: coords
        });

        localStorage.setItem("userLocation", coords);

        alert("Location detected!");
      },
      () => alert("Location permission denied")
    );
  };

  const handleSubmit = () => {
    if (password !== confirm) return alert("Password mismatch");

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("role", role);

      if (role === "worker") {
        localStorage.setItem("workerData", JSON.stringify(worker));
      } else {
        localStorage.setItem("clientData", JSON.stringify(client));
      }

      setLoading(false);
      navigate(role === "client" ? "/client" : "/worker");
    }, 800);
  };

  /* ================= UI ================= */

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h2 style={styles.title}>Create Account</h2>

        {/* ROLE SWITCH */}
        <div style={styles.roleSwitch}>
          <button
            onClick={() => {setRole("client"); setStep(1);}}
            style={role==="client"?styles.activeRole:styles.roleBtn}
          >
            Client
          </button>

          <button
            onClick={() => {setRole("worker"); setStep(1);}}
            style={role==="worker"?styles.activeRole:styles.roleBtn}
          >
            Worker
          </button>
        </div>

        {/* ================= CLIENT FLOW ================= */}
        {role === "client" && (
          <>
            <input placeholder="Company Name"
              onChange={e=>setClient({...client, company:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />

            <input placeholder="Owner Name"
              onChange={e=>setClient({...client, owner:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />

            <input placeholder="Phone"
              onChange={e=>setClient({...client, phone:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />

            <input placeholder="Business Category"
              onChange={e=>setClient({...client, category:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />

            <input placeholder="Address"
              onChange={e=>setClient({...client, address:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />

            <h4>Upload Documents</h4>
            <input type="file" style={styles.file}/>
            <input type="file" style={styles.file}/>

            {/* PASSWORD */}
            <input type="password" placeholder="Password"
              onChange={e=>setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />

            <input type="password" placeholder="Confirm Password"
              onChange={e=>setConfirm(e.target.value)}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />

            {/* ✅ STATUS SHOW */}
            <p style={{color:"#ff6a00", fontSize:"12px"}}>
              Verification: {client.verificationStatus}
            </p>

            <button onClick={handleSubmit} style={styles.btn}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </>
        )}

        {/* ================= WORKER FLOW ================= */}
        {role === "worker" && (

          <>
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <input placeholder="Full Name"
                  onChange={e=>setWorker({...worker,name:e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />
                <input placeholder="Phone"
                  onChange={e=>setWorker({...worker,phone:e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />
                <input placeholder="CNIC"
                  onChange={e=>setWorker({...worker,cnic:e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />
                <input placeholder="City"
                  onChange={e=>setWorker({...worker,city:e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />

                <button onClick={()=>setStep(2)} style={styles.btn}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                  >
                  Continue
                </button>
              </>
            )}

            {/* STEP 2 - SKILLS */}
            {step === 2 && (
              <>
                <h4>Select Skills</h4>

                <div style={styles.skills}>
                  {skillsList.map(skill => (
                    <div
                      key={skill}
                      onClick={()=>toggleSkill(skill)}
                      style={{
                        ...styles.skill,
                        background: worker.skills.includes(skill)
                          ? "#ff6a00" : "#fff",
                          color: worker.skills.includes(skill) ? "#fff" : "#000",
                          transform: worker.skills.includes(skill) ? "scale(1.05)" : "scale(1)"
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>

                <input placeholder="Experience Years"
                  onChange={e=>setWorker({...worker,experience:e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
                  onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />

                <div style={styles.row}>
                  <button onClick={()=>setStep(1)} style={styles.back}>
                    Back
                  </button>
                  <button onClick={()=>setStep(3)} style={styles.btn}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 - UPLOAD */}
            {step === 3 && (
              <>
                <h4>Upload Verification</h4>
                <input type="file" style={styles.file} />
                <input type="file" style={styles.file}/>
                <input type="file" style={styles.file}/>

                <div style={styles.row}>
                  <button onClick={()=>setStep(2)} style={styles.back}>
                    Back
                  </button>
                  <button onClick={()=>setStep(4)} style={styles.btn}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* STEP 4 */}
            {/* STEP 4 - LOCATION */}
            {step === 4 && (
              <>
                <h4>Location Setup</h4>

                <button onClick={getLocation} style={styles.btn}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                  📍 Detect Location (GPS)
                </button>

                <input
                  placeholder="Or Enter City Manually"
                  onChange={e=>setWorker({...worker, location:e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />

                <input
                  placeholder="Job Radius (e.g. 5km)"
                  onChange={e=>setWorker({...worker, radius:e.target.value})}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />

                <div style={styles.row}>
                  <button onClick={()=>setStep(3)} style={styles.back}>
                    Back
                  </button>
                  <button onClick={()=>setStep(5)} style={styles.btn}
                    onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    >
                    Next
                  </button>
                </div>
              </>
            )}
            {/* STEP 5 - PASSWORD */}
            {step === 5 && (
              <>
                <input type="password" placeholder="Password"
                  onChange={e=>setPassword(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />

                <input type="password" placeholder="Confirm Password"
                  onChange={e=>setConfirm(e.target.value)}
                  style={styles.input}
                  onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
                />

                {/* ✅ STATUS */}
                <p style={{color:"#ff6a00", fontSize:"12px"}}>
                  Verification: {worker.verificationStatus}
                </p>

                <button onClick={handleSubmit} style={styles.btn}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.03)"}
  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default Signup;

/* ================= STYLES ================= */
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff7ed",
    padding: "15px"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 15px 40px rgba(255,106,0,0.15)", // 🔥 depth
    transition: "0.3s"
  },

  title: {
    textAlign: "center",
    color: "#ff6a00",
    marginBottom: "10px"
  },

  roleSwitch: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },

  roleBtn: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ff6a00",
    background: "#fff",
    cursor: "pointer",
     borderRadius: "10px",
     transition: "0.2s"
  },

  activeRole: {
    flex: 1,
    padding: "10px",
    background: "linear-gradient(90deg,#ff6a00,#ff9f1c)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #ffd2b3",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s" 
  },

  /* 👉 focus effect (important UX) */
  inputFocus: {
    border: "1px solid #ff6a00"
  },

  btn: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg,#ff6a00,#ff9f1c)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "5px",
    transition: "0.2s",
    marginBottom: "10px",
  },

  /* 👉 hover effect */
  btnHover: {
    transform: "scale(1.02)"
  },

  back: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ff6a00",
    background: "#fff",
    cursor: "pointer",
    borderRadius: "10px",
    marginBottom: "10px",
    
  },
  
  row: {
    display: "flex",
    gap: "10px"
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px"
  },

  skill: {
    padding: "8px 10px",
    border: "1px solid #ff6a00",
    borderRadius: "20px",
    cursor: "pointer"
  },
  /* ================= FILE UPLOAD ================= */
  file: {
    width: "100%",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "8px",
    border: "1px dashed #ff6a00",
    background: "#fff7ed",
    boxSizing: "border-box",
  },
  /* ================= SMALL TEXT ================= */
  smallText: {
    fontSize: "12px",
    color: "#666",
    marginTop: "5px"
  },
  /* ================= RESPONSIVE ================= */
  /* 👉 mobile ke liye card thoda full width */
  "@media (max-width: 480px)": {
    card: {
      padding: "16px"
    }
  }
};