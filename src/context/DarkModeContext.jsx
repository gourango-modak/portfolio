import React, { createContext, useState, useEffect, useContext } from "react";

// Create context
const DarkModeContext = createContext();

// Provider component
export const DarkModeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);

	// Optional: persist mode in localStorage and sync with system preference
	useEffect(() => {
		const saved = localStorage.getItem("darkMode");
		if (saved !== null) {
			setDarkMode(saved === "true");
		} else {
			// Detect system preference on first load
			const prefersDark = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			setDarkMode(prefersDark);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("darkMode", darkMode);
	}, [darkMode]);

	return (
		<DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

// Custom hook for easy use in components
export const useDarkMode = () => useContext(DarkModeContext);
