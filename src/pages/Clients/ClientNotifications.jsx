import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientNotifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, text: "New applicant applied for React Developer job", time: "2 min ago", read: false },
    { id: 2, text: "Your job proposal has been accepted", time: "10 min ago", read: false },
    { id: 3, text: "Worker completed assigned task", time: "1 hour ago", read: true },
    { id: 4, text: "New message received from Ali Khan", time: "3 hours ago", read: false },
    { id: 5, text: "Payment successfully processed", time: "Yesterday", read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const deleteNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={{ margin: 0 }}>Notifications 🔔</h2>
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* LIST */}
      <div style={styles.list}>

        {notifications.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>
            No notifications found
          </p>
        )}

        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              ...styles.card,
              background: n.read ? "#fff" : "#fff7ed",
              borderLeft: n.read ? "3px solid #ddd" : "3px solid #ff7a00"
            }}
            onClick={() => markAsRead(n.id)}
          >

            {/* TEXT */}
            <div>
              <p style={{ margin: 0, fontWeight: "600" }}>
                {n.text}
              </p>

              <small style={{ color: "#888" }}>
                {n.time}
              </small>
            </div>

            {/* ACTIONS */}
            <div style={styles.actions}>
              {!n.read && <span style={styles.unreadDot}>●</span>}

              <button
                style={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotif(n.id);
                }}
              >
                Delete
              </button>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ClientNotifications;

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: 20,
    background: "#fff",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  backBtn: {
    background: "#ff7a00",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    cursor: "pointer"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
    cursor: "pointer",
    transition: "0.3s"
  },

  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },

  unreadDot: {
    color: "#ff7a00",
    fontSize: 18
  },

  deleteBtn: {
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "5px 8px",
    borderRadius: 6,
    cursor: "pointer"
  }
};