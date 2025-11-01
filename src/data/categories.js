import { CATEGORY_MANIFEST_FILE_URL } from "../config";
import { fetchData } from "./utils";

// Cache manifest in memory
let cachedCategoryManifest = null;

/**
 * Fetch the categories manifest file and cache it
 */
const getCategoryManifest = async () => {
    if (!cachedCategoryManifest) {
        const res = await fetchData(CATEGORY_MANIFEST_FILE_URL);
        cachedCategoryManifest = await res.json();
    }
    return cachedCategoryManifest;
};

/**
 * Fetch categories with optional pagination and filters
 */
export const fetchCategories = async (
    page = 1,
    pageSize = 10,
    filters = {}
) => {
    const manifest = await getCategoryManifest();
    const allCategories = manifest.categories || [];

    const { searchTerm = "" } = filters;

    // Apply filters
    const filteredCategories = allCategories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredCategories.length);
    const categories = filteredCategories.slice(startIndex, endIndex);

    return categories;
};

/**
 * Fetch all categories without pagination or filters
 */
export const fetchAllCategories = async () => {
    const manifest = await getCategoryManifest();
    return manifest.categories || [];
};

/**
 * Fetch a single category by id
 */
export const fetchCategoryById = async (id) => {
    const manifest = await getCategoryManifest();
    const allCategories = manifest.categories || [];

    const category = allCategories.find((c) => c.id === id);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }

    const res = await fetchData(category.url);
    if (!res.ok) {
        throw new Error(`Failed to fetch content for category with id ${id}`);
    }

    return await res.json();
};
