/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

function Earnings() {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("myJobs")) || [];

    const completed = jobs.filter(j => j.status === "Completed");

    const sum = completed.reduce((acc, j) => acc + Number(j.budgetMax || 0), 0);

    setTotal(sum);
  }, []);

  return (
    <div>
      <h2>💰 Earnings</h2>
      <h3>Total: {total}</h3>
    </div>
  );
}

export default Earnings;