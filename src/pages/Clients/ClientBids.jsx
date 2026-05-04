import { useEffect, useState } from "react";
import axios from "axios";

function ClientBids() {

  // ✅ user state (same logic)
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 SAFE VALUE HELPER (IMPORTANT FIX)
  const getValue = (obj, key1, key2, fallback = "N/A") => {
    return obj[key1] || obj[key2] || fallback;
  };

  // ================= FETCH BIDS =================
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

        console.log("CLIENT BIDS:", res.data);

        setBids(res.data.data || []);

      } catch (error) {
        console.log("BIDS ERROR:", error);
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

      // ✅ UI update (fixed keys)
      setBids(prev =>
        prev.map(b =>
          (b.Id || b._id) === bidId
            ? { ...b, Status: status }
            : b
        )
      );

    } catch (error) {
      console.log("STATUS UPDATE ERROR:", error);
    }
  };

  // ================= LOADING =================
  if (loading) return <p>Loading bids...</p>;

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>📥 Job Applications</h2>

      {/* EMPTY STATE */}
      {bids.length === 0 && !loading && (
        <p style={styles.empty}>🚫 No applications received yet</p>
      )}

      {bids.map(bid => (
        <div
          key={bid.Id || bid._id}
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >

          {/* ✅ JOB TITLE */}
          <h3>
            💼 {getValue(bid, "JobTitle", "jobTitle")}
          </h3>

          {/* ✅ WORKER NAME */}
          <p>
            👷 {getValue(bid, "WorkerName", "workerName")}
          </p>

          {/* ✅ LOCATION */}
          <p>
            📍 {getValue(bid, "WorkerLocation", "workerLocation")}
          </p>

          {/* ✅ BUDGET */}
          <p>
            💰 Budget:{" "}
            {getValue(bid, "BudgetMin", "budgetMin")} -{" "}
            {getValue(bid, "BudgetMax", "budgetMax")}
          </p>

          {/* ✅ BID */}
          <p>
            💸 Bid: {getValue(bid, "BidAmount", "bidAmount")}
          </p>

          {/* ✅ STATUS */}
          <p>
            Status:
            <span style={{
              marginLeft: 10,
              fontWeight: "bold",
              color:
                (bid.Status || bid.status) === "Accepted"
                  ? "#16a34a"
                  : (bid.Status || bid.status) === "Rejected"
                  ? "#dc2626"
                  : "#f59e0b"
            }}>
              {bid.Status || bid.status}
            </span>
          </p>

          {/* ACTION BUTTONS */}
          <div style={styles.actions}>

            <button
              disabled={(bid.Status || bid.status) === "Accepted"}
              onClick={() =>
                updateStatus(bid.Id || bid._id, "Accepted")
              }
              style={{
                ...styles.accept,
                opacity:
                  (bid.Status || bid.status) === "Accepted" ? 0.6 : 1
              }}
            >
              Accept
            </button>

            <button
              disabled={(bid.Status || bid.status) === "Rejected"}
              onClick={() =>
                updateStatus(bid.Id || bid._id, "Rejected")
              }
              style={{
                ...styles.reject,
                opacity:
                  (bid.Status || bid.status) === "Rejected" ? 0.6 : 1
              }}
            >
              Reject
            </button>

          </div>

        </div>
      ))}

    </div>
  );
}

export default ClientBids;


// ================= STYLES =================
const styles = {
  container: {
    padding: "20px",
    background: "#f6f7fb",
    minHeight: "100vh"
  },

  title: {
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "600"
  },

  empty: {
    textAlign: "center",
    color: "#666"
  },

  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    borderLeft: "4px solid #ff7a00",
    transition: "0.2s"
  },

  actions: {
    marginTop: "12px",
    display: "flex",
    gap: "10px"
  },

  accept: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  },

  reject: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  }
};