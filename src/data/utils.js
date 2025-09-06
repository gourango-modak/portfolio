import { SIMULATE_API_DELAY_SEC } from "../config";
import { delay } from "../utils/common";

// A mock API to simulate fetching data with filter
export const fetchItems = (page, limit, filter = {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const start = (page - 1) * limit;
            const end = start + limit;

            // Create mock data
            const mockData = Array.from({ length: 100 }, (_, i) => ({
                id: i + 1,
                title: `Item ${i + 1}`,
                description: `This is the description for item number ${
                    i + 1
                }.`,
                category: i % 5 === 0 ? "A" : "B", // Example category
            }));

            // Apply filters if provided
            let filteredData = mockData;

            if (filter.searchTerm) {
                const term = filter.searchTerm.toLowerCase();
                filteredData = filteredData.filter(
                    (item) =>
                        item.title.toLowerCase().includes(term) ||
                        item.description.toLowerCase().includes(term)
                );
            }

            if (filter.category) {
                filteredData = filteredData.filter(
                    (item) => item.category === filter.category
                );
            }

            resolve(filteredData.slice(start, end));
        }, SIMULATE_API_DELAY_SEC * 1000); // Simulate network delay
    });
};

export const fetchData = async (url) => {
    if (SIMULATE_API_DELAY_SEC > 0) {
        await delay(SIMULATE_API_DELAY_SEC * 1000);
    }

    return await fetch(url);
};
