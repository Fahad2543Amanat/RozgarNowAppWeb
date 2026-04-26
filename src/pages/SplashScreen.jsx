import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/logoimg.jpeg";
import logo1 from "../assets/bgremovelogo.png";
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
          src={logo1}
          alt="logo"
          style={styles.image}
        />

        <style>
{`
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
`}
</style>

        <h3 style={styles.title}>Rozgar Now</h3>
        <h2 style={styles.tagline}>Rozgar sab k liye, Kam mily asani sy</h2>
        {/* LOADING */}
        <div style={styles.loader}></div>

        <style>
      {`
      @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
        }
        `}
</style>

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
    animation: "pulse 1.5s ease-in-out infinite"
  },

  title: {
    margin: "10px 0",
    fontSize: "22px",
    fontWeight: "bold",
  },
  tagline: {
    margin: "10px 0",
    fontSize: "18px",
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
    // boxShadow: "0 0 15px rgba(255,255,255,0.6)"
  },
};