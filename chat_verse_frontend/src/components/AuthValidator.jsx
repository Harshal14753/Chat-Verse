import { Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function AuthValidator({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem("phoneNumber");
    const [hasVisited, setHasVisited] = useState(false); // tab-specific in memory

    useEffect(() => {
        if (token) {
            // First visit in this tab
            if (!hasVisited) {
                setHasVisited(true);
                navigate("/chat/personal");
            }
        }
    }, [token, hasVisited, navigate]);

    // If not logged in, redirect to home/login
    if (!token) {
        return <Navigate to="/" />;
    }

    // Render children normally
    return <>{children}</>;
}

export default AuthValidator;
