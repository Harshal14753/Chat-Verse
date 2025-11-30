import React, { useState } from "react";
import toast from "react-hot-toast";
import { saveUser } from "../services/UserService";
import { useNavigate } from "react-router";

function Register() {
    const [formData, setFormData] = useState({
        phoneNumber: "",
        displayName: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    // Replace with your navigation and saveUser logic
    const navigate = useNavigate();
    // async function saveUser(data) { ... }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        console.log("Registering user with data:", formData);
        e.preventDefault();
        setError("");
        if (formData.password !== formData.confirmPassword) {
            console.log("1");
            setError("Passwords do not match");
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await saveUser(formData);
            if (response.status === 200) {
                navigate("/login");
                toast.success("Registration successful! Please login.");
            }
        } catch (err) {
            console.error("Registration error:", err);
            // setError("Registration failed. Please try again.");
            toast("Registration failed. Please try again.")
        }
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 30% 70%, #25d36622 0%, #111b21 80%), linear-gradient(120deg, #111b21 60%, #25d366 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "80px",
                paddingBottom: "80px",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Decorative background shapes */}
            <div
                style={{
                    position: "absolute",
                    top: "-100px",
                    right: "-100px",
                    width: "260px",
                    height: "260px",
                    background:
                        "radial-gradient(circle, #25d36644 60%, transparent 100%)",
                    zIndex: 0,
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-60px",
                    left: "-60px",
                    width: "140px",
                    height: "140px",
                    background:
                        "radial-gradient(circle, #202c3380 60%, transparent 100%)",
                    zIndex: 0,
                    borderRadius: "50%",
                }}
            />
            {/* Extra bubbles for register */}
            <div
                style={{
                    position: "absolute",
                    top: "22%",
                    left: "18%",
                    width: "54px",
                    height: "54px",
                    background:
                        "radial-gradient(circle, #25d36699 60%, transparent 100%)",
                    borderRadius: "50%",
                    zIndex: 0,
                    filter: "blur(2px)",
                    opacity: 0.7,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "75%",
                    right: "15%",
                    width: "36px",
                    height: "36px",
                    background:
                        "radial-gradient(circle, #128c7e88 60%, transparent 100%)",
                    borderRadius: "50%",
                    zIndex: 0,
                    filter: "blur(1.5px)",
                    opacity: 0.6,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "60%",
                    left: "65%",
                    width: "26px",
                    height: "26px",
                    background:
                        "radial-gradient(circle, #fff2 60%, transparent 100%)",
                    borderRadius: "50%",
                    zIndex: 0,
                    filter: "blur(1px)",
                    opacity: 0.5,
                }}
            />
            <form
                onSubmit={handleRegister}
                style={{
                    background: "#111b21",
                    padding: "2.5rem 2rem",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    minWidth: "340px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Logo */}
                <div style={{ marginBottom: "2rem" }}>
                    <img
                        src="/src/images/conversation.png"
                        alt="Chat Logo"
                        style={{ width: 72, height: 72 }}
                    />
                </div>

                {/* Name Input */}
                <input
                    type="text"
                    name="displayName"
                    placeholder="Name"
                    value={formData.displayName}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        marginBottom: "1rem",
                        borderRadius: "6px",
                        border: "1px solid #2a3942",
                        background: "#111b21",
                        color: "#d1d7db",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "border 0.2s",
                    }}
                    required
                />

                {/* Phone Number Input */}
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        marginBottom: "1rem",
                        borderRadius: "6px",
                        border: "1px solid #2a3942",
                        background: "#111b21",
                        color: "#d1d7db",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "border 0.2s",
                    }}
                    required
                />

                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        marginBottom: "1rem",
                        borderRadius: "6px",
                        border: "1px solid #2a3942",
                        background: "#111b21",
                        color: "#d1d7db",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "border 0.2s",
                    }}
                    required
                />

                {/* Confirm Password Input */}
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        marginBottom: "1.5rem",
                        borderRadius: "6px",
                        border: "1px solid #2a3942",
                        background: "#111b21",
                        color: "#d1d7db",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "border 0.2s",
                    }}
                    required
                />

                {/* Error Message */}
                {error && (
                    <div style={{ color: "#ff4d4f", marginBottom: "1rem", textAlign: "center" }}>
                        {error}
                    </div>
                )}

                {/* Register Button */}
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        borderRadius: "6px",
                        border: "none",
                        background: "#25d366",
                        color: "#202c33",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        marginBottom: "0.5rem",
                    }}
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;