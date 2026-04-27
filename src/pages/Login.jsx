import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState({});

  /* ================= VALIDATION ================= */
  const validate = () => {
    let err = {};

    if (!phone) {
      err.phone = "Phone number required";
    } else if (!/^03\d{9}$/.test(phone)) {
      err.phone = "Invalid phone format (03XXXXXXXXX)";
    }

    if (!password) {
      err.password = "Password required";
    } else if (password.length < 6) {
      err.password = "Min 6 characters required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ================= LOGIN ================= */
  const handleLogin = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("role", role);
      localStorage.setItem("phone", phone);

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

        {/* ================= PHONE ================= */}
        <input
          type="text"
          placeholder="Phone Number (03XXXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
        {errors.phone && <p style={styles.error}>{errors.phone}</p>}

        {/* ================= PASSWORD ================= */}
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

        {errors.password && <p style={styles.error}>{errors.password}</p>}

        {/* ================= ROLE ================= */}
        <div style={styles.dropdownWrapper}>
          <div style={styles.dropdownLabel}>Select Account Type</div>

          <div style={styles.dropdown} onClick={() => setOpen(!open)}>
            <div style={styles.dropdownSelected}>
              {role === "client"
                ? "👨‍💼 Client Account"
                : "🧑‍🔧 Worker Account"}
              <span style={{ float: "right" }}>
                {open ? "▲" : "▼"}
              </span>
            </div>

            <div
              style={{
                ...styles.dropdownOptions,
                maxHeight: open ? "120px" : "0px",
                opacity: open ? 1 : 0,
                transition: "all 0.25s ease-in-out",
                overflow: "hidden"
              }}
            >
              <div
                onClick={() => {
                  setRole("client");
                  setOpen(false);
                }}
                style={styles.option}
              >
                👨‍💼 Client Account
              </div>

              <div
                onClick={() => {
                  setRole("worker");
                  setOpen(false);
                }}
                style={styles.option}
              >
                🧑‍🔧 Worker Account
              </div>
            </div>
          </div>
        </div>

        {/* ================= LOGIN BUTTON ================= */}
        <button onClick={handleLogin} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ================= SOCIAL LOGIN ================= */}
        <button style={styles.googleBtn}>
          🔵 Continue with Google
        </button>

        <button style={styles.fbBtn}>
          📘 Continue with Facebook
        </button>

        {/* ================= FOOTER ================= */}
        <div style={styles.footer}>
          <span style={{ cursor: "pointer" }}>
            Forgot Password?
          </span>

          <span
            onClick={() => navigate("/signup")}
            style={{ cursor: "pointer", color: "#ff6a00" }}
          >
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
    background: "linear-gradient(135deg,#fff7ed,#fff)",
    padding: "16px"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "22px",
    borderRadius: "18px",
    background: "#fff",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
    textAlign: "center"
  },

  badge: {
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#fff3e6",
    color: "#ff6a00",
    fontSize: "12px",
    marginBottom: "10px"
  },

  title: { fontSize: "22px", margin: "5px 0" },
  subtitle: { fontSize: "13px", color: "#666", marginBottom: "15px" },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ffd2b3",
    marginBottom: "8px",
    outline: "none",
    boxSizing: "border-box",
  },

  passBox: {
    position: "relative"
  },

  eye: {
    position: "absolute",
    right: "12px",
    top: "12px",
    cursor: "pointer"
  },

  error: {
    color: "red",
    fontSize: "12px",
    textAlign: "left",
    marginBottom: "6px"
  },

  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#ff6a00,#ff9f1c)",
    color: "#fff",
    fontWeight: "600",
    marginTop: "10px",
    cursor: "pointer"
  },

  googleBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff",
    cursor: "pointer"
  },

  fbBtn: {
    width: "100%",
    padding: "12px",
    marginTop: "8px",
    borderRadius: "10px",
    border: "none",
    background: "#1877F2",
    color: "#fff",
    cursor: "pointer"
  },

  footer: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#777"
  },

  dropdownWrapper: { textAlign: "left", marginTop: "10px" },

  dropdownLabel: { fontSize: "12px", color: "#666", marginBottom: "6px" },

  dropdown: {
    border: "1px solid #ffd2b3",
    borderRadius: "10px",
    overflow: "hidden"
  },

  dropdownSelected: {
    padding: "12px",
    background: "#fff7ed"
  },

  dropdownOptions: {
    borderTop: "1px solid #ffe1cc"
  },

  option: {
    padding: "12px",
    cursor: "pointer"
  }
};