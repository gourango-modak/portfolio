import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || "/admin";
            navigate(from, { replace: true });
        }
    }, [isAuthenticated]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(password);
        if (success) {
            navigate("/"); // redirect after login
        } else {
            setError("Invalid password");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-slate-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-6 sm:p-12 md:w-100 m-6"
            >
                <h2 className="text-4xl font-semibold text-center mb-12">
                    Login
                </h2>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg mb-3 outline-none resize-none focus:ring-2 hide-scrollbar ${
                        error
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    }`}
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white rounded px-3 py-2 hover:bg-indigo-700 cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
