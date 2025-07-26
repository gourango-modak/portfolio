import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

const Navbar = ({ scrolled }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div
			className={`sticky top-0 z-50 ${
				scrolled
					? "border-b border-neutral-200 dark:border-neutral-800"
					: ""
			}`}
		>
			<nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 font-sans text-sm font-semibold">
				<div className="flex justify-between h-16 items-center">
					<Link
						to={"/"}
						className="text-lg font-bold text-gray-800 dark:text-white cursor-pointer"
					>
						Gourango.
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex space-x-6 items-center">
						<NavLinks />
						<ThemeToggle />
					</div>

					{/* Mobile Toggle Controls */}
					<div className="md:hidden flex items-center space-x-4">
						<ThemeToggle isMobile />
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="text-gray-800 cursor-pointer dark:text-white"
							aria-label="Toggle menu"
						>
							{menuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
				{/* Mobile Menu */}
				{menuOpen && (
					<div className="md:hidden px-4">
						<div className="border-1 rounded-2xl py-6 border-gray-200 dark:border-gray-500 text-center">
							<NavLinks isMobile />
						</div>
					</div>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
