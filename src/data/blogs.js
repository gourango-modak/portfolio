import { fetchAllData } from "./dataFetcher";

// Blog-specific config
const blogBaseUrl =
	"https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/gh-pages/data/blogs/";

const blogFiles = ["1756361402748_introduction-to-hashing.json"];

// Export a ready-to-use function
export const fetchAllBlogs = () =>
	fetchAllData(blogBaseUrl, blogFiles, "blogs");
