import {useContext} from "react";
import { Navigate } from "react-router";
import UserContext from "../context/UserContext.jsx";

const PrivateRoute = ({ element, roles }) => {
    const { user } = useContext(UserContext);

    // Check if the user is authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Check if the user has the required role
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    // If the user is authenticated and has the required role, render the element
    return element;
}

export default PrivateRoute;