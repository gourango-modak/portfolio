import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

const ThemeToggle = ({ isMobile = false }) => {
	const { darkMode, setDarkMode } = useDarkMode();

	return isMobile ? (
		<button
			onClick={() => setDarkMode(!darkMode)}
			className="text-gray-800 cursor-pointer dark:text-white"
			aria-label="Toggle theme"
		>
			{darkMode ? <Moon size={24} /> : <Sun size={24} />}
		</button>
	) : (
		<div
			className="flex items-center justify-center gap-2 ml-4 dark:text-white cursor-pointer"
			onClick={() => setDarkMode(!darkMode)}
		>
			<button
				className="rounded cursor-pointer"
				aria-label="Toggle theme"
			>
				{darkMode ? <Moon size={24} /> : <Sun size={24} />}
			</button>
			<span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
		</div>
	);
};

export default ThemeToggle;
