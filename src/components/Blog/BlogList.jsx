import { useEffect, useState } from "react";
import { filterPosts } from "../../utils/postUtils";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import TagFilter from "./TagFilter";
import { BlogCard } from "./BlogCard";

const BlogListPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 700); // 300ms debounce

		return () => clearTimeout(timeout); // cleanup
	}, [searchTerm]);

	const filteredPosts = filterPosts({
		searchTerm: debouncedSearchTerm,
		categories: selectedCategories,
		tags: selectedTags,
	});

	return (
		<div className="text-neutral-800 dark:text-white">
			<h1 className="text-3xl font-bold mb-6">Explore Blogs</h1>

			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

			<CategoryFilter
				selected={selectedCategories}
				setSelected={setSelectedCategories}
			/>

			<TagFilter selected={selectedTags} setSelected={setSelectedTags} />

			<div className="grid gap-6 mt-6">
				{filteredPosts.map((post) => (
					<BlogCard key={post.slug} post={post} />
				))}

				{filteredPosts.length === 0 && (
					<p className="text-center text-neutral-500 dark:text-neutral-400">
						No posts match your search or filter.
					</p>
				)}
			</div>
		</div>
	);
};

export default BlogListPage;
