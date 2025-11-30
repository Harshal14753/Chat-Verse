import React, {useContext, useState} from "react";
import toast from "react-hot-toast";
import {userLogin} from "../services/UserService.js";
import UserContext from "../context/UserContext.jsx";

function Login() {

    const { login } = useContext(UserContext);

    const [userData, setUserData] = useState({
        phoneNumber: "",
        displayName: "",
        password: "",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        // Here you would normally call backend API
        e.preventDefault();
        console.log("1")
        if (!userData.phoneNumber || !userData.password) {
            console.log("2")
            toast("Please enter both phone number and password");
            return ;
        }

        // Mock authentication
        const response = await userLogin(userData);
        console.log("3")
        if (response.status !== 200) {
            console.log("4")
            toast.error("Login Failed");
            return;
        }

        // Use response.data to get phoneNumber and role
        const userDataToLogin = {
            phoneNumber: response.data.phoneNumber,
            password: userData.password,
            displayName: response.data.displayName, // Fallback to phoneNumber if displayName is not provided
            role: response.data.role,
            // password: response.data.password, // You might not want to store password in real apps
        };
        console.log("5");
        console.log("User data to login:", userDataToLogin.phoneNumber + " " + userDataToLogin.role);
        login(userDataToLogin);
        toast.success("Login successful");
        console.log("6");
        return response;
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 70% 20%, #25d36622 0%, #111b21 80%), linear-gradient(120deg, #111b21 60%, #128c7e 100%)",
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
            {/* Extra bubbles for login */}
            <div
                style={{
                    position: "absolute",
                    top: "18%",
                    left: "12%",
                    width: "48px",
                    height: "48px",
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
                    top: "70%",
                    right: "20%",
                    width: "32px",
                    height: "32px",
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
                    top: "55%",
                    left: "60%",
                    width: "22px",
                    height: "22px",
                    background:
                        "radial-gradient(circle, #fff2 60%, transparent 100%)",
                    borderRadius: "50%",
                    zIndex: 0,
                    filter: "blur(1px)",
                    opacity: 0.5,
                }}
            />
            <form
                onSubmit={handleLogin}
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
                {/* Phone Number Input */}
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={userData.phoneNumber}
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
                />
                {/* Password Input */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={userData.password}
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
                />
                {/* Login Button */}
                <button
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
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;