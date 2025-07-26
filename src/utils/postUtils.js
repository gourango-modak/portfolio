// postUtils.js
import postsData from "../content/json/posts.json";
import tagsData from "../content/json/tags.json";
import categoriesData from "../content/json/categories.json";

/**
 * Get all posts sorted by date descending
 * @returns {Array} posts array
 */
export function getAllPosts() {
	// postsData is already sorted if generated properly, else sort here
	return postsData;
}

/**
 * Get a list of all available tags
 * @returns {Array} array of tag strings
 */
export function getAllTags() {
	return Object.keys(tagsData);
}

/**
 * Get a list of all available categories
 * @returns {Array} array of category strings
 */
export function getAllCategories() {
	return Object.keys(categoriesData);
}

/**
 * Retrieves and sorts all blog posts that belong to a specific series.
 *
 * @param {string} seriesName - The name of the series to filter by.
 * @returns {Array} - A list of posts in the given series, sorted by their `seriesOrder` value.
 *
 * Notes:
 * - Posts must have a `series` field matching the `seriesName`.
 * - Sorting is done based on the `seriesOrder` field in ascending order.
 * - If `seriesOrder` is missing, it defaults to 0.
 */
export const getPostsBySeries = (seriesName) => {
	return posts
		.filter((post) => post.series === seriesName)
		.sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
};

/**
 * Filters posts by search term, multiple categories, and tags.
 * @param {Array} posts - The array of post objects.
 * @param {Object} filters - Filter options.
 * @param {string} [filters.searchTerm] - Keyword to match in title or summary.
 * @param {string[]} [filters.categories] - Allowed categories.
 * @param {string[]} [filters.tags] - Allowed tags.
 * @returns {Array} - Filtered list of posts.
 */
export const filterPosts = ({
	searchTerm = "",
	categories = [],
	tags = [],
} = {}) => {
	const trimmedSearch = searchTerm.trim().toLowerCase();
	return getAllPosts().filter((post) => {
		const matchesSearch =
			!trimmedSearch ||
			post.title.toLowerCase().includes(trimmedSearch) ||
			(post.content &&
				post.content.toLowerCase().includes(trimmedSearch));

		const matchesCategory =
			categories.length === 0 || categories.includes(post.category);

		const matchesTags =
			tags.length === 0 ||
			(Array.isArray(post.tags) &&
				post.tags.some((tag) => tags.includes(tag)));

		return matchesSearch && matchesCategory && matchesTags;
	});
};

export const getMostUsedCategories = (limit = 5) => {
	const count = {};

	getAllPosts().forEach((post) => {
		const category = post.category;
		if (category) {
			count[category] = (count[category] || 0) + 1;
		}
	});

	return Object.entries(count)
		.sort((a, b) => b[1] - a[1]) // sort by frequency
		.slice(0, limit)
		.map(([category]) => category);
};

export const getMostUsedTags = (limit = 5) => {
	const count = {};

	getAllPosts().forEach((post) => {
		if (post.tags && Array.isArray(post.tags)) {
			post.tags.forEach((tag) => {
				count[tag] = (count[tag] || 0) + 1;
			});
		}
	});

	return Object.entries(count)
		.sort((a, b) => b[1] - a[1])
		.slice(0, limit)
		.map(([tag]) => tag);
};
