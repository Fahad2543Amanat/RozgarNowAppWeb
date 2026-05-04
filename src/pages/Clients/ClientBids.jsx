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

      <h2 style={styles.title}>📥 Job Applications</h2>

      {bids.length === 0 && (
        <p style={styles.empty}>No applications yet</p>
      )}

      {bids.map(bid => (
        <div key={bid.id} style={styles.card}>

          {/* ✅ JOB DATA (from nested job object) */}
          <h3>💼 {bid.job?.title}</h3>

          {/* ❗ worker name backend se nahi aa raha */}
          <p>👷 {bid.workerName || "Unknown"}</p>
          <p>📍 {bid.workerLocation || "N/A"}</p>
          <p>📍 {bid.city || "City"}</p>

          {/* <p>📍 {bid.job?.location}</p> */}

          <p>
            💰 Budget: {bid.job?.budgetMin} - {bid.job?.budgetMax}
          </p>

          <p>💸 Bid: {bid.bidAmount}</p>

          {/* STATUS */}
          <p>
            Status:
            <span style={{
              marginLeft: 10,
              fontWeight: "bold",
              color:
                bid.status === "Accepted"
                  ? "green"
                  : bid.status === "Rejected"
                  ? "red"
                  : "orange"
            }}>
              {bid.status}
            </span>
          </p>

          <div style={styles.actions}>
            <button
              onClick={() => updateStatus(bid.id, "Accepted")}
              style={styles.accept}
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus(bid.id, "Rejected")}
              style={styles.reject}
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