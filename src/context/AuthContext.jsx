import { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

const PASSWORD_HASH =
    "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"; // only you know real password

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // configurable session timeout (in hours)
    const SESSION_TIMEOUT = 1 * 60 * 60 * 1000;

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem("session"));
        if (session && session.expiry > Date.now()) {
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem("session");
        }
    }, []);

    const login = (password) => {
        const hash = CryptoJS.SHA256(password).toString();
        if (hash === PASSWORD_HASH) {
            const expiry = Date.now() + SESSION_TIMEOUT;
            localStorage.setItem("session", JSON.stringify({ expiry }));
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        localStorage.removeItem("session");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
