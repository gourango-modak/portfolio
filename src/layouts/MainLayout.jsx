import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { useDarkMode } from "../context/DarkModeContext";
import Footer from "../components/Footer/Footer";

export default function MainLayout({ children }) {
	const { darkMode } = useDarkMode();
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`flex flex-col min-h-screen bg-white dark:bg-neutral-950 ${
				darkMode ? "dark " : ""
			}`}
		>
			<Navbar scrolled={scrolled} />
			<div className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
				<main>{children}</main>
			</div>
			<Footer />
		</div>
	);
}
