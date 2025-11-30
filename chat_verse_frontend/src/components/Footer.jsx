import React from "react";

function Footer() {
    return (
        <footer
            style={{
                width: "100vw",
                background: "#111b21",
                color: "#fff",
                padding: "3rem 0 1.5rem 0",
                fontSize: "1rem",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "0 2rem",
                }}
            >
                {/* Logo and Download */}
                <div style={{ flex: "1 1 220px", minWidth: 220 }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                        <img
                            src="/src/images/conversation.png"
                            alt="Personal Chat"
                            style={{ width: 40, height: 40, marginRight: 12 }}
                        />
                        <span style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#fff" }}>
                            Personal Chat
                        </span>
                    </div>
                    <button
                        style={{
                            background: "#25d366",
                            color: "#111b21",
                            border: "none",
                            borderRadius: "999px",
                            padding: "0.9rem 3.5rem",
                            fontSize: "1.15rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: "2rem",
                        }}
                    >
                        Download
                        <span style={{ fontSize: "1.3rem", marginLeft: 6 }}>↓</span>
                    </button>
                </div>
                {/* Links Columns */}
                <div style={{ flex: "3 1 700px", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <div style={{ minWidth: 150, marginBottom: "2rem" }}>
                        <div style={{ color: "#aebac1", fontWeight: 500, marginBottom: 25 }}>What we do</div>
                        <div><a href="#" style={footerLinkStyle}>Features</a></div>
                        <div><a href="#" style={footerLinkStyle}>Blog</a></div>
                        <div><a href="#" style={footerLinkStyle}>Security</a></div>
                        <div><a href="#" style={footerLinkStyle}>For Business</a></div>
                    </div>
                    <div style={{ minWidth: 150, marginBottom: "2rem" }}>
                        <div style={{ color: "#aebac1", fontWeight: 500, marginBottom: 25 }}>Who we are</div>
                        <div><a href="#" style={footerLinkStyle}>About us</a></div>
                        <div><a href="#" style={footerLinkStyle}>Careers</a></div>
                        <div><a href="#" style={footerLinkStyle}>Brand Center</a></div>
                        <div><a href="#" style={footerLinkStyle}>Privacy</a></div>
                    </div>
                    <div style={{ minWidth: 150, marginBottom: "2rem" }}>
                        <div style={{ color: "#aebac1", fontWeight: 500, marginBottom: 25 }}>Use Personal Chat</div>
                        <div><a href="#" style={footerLinkStyle}>Android</a></div>
                        <div><a href="#" style={footerLinkStyle}>iPhone</a></div>
                        <div><a href="#" style={footerLinkStyle}>Mac/PC</a></div>
                        <div><a href="#" style={footerLinkStyle}>Web</a></div>
                    </div>
                    <div style={{ minWidth: 150, marginBottom: "2rem" }}>
                        <div style={{ color: "#aebac1", fontWeight: 500, marginBottom: 25 }}>Need help?</div>
                        <div><a href="#" style={footerLinkStyle}>Contact Us</a></div>
                        <div><a href="#" style={footerLinkStyle}>Help Center</a></div>
                        <div><a href="#" style={footerLinkStyle}>Apps</a></div>
                        <div><a href="#" style={footerLinkStyle}>Security Advisories</a></div>
                    </div>
                </div>
            </div>
            {/* Divider */}
            <div style={{
                borderTop: "1px solid #222d34",
                margin: "2.5rem auto 1.5rem auto",
                maxWidth: "1200px"
            }} />
            {/* Bottom Row */}
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 2rem",
                }}
            >
                <div style={{ color: "#aebac1", fontSize: "0.95rem" }}>
                    2025 © Personal Chat LLC
                </div>
                <div style={{ color: "#aebac1", fontSize: "0.95rem" }}>
                    <a href="#" style={footerLinkStyle}>Terms & Privacy Policy</a> &nbsp; | &nbsp;
                    <a href="#" style={footerLinkStyle}>Sitemap</a>
                </div>
                <div style={{ display: "flex", gap: 18 }}>
                    <FooterIcon icon="close" />
                    <FooterIcon icon="youtube" />
                    <FooterIcon icon="instagram" />
                    <FooterIcon icon="facebook" />
                </div>
                <div>

                </div>
            </div>
        </footer>
    );
}

// Footer link style
const footerLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 400,
    marginBottom: 15,
    display: "inline-block",
};

// Simple icon renderer for demo
function FooterIcon({ icon }) {
    const icons = {
        close: (
            <span style={footerIconStyle}>
                <svg width="22" height="22" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
                    <line x1="8" y1="8" x2="14" y2="14" stroke="#fff" strokeWidth="2"/>
                    <line x1="14" y1="8" x2="8" y2="14" stroke="#fff" strokeWidth="2"/>
                </svg>
            </span>
        ),
        youtube: (
            <span style={footerIconStyle}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
                    <polygon points="10,8 16,11 10,14" fill="#fff"/>
                </svg>
            </span>
        ),
        instagram: (
            <span style={footerIconStyle}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
                    <circle cx="11" cy="11" r="4" stroke="#fff" strokeWidth="2" fill="none"/>
                    <circle cx="15" cy="7" r="1" fill="#fff"/>
                </svg>
            </span>
        ),
        facebook: (
            <span style={footerIconStyle}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="10" stroke="#fff" strokeWidth="2" fill="none"/>
                    <rect x="10" y="8" width="2" height="6" fill="#fff"/>
                    <rect x="9" y="14" width="4" height="2" fill="#fff"/>
                </svg>
            </span>
        ),
    };
    return icons[icon] || null;
}

const footerIconStyle = {
    width: 38,
    height: 38,
    border: "1.5px solid #fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "transparent",
};

export default Footer;