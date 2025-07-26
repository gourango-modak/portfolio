import { getMostUsedTags } from "../../utils/postUtils";

const TagFilter = ({ selected, setSelected }) => {
	const toggleTag = (tag) => {
		if (selected.includes(tag)) {
			setSelected(selected.filter((t) => t !== tag));
		} else {
			setSelected([...selected, tag]);
		}
	};

	return (
		<div className="mb-6 flex flex-wrap gap-2">
			<h2 className="w-full mb-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
				Filter by Tags:
			</h2>
			{getMostUsedTags(10).map((tag) => (
				<button
					key={tag}
					onClick={() => toggleTag(tag)}
					className={`px-3 py-1.5 text-sm rounded-full border transition-colors duration-200 ${
						selected.includes(tag)
							? "bg-neutral-900 text-white dark:bg-white dark:text-black"
							: "border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300"
					}`}
				>
					#{tag}
				</button>
			))}
		</div>
	);
};

export default TagFilter;
