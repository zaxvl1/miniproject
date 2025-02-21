import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                login(data.token);
                navigate("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("❌ Login failed. Try again.");
        }
    };

    return (
        <div style={styles.container}>
            {/* CSS Animation */}
            <style>
                {`
                @keyframes gradientAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                @keyframes leafAnimation {
                    0% { transform: translateY(-100vh) translateX(50vw); opacity: 1; }
                    100% { transform: translateY(100vh) translateX(-50vw); opacity: 0; }
                }

                .leaf {
                    position: absolute;
                    width: 5px;
                    height: 30px;
                    background: rgba(34, 139, 34, 0.8);
                    animation: leafAnimation 4s ease-in-out infinite;
                    opacity: 0.7;
                }
                `}
            </style>

            {/* Leaf-like Animation */}
            {[...Array(8)].map((_, i) => (
                <div key={i} className="leaf" style={{
                    top: `${Math.random() * 100}vh`,
                    left: `${Math.random() * 100}vw`,
                    animationDelay: `${Math.random() * 2}s`,
                }}></div>
            ))}

            <motion.div
                style={styles.loginBox}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 style={styles.title}>Sign In</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div style={styles.inputContainer}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <motion.button
                        type="submit"
                        style={styles.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95, backgroundColor: "#6c48d3" }}
                    >
                        Sign In
                    </motion.button>
                </form>
                <p style={styles.signupText}>
                    New here? <a href="/register" style={styles.link}>Sign up now</a>
                </p>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "linear-gradient(-45deg, #8FBC8F, #6B8E23, #228B22, #2E8B57)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    loginBox: {
        position: "relative",
        background: "rgba(25, 25, 35, 0.8)", // Darker for contrast
        padding: "3rem",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(34, 139, 34, 0.3)", // Soft glow effect
        maxWidth: "400px",
        width: "90%",
        textAlign: "center",
        backdropFilter: "blur(10px)",
    },
    title: {
        color: "#fff",
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "1.5rem",
        textShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)", // Subtle text glow
    },
    inputContainer: {
        marginBottom: "1rem",
    },
    input: {
        width: "100%",
        padding: "14px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#4C9A2A", // Earthy green
        color: "#fff",
        fontSize: "1rem",
        outline: "none",
        transition: "all 0.3s",
    },
    button: {
        width: "100%",
        padding: "14px",
        borderRadius: "10px",
        border: "none",
        backgroundColor: "#6B8E23", // Earthy olive green
        color: "#fff",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0px 4px 10px rgba(93, 63, 211, 0.5)",
    },
    signupText: {
        color: "#A3A7FC",
        marginTop: "1rem",
        fontSize: "0.9rem",
    },
    link: {
        color: "#A3A7FC",
        textDecoration: "none",
        fontWeight: "bold",
        transition: "color 0.3s",
    },
};

export default Login;
