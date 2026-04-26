/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

function WorkerJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const allJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(allJobs);
  }, []);

  const applyJob = (job) => {
  let myJobs = JSON.parse(localStorage.getItem("myJobs")) || [];

  // ❌ duplicate check
  if (myJobs.find(j => j.id === job.id)) {
    alert("Already Applied");
    return;
  }

  // ✅ apply
  myJobs.push({ ...job, status: "Pending" });

  localStorage.setItem("myJobs", JSON.stringify(myJobs));
  alert("Applied Successfully");
};

  return (
    <div>
      <h2>📦 Available Jobs</h2>

      {jobs.map(job => (
        <div key={job.id} style={card}>
          <h4>{job.title}</h4>
          <p>{job.description}</p>
          <button onClick={() => applyJob(job)}>Apply</button>
        </div>
      ))}
    </div>
  );
}

const card = {
  background: "#fff",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px"
};

export default WorkerJobs;