import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      
      {/* CENTER CONTENT */}
      <div style={styles.center}>

        {/* IMAGE */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="logo"
          style={styles.image}
        />

        <h2 style={styles.title}>Rozgar Now</h2>

        {/* LOADING */}
        <div style={styles.loader}></div>

      </div>

    </div>
  );
}

export default SplashScreen;

/* 🎨 ORANGE SPLASH STYLE */
const styles = {
  container: {
    height: "100vh",
    width: "100%",
    background: "linear-gradient(135deg,#ff6a00,#ff9f1c)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    textAlign: "center",
    color: "white",
  },

  image: {
    width: "120px",
    marginBottom: "10px",
  },

  title: {
    margin: "10px 0",
    fontSize: "22px",
    fontWeight: "bold",
  },

  loader: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255,255,255,0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    margin: "15px auto",
    animation: "spin 1s linear infinite",
  },
};