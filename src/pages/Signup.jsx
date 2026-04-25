import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("role", role);
      localStorage.setItem("user", username);
      localStorage.setItem("email", email);

      setLoading(false);
      navigate(role === "client" ? "/client" : "/worker");
    }, 800);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.badge}>✨ Create Account</div>

        <h2 style={styles.title}>Join RozgarNow</h2>
        <p style={styles.subtitle}>Create your account to continue</p>

        <div style={styles.form}>

          {/* USERNAME */}
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          {/* EMAIL */}
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            <span
              onClick={() => setShowPass(!showPass)}
              style={styles.eye}
            >
              {showPass ? "🙈" : "👁"}
            </span>
          </div>

          {/* CONFIRM PASSWORD */}
          <input
            type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={styles.input}
          />

          {/* ROLE SELECT (PREMIUM) */}
          <div style={styles.dropdownWrapper}>
            <div style={styles.dropdownLabel}>Select Account Type</div>

            <div style={styles.dropdown}>
              <div
                style={styles.dropdownSelected}
                onClick={() =>
                  setRole(role === "client" ? "worker" : "client")
                }
              >
                {role === "client"
                  ? "👨‍💼 Client Account"
                  : "🧑‍🔧 Worker Account"}
              </div>

              <div style={styles.hint}>
                Tap to switch role
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSignup}
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>

        <div style={styles.footer}>
          <span onClick={() => navigate("/")}>Already have account?</span>
        </div>

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
    padding: "16px",
    background: "linear-gradient(135deg,#fff7ed,#ffffff,#fff3e0)"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "24px",
    borderRadius: "18px",
    boxShadow: "0 20px 50px rgba(255,106,0,0.12)",
    textAlign: "center"
  },

  badge: {
    display: "inline-block",
    padding: "6px 12px",
    background: "#fff3e6",
    color: "#ff6a00",
    borderRadius: "20px",
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
    gap: "12px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ffd2b3",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box"
  },

  passBox: {
    position: "relative"
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "10px",
    cursor: "pointer"
  },

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
    background: "#fff7ed",
    cursor: "pointer",
    padding: "12px"
  },

  dropdownSelected: {
    fontSize: "14px",
    fontWeight: "500"
  },

  hint: {
    fontSize: "11px",
    color: "#999",
    marginTop: "4px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#ff6a00,#ff9f1c)",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "5px"
  },

  footer: {
    marginTop: "14px",
    fontSize: "12px",
    color: "#777",
    cursor: "pointer"
  }
};