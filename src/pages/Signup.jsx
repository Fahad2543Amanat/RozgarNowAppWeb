import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  

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

  const validate = () => {
  let newErrors = {};

  /* ================= COMMON ================= */
  if (!password) newErrors.password = "Password required";
  if (password.length < 6) newErrors.password = "Min 6 characters";

  if (password !== confirm) newErrors.confirm = "Passwords do not match";

  /* ================= WORKER ================= */
  if (role === "worker") {
    // ✅ STEP BASED VALIDATION
    if (step >= 1) {
      if (!worker.name) newErrors.name = "Full name required";

      if (!worker.phone) newErrors.phone = "Phone required";
      else if (!/^03\d{9}$/.test(worker.phone))
        newErrors.phone = "Invalid phone (03XXXXXXXXX)";

      if (!worker.cnic) newErrors.cnic = "CNIC required";
      else if (!/^\d{13}$/.test(worker.cnic))
        newErrors.cnic = "CNIC must be 13 digits";

      if (!worker.city) newErrors.city = "City required";
    }
    if (step >= 2) {
      if (worker.skills.length === 0)
        newErrors.skills = "Select at least one skill";

      if (!worker.experience)
        newErrors.experience = "Experience required";
    }
    if (step >= 4) {
      if (!worker.location)
        newErrors.location = "Location required";

      if (!worker.radius)
        newErrors.radius = "Radius required";
    }
  }

  /* ================= CLIENT ================= */
  if (role === "client") {
    if (!client.company) newErrors.company = "Company name required";

    if (!client.owner) newErrors.owner = "Owner name required";

    if (!client.phone) newErrors.phone = "Phone required";
    else if (!/^03\d{9}$/.test(client.phone))
      newErrors.phone = "Invalid phone number";

    if (!client.category)
      newErrors.category = "Business category required";

    if (!client.address)
      newErrors.address = "Address required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const validateStep1 = () => {
  let err = {};

  if (!worker.name?.trim())
    err.name = "Full name required";

  if (!worker.phone?.trim())
    err.phone = "Phone required";
  else if (!/^03\d{9}$/.test(worker.phone))
    err.phone = "Invalid phone (03XXXXXXXXX)";

  if (!worker.cnic?.trim())
    err.cnic = "CNIC required";
  else if (!/^\d{13}$/.test(worker.cnic))
    err.cnic = "CNIC must be 13 digits";

  if (!worker.city?.trim())
    err.city = "City required";

  setErrors(err);
  return Object.keys(err).length === 0;
};

const validateStep2 = () => {
  let err = {};

  if (!worker.skills || worker.skills.length === 0)
    err.skills = "Select at least one skill";

  if (!worker.experience)
    err.experience = "Experience required";
  else if (isNaN(worker.experience))
    err.experience = "Must be a number";

  setErrors(err);
  return Object.keys(err).length === 0;
};
// const validateStep3 = () => {
//   // File uploads optional rakh sakte ho
//   let err = {};

//   // agar mandatory karna ho to uncomment:
//   // if (!worker.cnicFront) err.file = "Upload CNIC front";

//   setErrors(err);
//   return Object.keys(err).length === 0;
// };
const validateStep4 = () => {
  let err = {};

  if (!worker.location?.trim())
    err.location = "Location required";

  if (!worker.radius)
    err.radius = "Radius required";
  else if (isNaN(worker.radius))
    err.radius = "Must be a number";

  setErrors(err);
  return Object.keys(err).length === 0;
};

  const handleSubmit = () => {
  if (!validate()) return;

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
            {errors.company && <p style={styles.error}>{errors.company}</p>}

            <input placeholder="Owner Name"
              onChange={e=>setClient({...client, owner:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />
            {errors.owner && <p style={styles.error}>{errors.owner}</p>}

            <input placeholder="exp: 03123456789"
              onChange={e=>setClient({...client, phone:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />
            {errors.phone && <p style={styles.error}>{errors.phone}</p>}

            <input placeholder="Business Category"
              onChange={e=>setClient({...client, category:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />
            {errors.category && <p style={styles.error}>{errors.category}</p>}

            <input placeholder="Address"
              onChange={e=>setClient({...client, address:e.target.value})}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />
            {errors.address && <p style={styles.error}>{errors.address}</p>}

            <h4>Upload Documents</h4>
            <p style={styles.uploadfiletext}>Upload Logo Image <span style={{color:"red"}}>*</span></p>
            <input type="file" style={styles.file}/>
            <p style={styles.uploadfiletext}>Upload Business documents <span style={{color:"red"}}>*</span></p>
            <input type="file" style={styles.file}/>
            <p style={styles.uploadfiletext}>Upload NTN(optional)</p>
            <input type="file" style={styles.file}/>

            {/* PASSWORD */}
            <div style={styles.passBox}>
            <input type={showPassword ? "text" : "password"} placeholder="Password"
              onChange={e=>setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
              
            />
            <span
    onClick={() => setShowPassword(!showPassword)}
    style={styles.eye}
  >
    {showPassword ? "🙈" : "👁"}
  </span>

            </div>
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          {/* // Confirm password */}
          <div style={styles.passBox}>
            <input type={showConfirm ? "text" : "password"} placeholder="Confirm Password"
              onChange={e=>setConfirm(e.target.value)}
              style={styles.input}
              onFocus={(e) => e.target.style.border = "1px solid #ff6a00"}
              onBlur={(e) => e.target.style.border = "1px solid #ffd2b3"}
            />
            <span
          onClick={() => setShowConfirm(!showConfirm)}
          style={styles.eye}
            >
            {showConfirm ? "🙈" : "👁"}
            </span>

          </div>
            

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
            <p style={styles.alreadyaccount}
            onClick={() => navigate("/login")}
            >
              Already have an account?
            </p>
          </>
        )}

        {/* ================= WORKER FLOW ================= */}
        {role === "worker" && (
  <>

    {/* ================= STEP 1 ================= */}
    {step === 1 && (
      <>
        <input
          placeholder="Full Name"
          value={worker.name}
          onChange={(e) => setWorker({ ...worker, name: e.target.value })}
          style={styles.input}
          onFocus={(e) => (e.target.style.border = "1px solid #ff6a00")}
          onBlur={(e) => (e.target.style.border = "1px solid #ffd2b3")}
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        <input
          placeholder="exp: 03123456789"
          value={worker.phone}
          onChange={(e) => setWorker({ ...worker, phone: e.target.value })}
          style={styles.input}
        />
        {errors.phone && <p style={styles.error}>{errors.phone}</p>}

        <input
          placeholder="exp: 3110387746578"
          value={worker.cnic}
          onChange={(e) => setWorker({ ...worker, cnic: e.target.value })}
          style={styles.input}
        />
        {errors.cnic && <p style={styles.error}>{errors.cnic}</p>}

        <input
          placeholder="City"
          value={worker.city}
          onChange={(e) => setWorker({ ...worker, city: e.target.value })}
          style={styles.input}
        />
        {errors.city && <p style={styles.error}>{errors.city}</p>}

        <button
          onClick={() => {
            if (!validateStep1()) return;
            setStep(2);
          }}
          style={styles.btn}
        >
          Continue
        </button>
      </>
    )}

    {/* ================= STEP 2 ================= */}
    {step === 2 && (
      <>
        <h4>Select Skills</h4>
        {errors.skills && <p style={styles.error}>{errors.skills}</p>}

        <div style={styles.skills}>
          {skillsList.map((skill) => (
            <div
              key={skill}
              onClick={() => toggleSkill(skill)}
              style={{
                ...styles.skill,
                background: worker.skills.includes(skill) ? "#ff6a00" : "#fff",
                color: worker.skills.includes(skill) ? "#fff" : "#000",
                transform: worker.skills.includes(skill) ? "scale(1.05)" : "scale(1)",
              }}
            >
              {skill}
            </div>
          ))}
        </div>

        <input
          placeholder="Experience Years"
          value={worker.experience}
          onChange={(e) =>
            setWorker({ ...worker, experience: e.target.value })
          }
          style={styles.input}
        />
        {errors.experience && <p style={styles.error}>{errors.experience}</p>}

        <div style={styles.row}>
          <button onClick={() => setStep(1)} style={styles.back}>
            Back
          </button>

          <button
            onClick={() => {
              if (!validateStep2()) return;
              setStep(3);
            }}
            style={styles.btn}
          >
            Next
          </button>
        </div>
      </>
    )}

    {/* ================= STEP 3 ================= */}
    {step === 3 && (
      <>
        <h4>Upload Verification</h4>

        <input type="file" style={styles.file} />
        <input type="file" style={styles.file} />
        <input type="file" style={styles.file} />

        <div style={styles.row}>
          <button onClick={() => setStep(2)} style={styles.back}>
            Back
          </button>

          <button onClick={() => setStep(4)} style={styles.btn}>
            Next
          </button>
        </div>
      </>
    )}

    {/* ================= STEP 4 ================= */}
    {step === 4 && (
      <>
        <h4>Location Setup</h4>

        <button
          onClick={getLocation}
          style={styles.btn}
        >
          📍 Detect Location (GPS)
        </button>

        {errors.location && <p style={styles.error}>{errors.location}</p>}

        <input
          placeholder="Or Enter City Manually"
          value={worker.location}
          onChange={(e) =>
            setWorker({ ...worker, location: e.target.value })
          }
          style={styles.input}
        />

        <input
          placeholder="Job Radius (e.g. 5km)"
          value={worker.radius}
          onChange={(e) =>
            setWorker({ ...worker, radius: e.target.value })
          }
          style={styles.input}
        />
        {errors.radius && <p style={styles.error}>{errors.radius}</p>}

        <div style={styles.row}>
          <button onClick={() => setStep(3)} style={styles.back}>
            Back
          </button>

          <button
            onClick={() => {
              if (!validateStep4()) return;
              setStep(5);
            }}
            style={styles.btn}
          >
            Next
          </button>
        </div>
      </>
    )}

    {/* ================= STEP 5 ================= */}
    {step === 5 && (
      <>
      <div style={styles.passBox}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <span
    onClick={() => setShowPassword(prev => !prev)}
    style={styles.eye}
  >
    {showPassword ? "🙈" : "👁"}
  </span>
      </div>
        {errors.password && <p style={styles.error}>{errors.password}</p>}

      <div style={styles.passBox}>
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={styles.input}
        />
        <span
    onClick={() => setShowConfirm(prev => !prev)}
    style={styles.eye}
  >
    {showConfirm ? "🙈" : "👁"}
  </span>

      </div>
        {errors.confirm && <p style={styles.error}>{errors.confirm}</p>}

        {/* STATUS */}
        <p style={{ color: "#ff6a00", fontSize: "12px" }}>
          Verification: {worker.verificationStatus}
        </p>

        <button
          onClick={handleSubmit}
          style={styles.btn}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
        <p style={styles.alreadyaccount}
            onClick={() => navigate("/login")}
            >
              Already have an account?
            </p>
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
  uploadfiletext:{
    fontSize: "12px",
    color: "#666",
    marginTop: "5px"
  },
  /* ================= SMALL TEXT ================= */
  smallText: {
    fontSize: "12px",
    color: "#666",
    marginTop: "5px"
  },
  error: {
  color: "red",
  fontSize: "12px",
  marginTop: "-5px",
  marginBottom: "8px",
  marginLeft: "10px"
},
passBox: {
  position: "relative"
},

eye: {
  position: "absolute",
  right: "12px",
  top: "12px",
  cursor: "pointer",
  fontSize: "14px"
},
alreadyaccount:{
  color :"#ff6a00",
  fontSize:"12px",
  textAlign:'center',
  cursor:'pointer'
},
  /* ================= RESPONSIVE ================= */
  /* 👉 mobile ke liye card thoda full width */
  "@media (max-width: 480px)": {
    card: {
      padding: "16px"
    }
  }
};