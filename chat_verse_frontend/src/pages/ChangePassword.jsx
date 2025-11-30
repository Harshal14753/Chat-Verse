import {useState} from "react";
import {changePassword} from "../services/UserService.js";
import toast from "react-hot-toast";

const ChangePassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password and confirm password is not matching.")
            return;
        }
        try {
            const response = changePassword({
                phoneNumber: localStorage.getItem("phoneNumber"),
                password: password,
            });
            // console.log("Password change request sent successfully.");
            console.log("Response from changePassword:", response);
            // console.log("Response status:", response.status);
            // console.log("Response data:", response.data);

            toast("Password changed successfully!");
        } catch (error){
            toast.error(error)
        }
    };

    return (
        <>
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

                {/* Change Password Card */}
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
                    {/* Icon */}
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
                        <span style={{fontSize: "2rem", color: "#fff"}}>🔒</span>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            color: "#25d366",
                            fontWeight: 700,
                            fontSize: "1.5rem",
                            marginBottom: "1.5rem",
                            textAlign: "center",
                            letterSpacing: ".5px",
                        }}
                    >
                        Change Password
                    </div>

                    {/* Form */}
                    <form
                        style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: "0.8rem 1rem",
                                borderRadius: "8px",
                                border: "1px solid #2a3942",
                                background: "#202c33",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                            }}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{
                                padding: "0.8rem 1rem",
                                borderRadius: "8px",
                                border: "1px solid #2a3942",
                                background: "#202c33",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                            }}
                            required
                        />
                        <button
                            type="submit"
                            style={{
                                background: "#25d366",
                                color: "#111b21",
                                fontWeight: 600,
                                padding: "0.8rem",
                                border: "none",
                                borderRadius: "999px",
                                fontSize: "1.08rem",
                                cursor: "pointer",
                                transition: "background 0.18s",
                                boxShadow: "0 2px 8px rgba(37,211,102,0.2)",
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;