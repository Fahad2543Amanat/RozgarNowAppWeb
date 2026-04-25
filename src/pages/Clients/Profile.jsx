/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

function Profile() {
  const [name, setName] = useState("Client User");
  const [email, setEmail] = useState("client@email.com");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("Tell something about yourself...");
  const [saved, setSaved] = useState(false);

  const jobsPosted = JSON.parse(localStorage.getItem("jobs")) || [];

  useEffect(() => {
    setName(localStorage.getItem("client_name") || "Client User");
    setEmail(localStorage.getItem("client_email") || "client@email.com");
    setPhone(localStorage.getItem("client_phone") || "");
    setAddress(localStorage.getItem("client_address") || "");
    setBio(localStorage.getItem("client_bio") || "Tell something about yourself...");
  }, []);

  const save = () => {
    localStorage.setItem("client_name", name);
    localStorage.setItem("client_email", email);
    localStorage.setItem("client_phone", phone);
    localStorage.setItem("client_address", address);
    localStorage.setItem("client_bio", bio);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h2>👤 Profile</h2>
        <p>Manage your account settings</p>
      </div>

      <div style={styles.wrapper}>

        {/* LEFT */}
        <div style={styles.left}>
          <div style={styles.card}>
            <div style={styles.avatar}>{initials}</div>
            <h3>{name}</h3>
            <p>{email}</p>
          </div>

          <div style={styles.card}>
            <h4>📊 Stats</h4>

            <div style={styles.row}>
              <span>Total Jobs</span>
              <b>{jobsPosted.length}</b>
            </div>

            <div style={styles.row}>
              <span>Active</span>
              <b>{jobsPosted.filter(j => j.status === "Active").length}</b>
            </div>

            <div style={styles.row}>
              <span>Completed</span>
              <b>{jobsPosted.filter(j => j.status === "Completed").length}</b>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <div style={styles.card}>
            <h3>Edit Profile</h3>

            <div style={styles.form}>

              {/* ✅ FIX APPLIED HERE */}
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                style={styles.input}
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={styles.input}
              />

              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                style={styles.input}
              />

              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                style={styles.input}
              />

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                style={styles.textarea}
              />

              <button onClick={save} style={styles.button}>
                {saved ? "✔ Saved" : "Save Profile"}
              </button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;

const styles = {
  page: {
    padding: "20px",
    fontFamily: "Arial",
    minHeight: "100vh",
    overflowX: "hidden",
    background: "linear-gradient(135deg,#fff7ed,#ffffff,#fff3e0)"
  },

  header: {
    marginBottom: "20px",
    color: "#ff6a00"
  },

  wrapper: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },

  left: {
    flex: "1",
    minWidth: "280px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  right: {
    flex: "2",
    minWidth: "320px"
  },

  /* 🔥 PREMIUM CARD */
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 10px 30px rgba(255,106,0,0.12)",
    border: "1px solid rgba(255,106,0,0.08)"
  },

  avatar: {
    width: "85px",
    height: "85px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#ff6a00,#ff9f1c,#ffb347)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
    boxShadow: "0 10px 25px rgba(255,106,0,0.25)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #ffe1cc",
    color: "#444"
  },

  /* ======================
     🔥 FORM STYLING
  ====================== */
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },

  input: {
    width: "95%",
    padding: "14px 14px",
    borderRadius: "12px",
    border: "1px solid #ffd2b3",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    transition: "0.3s",
    boxShadow: "inset 0 0 0 1px transparent"
  },

  textarea: {
    width: "95%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ffd2b3",
    minHeight: "110px",
    fontSize: "14px",
    outline: "none",
    resize: "none",
    background: "#fff"
  },

  /* 🔥 BUTTON PREMIUM */
  button: {
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(90deg,#ff6a00,#ff8c1a,#ffb347)",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(255,106,0,0.25)",
    transition: "0.3s"
  }
};