import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            style={{
                width: "100%",
                background: "#202c33",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2rem",
                height: "60px",
                boxSizing: "border-box",
                boxShadow: "0 1px 1px rgba(0,0,0,0.08)",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 100,
            }}
        >
            {/* Logo and Title */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src="/src/images/conversation.png" // Assuming you have a logo in your assets
                    alt="Chat Logo"
                    style={{
                        width: 38,
                        height: 38,
                        marginRight: "0.75rem",
                        filter: "none",
                    }}
                    onClick={() => window.location.href = '/'}
                />
                <span style={{ color: "#fff", fontSize: "1.35rem", fontWeight: 500, letterSpacing: 0.5 }}>
                    Personal Chat
                </span>
            </div>
            {/* Auth Buttons */}
            <div>
                <Link
                    style={{
                        background: "transparent",
                        color: "white",
                        border: "1px solid #25d366",
                        borderRadius: "6px",
                        padding: "0.4rem 1.1rem",
                        marginRight: "0.75rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontWeight: 500,
                        transition: "background 0.2s, color 0.2s",
                        textDecoration: "none",
                    }}
                    to="/login"
                >
                    Login
                </Link>
                <Link
                    style={{
                        background: "#25d366",
                        color: "#202c33",
                        border: "none",
                        borderRadius: "6px",
                        padding: "0.4rem 1.1rem",
                        fontSize: "1rem",
                        cursor: "pointer",
                        fontWeight: 500,
                        transition: "background 0.2s",
                        textDecoration: "none",
                    }}
                    to="/register"
                >
                    Register
                </Link>
            </div>
        </header>
    );
}

export default Header;