import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter username & password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("role", role);
      localStorage.setItem("user", username);

      setLoading(false);
      navigate(role === "client" ? "/client" : "/worker");
    }, 700);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.badge}>🔐 Secure Login</div>

        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to continue</p>

        {/* INPUTS WRAPPER (IMPORTANT FIX) */}
        <div style={styles.form}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          {/* PASSWORD */}
          <div style={styles.passBox}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <span onClick={() => setShowPass(!showPass)} style={styles.eye}>
              {showPass ? "🙈" : "👁"}
            </span>
          </div>

          {/* 🔥 CUSTOM PREMIUM ROLE DROPDOWN */}
          <div style={styles.dropdownWrapper}>
  <div style={styles.dropdownLabel}>Select Account Type</div>

  <div
    style={styles.dropdown}
    onClick={() => setOpen(!open)}
  >
    <div style={styles.dropdownSelected}>
      {role === "client"
        ? "👨‍💼 Client Account"
        : "🧑‍🔧 Worker Account"}
      <span style={{ float: "right" }}>
        {open ? "▲" : "▼"}
      </span>
    </div>

    {/* SMOOTH ANIMATION WRAPPER */}
    <div
      style={{
        ...styles.dropdownOptions,
        maxHeight: open ? "120px" : "0px",
        opacity: open ? 1 : 0,
        transform: open ? "scaleY(1)" : "scaleY(0.95)",
        transition: "all 0.25s ease-in-out",
        overflow: "hidden"
      }}
    >
      <div
        onClick={() => {
          setRole("client");
          setOpen(false);
        }}
        style={{
          ...styles.option,
          background: role === "client" ? "#fff3e6" : "#fff"
        }}
      >
        👨‍💼 Client Account
      </div>

      <div
        onClick={() => {
          setRole("worker");
          setOpen(false);
        }}
        style={{
          ...styles.option,
          background: role === "worker" ? "#fff3e6" : "#fff"
        }}
      >
        🧑‍🔧 Worker Account
      </div>
    </div>
  </div>
</div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Logging in..." : `Continue as ${role}`}
          </button>

        </div>

        <div style={styles.footer}>
          <span>Forgot Password?</span>
          <span onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
  Create Account
        </span>
        </div>

      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    background: "linear-gradient(135deg,#fff7ed,#ffffff,#fff3e0)",
    boxSizing: "border-box"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "22px",
    borderRadius: "18px",
    background: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
    textAlign: "center",
    boxSizing: "border-box"   // 🔥 IMPORTANT FIX
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#fff3e6",
    color: "#ff6a00",
    fontSize: "12px",
    marginBottom: "10px"
  },

  title: {
    margin: "5px 0",
    fontSize: "22px"
  },

  subtitle: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "18px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ffd2b3",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"   // 🔥 IMPORTANT FIX
  },

  passBox: {
    position: "relative",
    width: "100%"
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "10px",
    cursor: "pointer"
  },
    /* 🔥 DROPDOWN */
  dropdownWrapper: {
    textAlign: "left"
  },

  dropdownLabel: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "6px"
  },

  dropdown: {
    border: "1px solid #ffd2b3",
    borderRadius: "10px",
    overflow: "hidden",
    background: "#fff"
  },

  dropdownSelected: {
    padding: "12px",
    background: "#fff7ed",
    fontSize: "14px"
  },

  dropdownOptions: {
    borderTop: "1px solid #ffe1cc"
  },

  option: {
    padding: "12px",
    cursor: "pointer",
    fontSize: "14px",
    borderBottom: "1px solid #f3f3f3"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#ff6a00,#ff9f1c)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },

  footer: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#777"
  }
};