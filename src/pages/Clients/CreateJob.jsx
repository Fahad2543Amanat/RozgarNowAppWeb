import { useState } from "react";

function CreateJob() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    skills: "",
    priority: "Medium",
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const postJob = () => {
    if (!form.title || !form.description || !form.budgetMin) {
      alert("Please fill required fields");
      return;
    }

    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    const newJob = {
      id: Date.now(),
      ...form,
      status: "Pending",
      progress: 0,
      createdAt: new Date().toLocaleString()
    };

    localStorage.setItem("jobs", JSON.stringify([newJob, ...jobs]));

    setForm({
      title: "",
      description: "",
      budgetMin: "",
      budgetMax: "",
      deadline: "",
      skills: "",
      priority: "Medium",
      notes: ""
    });

    alert("🔥 Job Posted Successfully!");
  };

  return (
    <div style={styles.container}>

      <h2>🚀 Post New Job</h2>

      {/* TITLE */}
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Job Title *"
        style={styles.input}
      />

      {/* DESCRIPTION */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Job Description *"
        style={styles.textarea}
      />

      {/* BUDGET */}
      <div style={styles.row}>
        <input
          name="budgetMin"
          value={form.budgetMin}
          onChange={handleChange}
          placeholder="Min Budget (PKR)"
          style={styles.input}
        />
        <input
          name="budgetMax"
          value={form.budgetMax}
          onChange={handleChange}
          placeholder="Max Budget (PKR)"
          style={styles.input}
        />
      </div>

      {/* DEADLINE */}
      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        style={styles.input}
      />

      {/* SKILLS */}
      <input
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Required Skills (e.g React, UI Design)"
        style={styles.input}
      />

      {/* PRIORITY */}
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        style={styles.input}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      {/* NOTES */}
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Additional Notes"
        style={styles.textarea}
      />

      {/* BUTTON */}
      <button onClick={postJob} style={styles.button}>
        Post Job
      </button>

    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  container: {
    padding: "20px",
    maxWidth: "100%",
    margin: "auto",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    fontFamily: "Arial"
  },

  input: {
    width: "90%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "#fafafa"
  },

  textarea: {
    width: "90%",
    padding: "12px",
    height: "100px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "#fafafa"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default CreateJob;