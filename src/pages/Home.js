import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

function Home() {
  return (
    <div style={styles.container}>
      <style>
        {`
        @keyframes gradientAnimation {
          0% { background: #004d00; }
          50% { background: #008000; }
          100% { background: #004d00; }
        }
        
        @keyframes leafFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        .leaf {
          position: absolute;
          width: 10px;
          height: 10px;
          background: green;
          border-radius: 50%;
          opacity: 0.8;
          animation: leafFall 5s linear infinite;
        }
        `}
      </style>
      {[...Array(15)].map((_, i) => (
        <div key={i} className="leaf" style={{
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
          animationDuration: `${3 + Math.random() * 3}s`,
          animationDelay: `${Math.random() * 2}s`,
        }}></div>
      ))}
      <motion.div
        style={styles.homeBox}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 style={styles.title}>Welcome to MyShopee12</h1>
        <p style={styles.subtitle}>Your eco-friendly store for sustainable products.</p>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link to="/products" style={styles.button}>🌿 Start Shopping</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "100%",
    height: "100vh",
    backgroundSize: "400% 400%",
    animation: "gradientAnimation 10s ease infinite",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  homeBox: {
    position: "relative",
    background: "rgba(25, 50, 25, 0.8)",
    padding: "3rem",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(95, 255, 95, 0.3)",
    maxWidth: "500px",
    width: "90%",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },
  title: {
    color: "#ffffff",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)",
  },
  subtitle: {
    color: "#ccffcc",
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#228B22",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0px 4px 10px rgba(34, 139, 34, 0.5)",
  },
};

export default Home;
