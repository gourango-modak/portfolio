// SocialButtons.jsx
const SocialButtons = () => {
	return (
		<div className="flex flex-wrap gap-4 mt-6">
			{/* Resume */}
			<a
				href="/resume.pdf"
				target="_blank"
				rel="noopener noreferrer"
				title="Resume"
				className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-sm font-medium"
			>
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
					<title>Resume</title>
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
					<polyline points="14 2 14 8 20 8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
					<polyline points="10 9 9 9 8 9" />
				</svg>
				<span>Resume</span>
			</a>

			{/* LinkedIn */}
			<a
				href="https://linkedin.com/in/your-profile"
				target="_blank"
				rel="noopener noreferrer"
				title="LinkedIn"
				className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300  text-neutral-600 dark:text-neutral-400 dark:border-neutral-400 hover:bg-blue-50 dark:hover:bg-neutral-900 transition text-sm font-medium"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="currentColor"
				>
					<title>LinkedIn</title>
					<path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.5v2.14h.05c.49-.9 1.7-1.84 3.5-1.84 3.74 0 4.45 2.46 4.45 5.66V24h-4v-8.33c0-2-.03-4.57-2.79-4.57-2.79 0-3.22 2.17-3.22 4.42V24h-4V8z" />
				</svg>
				<span>LinkedIn</span>
			</a>

			{/* GitHub */}
			<a
				href="https://github.com/your-username"
				target="_blank"
				rel="noopener noreferrer"
				title="GitHub"
				className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-400 dark:border-neutral-500 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition text-sm font-medium"
			>
				<svg
					width="20"
					height="20"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<title>GitHub</title>
					<path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.4-3.87-1.4-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.66 1.23 3.31.94.1-.74.4-1.23.73-1.51-2.55-.3-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.17-3.11-.12-.29-.51-1.48.11-3.07 0 0 .96-.31 3.15 1.19a10.85 10.85 0 012.88-.39c.98.01 1.97.13 2.88.39 2.19-1.5 3.15-1.19 3.15-1.19.62 1.59.24 2.78.12 3.07.73.81 1.17 1.85 1.17 3.11 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.1.78 2.22v3.29c0 .31.21.66.8.55A10.97 10.97 0 0023.5 12C23.5 5.74 18.27.5 12 .5z" />
				</svg>
				<span>GitHub</span>
			</a>
		</div>
	);
};

export default SocialButtons;
