import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Reports() {
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  const total = jobs.length;
  const completed = jobs.filter(j => j.status === "Completed").length;
  const active = jobs.filter(j => j.status === "Active").length;
  const pending = jobs.filter(j => j.status === "Pending").length;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Active", value: active },
    { name: "Pending", value: pending }
  ];

  const barData = [
    { name: "Total", value: total },
    { name: "Completed", value: completed },
    { name: "Active", value: active },
    { name: "Pending", value: pending }
  ];

  const COLORS = ["#22c55e", "#ff7a00", "#f59e0b"];

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.titleMain}>📊 Client Reports</h2>
        <p style={styles.subText}>Live job analytics & performance overview</p>
      </div>

      {/* STATS */}
      <div style={styles.grid}>
        <Card title="Total Jobs" value={total} color="#3b82f6" />
        <Card title="Active Jobs" value={active} color="#ff7a00" />
        <Card title="Completed" value={completed} color="#22c55e" />
        <Card title="Pending" value={pending} color="#f59e0b" />
      </div>

      {/* CHARTS */}
      <div style={styles.charts}>

        {/* PIE */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>📌 Status Distribution</h3>

          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BAR */}
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>📈 Job Overview</h3>

          <div style={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ff6a00" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* INSIGHTS */}
      <div style={styles.insights}>
        <h3>📌 Smart Insights</h3>

        <div style={styles.insightGrid}>
          <div>✔ Completion Rate: {total ? ((completed / total) * 100).toFixed(1) : 0}%</div>
          <div>✔ Active Workload: {active} running jobs</div>
          <div>✔ Pending Tasks: {pending} waiting jobs</div>
          <div>
            ✔ System Status:{" "}
            <b style={{ color: completed > active ? "#22c55e" : "#f59e0b" }}>
              {completed > active ? "Healthy" : "Needs Attention"}
            </b>
          </div>
        </div>
      </div>

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
      <h4 style={styles.cardTitle}>{title}</h4>
      <h2 style={{ color }}>{value}</h2>
    </div>
  );
}

export default Reports;

const styles = {
  container: {
    padding: "clamp(12px, 2vw, 25px)",
    fontFamily: "Arial",
    background: "linear-gradient(135deg,#f9fafb,#f3f4f6)",
    minHeight: "100vh"
  },

  /* HEADER */
  header: {
    marginBottom: "20px",
    textAlign: "left"
  },

  titleMain: {
    margin: 0,
    fontSize: "clamp(18px, 2vw, 26px)"
  },

  subText: {
    margin: "5px 0 0",
    color: "#6b7280",
    fontSize: "clamp(12px, 1.5vw, 14px)"
  },

  /* STATS GRID (RESPONSIVE AUTO STACK) */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
    marginBottom: "25px"
  },

  card: {
    background: "#fff",
    padding: "16px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    transition: "0.3s",
    minHeight: "90px"
  },

  cardTitle: {
    marginBottom: "8px",
    color: "#6b7280",
    fontSize: "13px"
  },

  /* CHARTS RESPONSIVE */
  charts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "25px"
  },

  chartBox: {
    background: "#fff",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    overflow: "hidden"
  },

  chartTitle: {
    marginBottom: "10px",
    fontSize: "15px"
  },

  chartWrapper: {
    width: "100%",
    overflowX: "auto"
  },

  /* INSIGHTS */
  insights: {
    background: "#fff",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
  },

  insightGrid: {
    display: "grid",
    gap: "10px",
    marginTop: "10px",
    color: "#374151",
    fontSize: "14px"
  }
};