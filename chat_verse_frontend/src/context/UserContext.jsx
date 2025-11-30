import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        phoneNumber: "",
        password: "",
        displayName: "",
        role: "",
    });
    const hasVisited = sessionStorage.getItem('hasVisited');


    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('phoneNumber', userData.phoneNumber);
        localStorage.setItem('password', userData.password);
        localStorage.setItem('displayName', userData.displayName);
        localStorage.setItem('role', userData.role);
        setIsAuthenticated(true);
        navigate('/chat/personal');
        console.log("User logged in:", userData.phoneNumber, userData.role);
    };

    const logout = () => {
        setUser({
            phoneNumber: "",
            password: "",
            displayName: "",
            role: "",
        });
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('password');
        localStorage.removeItem('role');
        localStorage.removeItem('displayName');
        sessionStorage.removeItem('hasVisited');
        navigate('/login');
        setIsAuthenticated(false);
    }

    useEffect(() => {
        const phoneNumber = localStorage.getItem('phoneNumber');
        const password = localStorage.getItem('password');
        const displayName = localStorage.getItem('displayName');
        const role = localStorage.getItem('role');
        if (phoneNumber && role) {
            setUser({
                phoneNumber: phoneNumber,
                password: password,
                displayName: displayName,
                role: role
            });
            setIsAuthenticated(true);
            if (!hasVisited) {
                console.log(sessionStorage.getItem('hasVisited'))
                sessionStorage.setItem('hasVisited', 'true');
                console.log(sessionStorage.getItem('hasVisited'))
                navigate('/chat/personal');
            }
        }
    }, []);


    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
