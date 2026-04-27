import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🔥 tum apni images yahan replace kar dena
import img1 from "../assets/onboard1.png";
import img2 from "../assets/onboard2.png";
import img3 from "../assets/onboard3.png";

function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Find Jobs Nearby",
      desc: "Find daily jobs near your area",
      urdu: "Apny qareeb rozgar hasil karein",
      image: img1,
    },
    {
      title: "Hire Trusted Workers",
      desc: "Hire verified and skilled workers easily",
      urdu: "Bharosay mand workers hire karein",
      image: img2,
    },
    {
      title: "Earn Easily",
      desc: "Start earning with simple jobs",
      urdu: "Asani se paisa kamayein",
      image: img3,
    },
  ];

  // 👉 agar already onboarding ho chuki ho
 // ✅ FIX: avoid loop
  useEffect(() => {
    const isDone = localStorage.getItem("onboarded");
    if (isDone) navigate("/login");
  }, [navigate]);

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      localStorage.setItem("onboarded", "true");
      navigate("/login");   // ✅ FIX
    }
  };

  const back = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div style={styles.container}>

      {/* SLIDE */}
      <div style={styles.card}>

        {/* IMAGE */}
        <img
          src={slides[index].image}
          alt="onboard"
          style={styles.image}
        />

        {/* TEXT */}
        <h2 style={styles.title}>{slides[index].title}</h2>
        <p style={styles.desc}>{slides[index].desc}</p>
        <p style={styles.urdu}>{slides[index].urdu}</p>

        {/* DOTS */}
        <div style={styles.dots}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.dot,
                width: i === index ? "20px" : "8px",
                background: i === index ? "#ff6a00" : "#ddd",
              }}
            />
          ))}
        </div>

        {/* BUTTONS */}
        <div style={styles.btnRow}>

          {index > 0 && (
            <button onClick={back} style={styles.backBtn}>
              Back
            </button>
          )}

          <button onClick={next} style={styles.nextBtn}>
            {index === slides.length - 1 ? "Start" : "Next"}
          </button>

        </div>
        <style>
{`
@keyframes fade {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`}
</style>

      </div>

    </div>
  );
}



export default Onboarding;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    padding: "20px",
    fontFamily: "Arial",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },

  image: {
    width: "220px",
    marginBottom: "20px",
    animation: "fade 0.5s ease",
  },

  title: {
    margin: 0,
    color: "#ff6a00",
  },

  desc: {
    fontSize: "14px",
    color: "#555",
    marginTop: "5px",
  },

  urdu: {
    fontSize: "13px",
    color: "#888",
    marginTop: "4px",
  },

  dots: {
    display: "flex",
    justifyContent: "center",
    gap: "6px",
    margin: "20px 0",
  },

  dot: {
    height: "8px",
    borderRadius: "10px",
    transition: "0.3s",
  },

  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },

  backBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ff6a00",
    background: "#fff",
    color: "#ff6a00",
    cursor: "pointer",
  },

  nextBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(90deg,#ff6a00,#ff9f1c)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};