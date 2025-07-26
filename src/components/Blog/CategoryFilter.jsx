import { getMostUsedCategories } from "../../utils/postUtils";

export const CategoryFilter = ({ selected, setSelected }) => {
	const toggle = (category) => {
		if (selected.includes(category)) {
			setSelected(selected.filter((c) => c !== category));
		} else {
			setSelected([...selected, category]);
		}
	};

	return (
		<div className="mb-4 flex flex-wrap gap-3">
			{getMostUsedCategories(10).map((category) => (
				<button
					key={category}
					onClick={() => toggle(category)}
					className={`px-4 py-2 rounded-full border ${
						selected.includes(category)
							? "bg-neutral-900 text-white dark:bg-white dark:text-black"
							: "border-neutral-300 dark:border-neutral-600"
					}`}
				>
					{category}
				</button>
			))}
		</div>
	);
};
