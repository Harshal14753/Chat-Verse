import React, {useContext} from "react";
import userContext from "../context/UserContext.jsx";
import {useNavigate} from "react-router";
// import {getUser} from "../services/UserService.js";
// import {useEffect} from "react";

function Profile() {

    const {user} = useContext(userContext);

    const navigate = useNavigate();

    const handleChangePassword = (e) => {
        e.preventDefault();
        navigate("/change-password");
    }



    return (
        <div
            style={{
                minWidth: "100vw",
                minHeight: "100vh",
                background:
                    "radial-gradient(circle at 60% 30%, #25d36622 0%, #111b21 80%), linear-gradient(120deg, #111b21 60%, #128c7e 100%)",
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
            {/* Decorative bubbles */}
            <div
                style={{
                    position: "absolute",
                    top: "-80px",
                    right: "-80px",
                    width: "180px",
                    height: "180px",
                    background: "radial-gradient(circle, #25d36644 60%, transparent 100%)",
                    zIndex: 0,
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    bottom: "-40px",
                    left: "-40px",
                    width: "90px",
                    height: "90px",
                    background: "radial-gradient(circle, #202c3380 60%, transparent 100%)",
                    zIndex: 0,
                    borderRadius: "50%",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "15%",
                    width: "38px",
                    height: "38px",
                    background: "radial-gradient(circle, #25d36699 60%, transparent 100%)",
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
                    right: "12%",
                    width: "28px",
                    height: "28px",
                    background: "radial-gradient(circle, #128c7e88 60%, transparent 100%)",
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
                    left: "70%",
                    width: "18px",
                    height: "18px",
                    background: "radial-gradient(circle, #fff2 60%, transparent 100%)",
                    borderRadius: "50%",
                    zIndex: 0,
                    filter: "blur(1px)",
                    opacity: 0.5,
                }}
            />
            {/* Profile Card */}
            <div
                style={{
                    background: "#111b21",
                    padding: "2.5rem 2.5rem 2rem 2.5rem",
                    borderRadius: "14px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    minWidth: "340px",
                    maxWidth: "95vw",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Avatar */}
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #25d366 60%, #128c7e 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "1.5rem",
                        boxShadow: "0 4px 16px #25d36633",
                    }}
                >
                    <span style={{ fontSize: "2.5rem", color: "#fff" }}>👤</span>
                </div>
                {/* Name */}
                <div
                    style={{
                        color: "#25d366",
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        marginBottom: ".5rem",
                        textAlign: "center",
                        letterSpacing: ".5px",
                    }}
                >
                    {user.displayName}
                </div>
                {/* Phone */}
                <div
                    style={{
                        color: "#d1d7db",
                        fontSize: "1.08rem",
                        marginBottom: "1.5rem",
                        textAlign: "center",
                        letterSpacing: ".2px",
                    }}
                >
                    {user.phoneNumber}
                </div>
                {/* Change Password Link */}
                <button
                    onClick={handleChangePassword}
                    style={{
                        color: "#25d366",
                        background: "rgba(37,211,102,0.08)",
                        padding: "0.7rem 1.7rem",
                        borderRadius: "999px",
                        fontWeight: 600,
                        fontSize: "1.08rem",
                        textDecoration: "none",
                        transition: "background 0.18s",
                        boxShadow: "0 2px 8px rgba(37,211,102,0.06)",
                        marginTop: "0.5rem",
                        marginBottom: "0.5rem",
                        display: "inline-block",
                    }}
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}

export default Profile;