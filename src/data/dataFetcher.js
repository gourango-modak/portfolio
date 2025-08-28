const cache = {};

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
