import { useEffect, useState } from "react";
import axios from "axios";

function ClientBids() {

  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    const loadBids = async () => {
      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/bid/client/${user.id}`
        );

        console.log("API RESPONSE:", res.data);

        // ✅ DIRECT USE (NO NORMALIZATION)
        setBids(res.data.data || []);

      } catch (error) {
        console.log("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBids();
  }, [user?.id]);

  // ================= UPDATE STATUS =================
  const updateStatus = async (bidId, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/bid/update-status/${bidId}`,
        JSON.stringify(status),
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setBids(prev =>
        prev.map(b =>
          b.id === bidId ? { ...b, status } : b
        )
      );

    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={styles.container}>

      <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
  }}
>
  <div style={styles.titleIcon}>📥</div>

  <h2 style={styles.title}>
    Job Applications
  </h2>
</div>

      {bids.length === 0 && (
  <div style={styles.emptyWrapper}>
    <div style={styles.empty}>
      <div style={{ fontSize: "48px", marginBottom: "10px" }}>
        📭
      </div>

      <p style={{ margin: 0 }}>
        No applications yet
      </p>

      <span
        style={{
          display: "block",
          marginTop: "8px",
          fontSize: "14px",
          color: "#9ca3af",
          fontWeight: "400",
        }}
      >
        Applications will appear here once workers apply.
      </span>
    </div>
  </div>
)}
    <div style={styles.grid}>

      {bids.map(bid => (
        <div key={bid.id} style={styles.card}>

  <div style={styles.cardTopGlow}></div>

  {/* TITLE */}
  <h3 style={styles.titlebid}>
    💼 {bid.job?.title}
  </h3>

  {/* WORKER */}
  <div style={styles.infoRow}>
    <span>👷</span>
    <span>{bid.workerName || "Unknown Worker"}</span>
  </div>

  {/* CITY */}
  <div style={styles.infoRow}>
    <span>📍</span>
    <span>{bid.workerCity || "Location not available"}</span>
  </div>

  {/* BUDGET */}
  <div style={styles.budgetBox}>
    <div style={styles.infoRow}>
      <span>💰</span>
      <span>
        Budget: {bid.job?.budgetMin} - {bid.job?.budgetMax}
      </span>
    </div>

    <div style={styles.infoRow}>
      <span>💸</span>
      <span>Bid Amount: {bid.bidAmount}</span>
    </div>
  </div>

  {/* STATUS */}
  <div style={{ marginTop: 10 }}>
    <span style={{ fontWeight: "600", color: "#374151" }}>
      Status:
    </span>

    <span
      style={{
        ...styles.statusBadge,
        marginLeft: 10,
        background:
          bid.status === "Accepted"
            ? "#dcfce7"
            : bid.status === "Rejected"
            ? "#fee2e2"
            : "#fef3c7",

        color:
          bid.status === "Accepted"
            ? "#15803d"
            : bid.status === "Rejected"
            ? "#dc2626"
            : "#d97706",
      }}
    >
      {bid.status}
    </span>
  </div>

  {/* ACTIONS */}
  <div style={styles.actions}>
    <button
      onClick={() => updateStatus(bid.id, "Accepted")}
      style={styles.accept}
    >
      ✔ Accept
    </button>

    <button
      onClick={() => updateStatus(bid.id, "Rejected")}
      style={styles.reject}
    >
      ✖ Reject
    </button>
  </div>

</div>
      ))}
    </div>

    </div>
  );
}

export default ClientBids;

// ================= STYLES =================
const styles = {
  container: {
    padding: "20px",
    background: "#ffffff",
    minHeight: "100vh"
  },

title: {
  fontSize: "32px",
  fontWeight: "800",
  background: "linear-gradient(135deg, #ff7a00, #ffb347)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "28px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  letterSpacing: "-0.5px",
},

titleIcon: {
  background: "linear-gradient(135deg, #ff7a00, #ff9f43)",
  width: "52px",
  height: "52px",
  borderRadius: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  boxShadow: "0 8px 20px rgba(255,122,0,0.25)",
},

emptyWrapper: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
},

empty: {
  background: "linear-gradient(145deg, #ffffff, #f8fafc)",
  padding: "24px 30px",
  borderRadius: "20px",
  textAlign: "center",
  color: "#6b7280",
  fontSize: "18px",
  fontWeight: "600",
  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  border: "1px solid rgba(0,0,0,0.05)",
  maxWidth: "320px",
  width: "100%",
},

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "16px"
  },

  card: {
  background: "linear-gradient(145deg, #ffffff, #f8fafc)",
  padding: "20px",
  borderRadius: "20px",
  marginBottom: "20px",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 10px 30px rgba(255, 203, 125, 0.616)",
  backdropFilter: "blur(10px)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
},

cardTopGlow: {
  position: "absolute",
  top: "-40px",
  right: "-40px",
  width: "120px",
  height: "120px",
  background: "rgba(255,122,0,0.08)",
  borderRadius: "50%",
},

titlebid: {
  fontSize: "22px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "12px",
},

infoRow: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
  color: "#4b5563",
  fontSize: "15px",
},

budgetBox: {
  background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
  padding: "12px",
  borderRadius: "14px",
  marginTop: "14px",
  marginBottom: "14px",
  border: "1px solid #fed7aa",
},

statusBadge: {
  padding: "6px 14px",
  borderRadius: "30px",
  fontSize: "13px",
  fontWeight: "600",
  display: "inline-block",
},

actions: {
  display: "flex",
  gap: "12px",
  marginTop: "18px",
},

accept: {
  flex: 1,
  background: "linear-gradient(135deg, #ff7a00, #ffb347)",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(34,197,94,0.3)",
  transition: "0.3s",
},

reject: {
  flex: 1,
  background: "#fff",
  color: "#ff7a00",
  border: "1px solid red",
  padding: "12px",
  borderRadius: "12px",
  fontWeight: "600",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(239,68,68,0.3)",
  transition: "0.3s",
}
};