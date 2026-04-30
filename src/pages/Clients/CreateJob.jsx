import { useState } from "react";

function CreateJob() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    title: "",
    description: "",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    time: "",
    skills: "",
    location: "",
    phone: "",
    category: "",
    priority: "Medium",
    notes: ""
  });

  /* 🇵🇰 Pakistan Cities List */
const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Sargodha",
  "Bahawalpur",
  "Abbottabad"
];

const [citySearch, setCitySearch] = useState("");

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.title || !form.description) {
      setError("Title and Description are required");
      return false;
    }

    if (Number(form.budgetMin) < 0 || Number(form.budgetMax) < 0) {
      setError("Budget cannot be negative");
      return false;
    }

    if (Number(form.budgetMin) > Number(form.budgetMax)) {
      setError("Min budget cannot be greater than Max budget");
      return false;
    }

    if (!form.deadline) {
      setError("Please select a date");
      return false;
    }

    if (form.deadline < today) {
      setError("Past date is not allowed");
      return false;
    }

    setError("");
    return true;
  };

  const postJob = () => {
    if (!validate()) return;

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
      time: "",
      skills: "",
      location: "",
      phone: "",
      category: "",
      priority: "Medium",
      notes: ""
    });

    alert("🔥 Job Posted Successfully!");
  };

  /* 🔍 FILTERED CITIES */
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>🚀 Post New Job</h2>

      {error && <div style={styles.error}>{error}</div>}

      {/* GRID WRAPPER */}
      <div style={styles.grid}>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title *" style={styles.input} />

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Job Description *" style={styles.textarea} />

        {/* 🌍 LOCATION SEARCH DROPDOWN */}
      <input
        placeholder="Search City..."
        value={citySearch}
        onChange={(e) => setCitySearch(e.target.value)}
        style={styles.input}
      />

      <select
        name="location"
        value={form.location}
        onChange={handleChange}
        style={styles.input}
      >
        <option value="">Select City</option>
        {filteredCities.map((city, i) => (
          <option key={i} value={city}>
            {city}
          </option>
        ))}
      </select>

        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Contact Number" style={styles.input} />

        <input name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (React, UI, etc)" style={styles.input} />

        <input name="category" value={form.category} onChange={handleChange} placeholder="Category (IT, Design...)" style={styles.input} />

        <div style={styles.row}>
          <input name="budgetMin" value={form.budgetMin} onChange={handleChange} placeholder="Min Budget" style={styles.input} />
          <input name="budgetMax" value={form.budgetMax} onChange={handleChange} placeholder="Max Budget" style={styles.input} />
        </div>

        <div style={styles.row}>
          <input type="date" name="deadline" min={today} value={form.deadline} onChange={handleChange} style={styles.input} />

          <input type="time" name="time" value={form.time} onChange={handleChange} style={styles.input} />
        </div>

        <select name="priority" value={form.priority} onChange={handleChange} style={styles.input}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Additional Notes" style={styles.textarea} />

      </div>

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
    maxWidth: "1000px",
    margin: "auto",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    fontFamily: "Arial"
  },

  title: {
    color: "#ff7a00",
    marginBottom: 10
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  row: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "#fafafa",
    minWidth: "140px",
    boxSizing: "border-box"
  },

  textarea: {
    width: "100%",
    padding: "12px",
    height: "100px",
    borderRadius: "10px",
    border: "1px solid #eee",
    background: "#fafafa",
    boxSizing: "border-box"
  },

  button: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    background: "linear-gradient(90deg, #ff6a00, #ff9f1c)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer"
  },

  error: {
    background: "#fee2e2",
    color: "#b91c1c",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px"
  }
};

export default CreateJob;