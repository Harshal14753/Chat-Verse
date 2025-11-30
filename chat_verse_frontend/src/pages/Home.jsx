import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

function Home() {
    return (
        <div style={{ width: "100vw", minHeight: "100vh", background: "#0b141a" }}>
            {/* Section 1: Hero with Get Started */}
            <section
                style={{
                    width: "100vw",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #0b141a 60%, #25d366 100%)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                {/* Decorative background shapes */}
                <div style={{
                    position: "absolute",
                    top: "-120px",
                    right: "-120px",
                    width: "320px",
                    height: "320px",
                    background: "radial-gradient(circle, #25d36655 60%, transparent 100%)",
                    zIndex: 0,
                    borderRadius: "50%",
                }} />
                <div style={{
                    position: "absolute",
                    bottom: "-80px",
                    left: "-80px",
                    width: "200px",
                    height: "200px",
                    background: "radial-gradient(circle, #202c3380 60%, transparent 100%)",
                    zIndex: 0,
                    borderRadius: "50%",
                }} />
                {/* Hero Content */}
                <div
                    style={{
                        width: "100vw",
                        maxWidth: 600,
                        minWidth: 340,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 2,
                    }}
                >
                    <div
                        style={{
                            borderRadius: "28px",
                            width: "100%",
                            padding: "3.5rem 2.5rem 2.5rem 2.5rem",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            background: "rgba(32,44,51,0.98)",
                            border: "1.5px solid #222e35",
                        }}
                    >
                        {/* Decorative Icon */}
                        <div style={{
                            background: "linear-gradient(135deg, #25d366 60%, #128c7e 100%)",
                            borderRadius: "50%",
                            width: 70,
                            height: 70,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "1.5rem",
                            boxShadow: "0 4px 16px #25d36633",
                        }}>
                            <span style={{
                                fontSize: "2.5rem",
                                color: "#fff",
                                textShadow: "0 2px 8px #128c7e55",
                            }}>💬</span>
                        </div>
                        <h1 style={{
                            color: "#25d366",
                            fontSize: "2.7rem",
                            fontWeight: 800,
                            marginBottom: "1.2rem",
                            textAlign: "center",
                            lineHeight: 1.1,
                            letterSpacing: ".5px",
                            textShadow: "0 2px 8px #111b21cc",
                        }}>
                            Welcome to ChatVerse
                        </h1>
                        <p style={{
                            color: "#d1d7db",
                            fontSize: "1.18rem",
                            marginBottom: "2.2rem",
                            textAlign: "center",
                            fontWeight: 400,
                            lineHeight: 1.5,
                        }}>
                            Connect, Communicate & Collaborate instantly.<br />
                            Simple, reliable, private messaging and calling for free*, available all over the world.
                        </p>
                        <Link
                            to="/register"
                            style={{
                                background: "linear-gradient(90deg, #25d366 60%, #128c7e 100%)",
                                color: "#202c33",
                                border: "none",
                                borderRadius: "999px",
                                padding: "1rem 3.5rem",
                                fontSize: "1.22rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: "1.5rem",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                                letterSpacing: ".5px",
                                transition: "background 0.2s, color 0.2s",
                            }}
                        >
                            Get Started <span style={{ fontSize: "1.3rem", marginLeft: 6 }}>→</span>
                        </Link>
                        <div style={{
                            color: "#8696a0",
                            fontSize: "0.98rem",
                            opacity: 0.8,
                            marginTop: "0.5rem",
                            textAlign: "center",
                            width: "100%",
                        }}>
                            * Data charges may apply. Contact your provider for details.
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: How to Use */}
            <section
                style={{
                    width: "100vw",
                    minHeight: "80vh",
                    background: "linear-gradient(120deg, #202c33 70%, #25d36622 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "4rem 0",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <h2 style={{
                    color: "#25d366",
                    fontWeight: 700,
                    fontSize: "2.2rem",
                    marginBottom: "2.5rem",
                    letterSpacing: ".5px",
                    textAlign: "center",
                    width: "100%",
                }}>
                    How to use ChatVerse
                </h2>
                <div style={{
                    width: "100%",
                    maxWidth: 700,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3.5rem",
                    position: "relative",
                }}>
                    {/* Step 1 - left */}
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        position: "relative",
                    }}>
                        <div style={{
                            ...zigZagStepCardStyle,
                            flexDirection: "row",
                            alignItems: "center",
                            textAlign: "left",
                            justifyContent: "flex-start",
                        }}>
                            <div style={{ flex: 1 }}>
                                <h5 style={zigZagStepTitleStyle}>Register</h5>
                                <p style={zigZagStepDescStyle}>Sign up with your phone number and set up your profile in seconds.</p>
                            </div>
                            <div style={zigZagStepCircleCenterStyle}>1</div>
                        </div>
                        {/* Connector line to next step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: "100%",
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                    </div>
                    {/* Step 2 - right */}
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                    }}>
                        {/* Connector line from previous step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: -40,
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                        <div style={{
                            ...zigZagStepCardStyle,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            textAlign: "right",
                            justifyContent: "flex-end",
                        }}>
                            <div style={{ flex: 1 }}>
                                <h5 style={zigZagStepTitleStyle}>Find Friends</h5>
                                <p style={zigZagStepDescStyle}>Search or invite friends to start chatting instantly.</p>
                            </div>
                            <div style={zigZagStepCircleCenterStyle}>2</div>
                        </div>
                        {/* Connector line to next step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: "100%",
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                    </div>
                    {/* Step 3 - left */}
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        position: "relative",
                    }}>
                        {/* Connector line from previous step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: -40,
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                        <div style={{
                            ...zigZagStepCardStyle,
                            flexDirection: "row",
                            alignItems: "center",
                            textAlign: "left",
                            justifyContent: "flex-start",
                        }}>
                            <div style={{ flex: 1 }}>
                                <h5 style={zigZagStepTitleStyle}>Start a New Chat</h5>
                                <p style={zigZagStepDescStyle}>Tap the chat icon to begin a new conversation with anyone.</p>
                            </div>
                            <div style={zigZagStepCircleCenterStyle}>3</div>
                        </div>
                        {/* Connector line to next step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: "100%",
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                    </div>
                    {/* Step 4 - right */}
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "relative",
                    }}>
                        {/* Connector line from previous step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: -40,
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                        <div style={{
                            ...zigZagStepCardStyle,
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            textAlign: "right",
                            justifyContent: "flex-end",
                        }}>
                            <div style={{ flex: 1 }}>
                                <h5 style={zigZagStepTitleStyle}>Find Your Contact</h5>
                                <p style={zigZagStepDescStyle}>If your friend is already in your contacts, just select their name to open the chat.</p>
                            </div>
                            <div style={zigZagStepCircleCenterStyle}>4</div>
                        </div>
                        {/* Connector line to next step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: "100%",
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                    </div>
                    {/* Step 5 - left */}
                    <div style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        position: "relative",
                    }}>
                        {/* Connector line from previous step */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: -40,
                            width: 2,
                            height: 40,
                            background: "#25d36655",
                            zIndex: 0,
                            transform: "translateX(-50%)",
                        }} />
                        <div style={{
                            ...zigZagStepCardStyle,
                            flexDirection: "row",
                            alignItems: "center",
                            textAlign: "left",
                            justifyContent: "flex-start",
                        }}>
                            <div style={{ flex: 1 }}>
                                <h5 style={zigZagStepTitleStyle}>Send Your Message</h5>
                                <p style={zigZagStepDescStyle}>Type your message and hit send to start the conversation!</p>
                            </div>
                            <div style={zigZagStepCircleCenterStyle}>5</div>
                        </div>
                    </div>
                </div>
                {/* Decorative gradient overlay */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    background: "radial-gradient(circle at 80% 20%, #25d36622 0%, transparent 70%)",
                    zIndex: 0,
                }} />
            </section>
            {/* Section 3: Features */}
            <section
                style={{
                    width: "100vw",
                    minHeight: "100vh",
                    background: "#111b21",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    padding: "4rem 0",
                }}
            >
                <h2 style={{
                    color: "#25d366",
                    fontWeight: 700,
                    fontSize: "2.2rem",
                    marginBottom: "2.5rem",
                    letterSpacing: ".5px",
                }}>
                    Why Choose ChatVerse?
                </h2>
                <div style={{
                    display: "flex",
                    gap: "2.5rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "1100px",
                }}>
                    <div style={featureCardStyle}>
                        <div style={featureIconStyle}>💬</div>
                        <h5 style={featureTitleStyle}>Real-time Messaging</h5>
                        <p style={featureDescStyle}>Enjoy smooth, fast, and reliable real-time chat with anyone, anywhere.</p>
                    </div>
                    <div style={featureCardStyle}>
                        <div style={featureIconStyle}>🔒</div>
                        <h5 style={featureTitleStyle}>Secure Communication</h5>
                        <p style={featureDescStyle}>End-to-end encryption keeps your chats safe and private.</p>
                    </div>
                    <div style={featureCardStyle}>
                        <div style={featureIconStyle}>👥</div>
                        <h5 style={featureTitleStyle}>Group & Private Chats</h5>
                        <p style={featureDescStyle}>Chat one-on-one or create groups with your friends, family, or team.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Card styles for "How to use"
