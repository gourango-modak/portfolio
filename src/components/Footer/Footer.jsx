import { Link } from "react-router-dom";

const Footer = () => {
	const links = [
		{
			href: "https://github.com/yourusername",
			label: "GitHub",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0019 4.77 5.07 5.07 0 0018.91 1S17.73.65 15 2.48a13.38 13.38 0 00-6 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77 5.44 5.44 0 003 9.52c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 00-.94 2.61V22"></path>
				</svg>
			),
		},
		{
			href: "https://linkedin.com/in/yourusername",
			label: "LinkedIn",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z"></path>
					<rect x="2" y="9" width="4" height="12"></rect>
					<circle cx="4" cy="4" r="2"></circle>
				</svg>
			),
		},
		{
			href: "/resume.pdf",
			label: "Resume",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
					<polyline points="14 2 14 8 20 8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
					<line x1="10" y1="9" x2="8" y2="9" />
				</svg>
			),
		},
		{
			href: "mailto:gourango.modak.2@gmail.com",
			label: "Contact",
			icon: (
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M4 4h16v16H4z" />
					<polyline points="22,6 12,13 2,6" />
				</svg>
			),
		},
	];

	return (
		<footer className="mt-16 border-t border-neutral-200 dark:border-neutral-700">
			<div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center text-sm text-neutral-600 dark:text-neutral-400">
				{/* Left */}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
					<Link
						to={"/"}
						className="text-lg font-bold text-gray-800 dark:text-white cursor-pointer"
					>
						Gourango.
					</Link>
					<div className="md:mb-0 text-center sm:pl-3 sm:text-left sm:border-l sm:border-neutral-300 sm:dark:border-neutral-600">
						© {new Date().getFullYear()} Gourango Modak. All rights
						reserved.
					</div>
				</div>

				{/* Right */}
				<div className="flex space-x-5">
					{links.map(({ href, label, icon }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center space-x-1 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition"
							aria-label={label}
							title={label}
						>
							<span>{icon}</span>
							<span className="hidden sm:inline">{label}</span>
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
