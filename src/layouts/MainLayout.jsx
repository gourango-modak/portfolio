import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { useDarkMode } from "../context/DarkModeContext";

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
			className={
				darkMode
					? "dark bg-white dark:bg-neutral-950"
					: "bg-white dark:bg-neutral-950"
			}
		>
			<Navbar scrolled={scrolled} />
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<main>{children}</main>
			</div>
		</div>
	);
}
