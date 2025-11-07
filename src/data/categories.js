import { CATEGORY_MANIFEST_FILE_URL } from "../config";
import { fetchData } from "./utils";

// Cache manifest in memory
let cachedCategoryManifest = null;

/**
 * Fetch the categories manifest file and cache it
 */
const getCategoryManifest = async () => {
    if (!cachedCategoryManifest) {
        try {
            const res = await fetchData(CATEGORY_MANIFEST_FILE_URL);
            cachedCategoryManifest = await res.json();
        } catch {}
    }
    return cachedCategoryManifest;
};

/**
 * Fetch categories with optional pagination and filters
 */
export const fetchCategories = async (filters = {}) => {
    const manifest = await getCategoryManifest();
    const allCategories = manifest?.categories || [];

    const { searchTerm = "" } = filters;

    // Apply filters
    const filteredCategories = allCategories.filter((cat) =>
        cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredCategories;
};

/**
 * Fetch all categories without pagination or filters
 */
export const fetchAllCategories = async () => {
    const manifest = await getCategoryManifest();
    return manifest?.categories || [];
};

/**
 * get total categories count
 */
export const getTotalCategoriesCount = async () => {
    const manifest = await getCategoryManifest();
    return manifest?.totalCategories || 0;
};
