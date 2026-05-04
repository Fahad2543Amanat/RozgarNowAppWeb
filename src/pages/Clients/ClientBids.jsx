import { useEffect, useState } from "react";
import axios from "axios";

function ClientBids() {

  // ✅ user state (same logic)
  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

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

        console.log("RAW BIDS:", res.data);

        // 🔥 NORMALIZE DATA (MAIN FIX)
        const normalized = (res.data.data || []).map(b => ({
          Id: b.Id || b._id,

          JobTitle: b.JobTitle || b.jobTitle,
          WorkerName: b.WorkerName || b.workerName,
          WorkerLocation: b.WorkerLocation || b.workerLocation,

          BudgetMin: b.BudgetMin || b.budgetMin,
          BudgetMax: b.BudgetMax || b.budgetMax,

          BidAmount: b.BidAmount || b.bidAmount,
          Status: b.Status || b.status
        }));

        console.log("NORMALIZED BIDS:", normalized);

        setBids(normalized);

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

      // ✅ UI update
      setBids(prev =>
        prev.map(b =>
          b.Id === bidId ? { ...b, Status: status } : b
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
      {bids.length === 0 && (
        <p style={styles.empty}>🚫 No applications received yet</p>
      )}

      {bids.map(bid => (
        <div
          key={bid.Id}
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >

          {/* ✅ JOB TITLE */}
          <h3>💼 {bid.JobTitle || "N/A"}</h3>

          {/* ✅ WORKER NAME */}
          <p>👷 {bid.WorkerName || "N/A"}</p>

          {/* ✅ LOCATION */}
          <p>📍 {bid.WorkerLocation || "N/A"}</p>

          {/* ✅ BUDGET */}
          <p>
            💰 Budget: {bid.BudgetMin || "N/A"} - {bid.BudgetMax || "N/A"}
          </p>

          {/* ✅ BID */}
          <p>💸 Bid: {bid.BidAmount || "N/A"}</p>

          {/* ✅ STATUS */}
          <p>
            Status:
            <span style={{
              marginLeft: 10,
              fontWeight: "bold",
              color:
                bid.Status === "Accepted"
                  ? "#16a34a"
                  : bid.Status === "Rejected"
                  ? "#dc2626"
                  : "#f59e0b"
            }}>
              {bid.Status}
            </span>
          </p>

          {/* ACTION BUTTONS */}
          <div style={styles.actions}>

            <button
              disabled={bid.Status === "Accepted"}
              onClick={() => updateStatus(bid.Id, "Accepted")}
              style={{
                ...styles.accept,
                opacity: bid.Status === "Accepted" ? 0.6 : 1
              }}
            >
              Accept
            </button>

            <button
              disabled={bid.Status === "Rejected"}
              onClick={() => updateStatus(bid.Id, "Rejected")}
              style={{
                ...styles.reject,
                opacity: bid.Status === "Rejected" ? 0.6 : 1
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