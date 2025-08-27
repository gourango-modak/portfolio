// 1. A cache variable to store the project data after the first fetch.
// It's defined outside the function so it persists between calls.
let projectsCache = null;

// An array of URLs pointing to your project JSON files.
// You can add as many links here as you need.
const projectJsonUrls = [
	"https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/master/src/assets/Projects/e-commerce-platform.json",
	// Add more JSON file links here
];

/**
 * Fetches project data from a list of JSON file URLs, using a cache to avoid re-fetching.
 * @returns {Promise<Array>} A promise that resolves to an array of project objects.
 */
export const fetchAllProjects = async () => {
	// 2. If the cache already has data, return it immediately without a network request.
	if (projectsCache) {
		return projectsCache;
	}

	try {
		// Use Promise.all to fetch all JSON files concurrently for better performance.
		const projectPromises = projectJsonUrls.map((url) =>
			fetch(url).then((response) => {
				// Check if the network response was ok
				if (!response.ok) {
					throw new Error(`Network response was not ok for ${url}`);
				}
				return response.json();
			})
		);

		// Wait for all fetch requests to complete.
		const projects = await Promise.all(projectPromises);

		// 3. Store the fetched data in the cache for future use.
		projectsCache = projects;

		// Return the combined array of all project data.
		return projects;
	} catch (error) {
		// If any of the fetches fail, log the error to the console.
		console.error("Failed to fetch project data:", error);
		// Return an empty array to prevent the application from crashing.
		return [];
	}
};
