import { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const AuthContext = createContext();

const PASSWORD_HASH =
    "82ade1d7b45c25324cfd3f29df4e10aab1bc43b2004b4dbde92fcf0f1b351d52"; // only you know real password

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // configurable session timeout (in ms) — e.g., 60 mins
    const SESSION_TIMEOUT = 60 * 60 * 1000;

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

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
