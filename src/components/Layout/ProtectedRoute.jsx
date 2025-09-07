import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // render child routes
    return <Outlet />;
};

export default ProtectedRoute;
