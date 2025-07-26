export const SearchBar = ({ searchTerm, setSearchTerm }) => (
	<div className="relative mb-6">
		<input
			type="text"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
			placeholder="Search by title or summary..."
			className="w-full p-3 pr-10 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
		<svg
			className="absolute right-3 top-3.5 text-neutral-500 dark:text-neutral-400"
			width="20"
			height="20"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 24 24"
		>
			<path d="M21 21l-4.35-4.35"></path>
			<circle cx="10" cy="10" r="6"></circle>
		</svg>
	</div>
);
