// A generic cache object to store data for multiple types (projects, blogs, etc.)
const cache = {};

/**
 * Generic function to fetch multiple JSON files with caching.
 * @param {string} baseUrl - The base URL where JSON files are located.
 * @param {string[]} files - Array of JSON file names.
 * @param {string} type - A unique key for caching (e.g., "projects" or "blogs").
 * @returns {Promise<Array>} - An array of parsed JSON objects.
 */
export const fetchAllData = async (baseUrl, files, type) => {
	// If data already cached, return it immediately
	if (cache[type]) {
		return cache[type];
	}

	try {
		// Fetch all JSON files in parallel
		const dataPromises = files.map((file) =>
			fetch(`${baseUrl}${file}`).then((response) => {
				if (!response.ok) {
					throw new Error(`Failed to fetch: ${file}`);
				}
				return response.json();
			})
		);

		const data = await Promise.all(dataPromises);

		// Cache result
		cache[type] = data;

		return data;
	} catch (error) {
		console.error(`Failed to fetch ${type} data:`, error);
		return [];
	}
};