const howToCardStyle = {
    background: "#26343b",
    borderRadius: "18px",
    padding: "2rem 1.5rem",
    minWidth: 220,
    maxWidth: 300,
    flex: "1 1 220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
};

const howToIconStyle = {
    fontSize: "2.2rem",
    marginBottom: "1rem",
};

const howToTitleStyle = {
    color: "#25d366",
    fontWeight: 600,
    fontSize: "1.2rem",
    marginBottom: ".7rem",
};

const howToDescStyle = {
    color: "#d1d7db",
    fontSize: "1rem",
    textAlign: "center",
};

// Card styles for Features
const featureCardStyle = {
    background: "#202c33",
    borderRadius: "18px",
    padding: "2rem 1.5rem",
    minWidth: 220,
    maxWidth: 300,
    flex: "1 1 220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
};

const featureIconStyle = {
    fontSize: "2.2rem",
    marginBottom: "1rem",
};

const featureTitleStyle = {
    color: "#25d366",
    fontWeight: 600,
    fontSize: "1.2rem",
    marginBottom: ".7rem",
};

const featureDescStyle = {
    color: "#aebac1",
    fontSize: "1rem",
    textAlign: "center",
};

// Zig-zag step styles
const zigZagStepCardStyle = {
    background: "rgba(38,52,59,0.97)",
    borderRadius: "16px",
    padding: "1.5rem 1.7rem",
    boxShadow: "0 2px 12px #0002",
    display: "flex",
    gap: "1.2rem",
    maxWidth: 370,
    minWidth: 260,
    marginBottom: 0,
    width: "100%",
};

const zigZagStepCircleCenterStyle = {
    minWidth: 48,
    minHeight: 48,
    background: "linear-gradient(135deg, #25d366 60%, #128c7e 100%)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    color: "#fff",
    fontWeight: 700,
    boxShadow: "0 2px 8px #25d36633",
    margin: "0 0 0 0",
    alignSelf: "center",
};

const zigZagStepTitleStyle = {
    color: "#25d366",
    fontWeight: 600,
    fontSize: "1.13rem",
    marginBottom: ".3rem",
    marginTop: 0,
};

const zigZagStepDescStyle = {
    color: "#d1d7db",
    fontSize: "1rem",
    margin: 0,
    maxWidth: 260,
    lineHeight: 1.5,
};

export default Home;