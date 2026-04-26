/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

function MyJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const my = JSON.parse(localStorage.getItem("myJobs")) || [];
    setJobs(my);
  }, []);

  const completeJob = (id) => {
    const updated = jobs.map(j =>
      j.id === id ? { ...j, status: "Completed" } : j
    );

    setJobs(updated);
    localStorage.setItem("myJobs", JSON.stringify(updated));
  };

  return (
    <div>
      <h2>🧾 My Jobs</h2>

      {jobs.map(job => (
        <div key={job.id} style={card}>
          <h4>{job.title}</h4>
          <p>{job.status}</p>

          {job.status !== "Completed" && (
            <button onClick={() => completeJob(job.id)}>
              Mark Complete
            </button>
          )}
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

export default MyJobs;