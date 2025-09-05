import { PROJECT_MANIFEST_FILE_URL } from "../config";

// Cache manifest in memory
let cachedProjectManifest = null;

/**
 * Fetch the projects manifest file and cache it
 */
const getProjectManifest = async () => {
    if (!cachedProjectManifest) {
        const res = await fetch(PROJECT_MANIFEST_FILE_URL);
        cachedProjectManifest = await res.json();
        console.log(cachedProjectManifest);
    }
    return cachedProjectManifest;
};

export const fetchProjects = async (page = 1, pageSize = 10) => {
    const manifest = await getProjectManifest();
    const allProjects = manifest.projects || [];
    const totalProjects = allProjects.length;
    const totalPages = Math.ceil(totalProjects / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalProjects);

    // Slice projects for the current page
    const projects = allProjects.slice(startIndex, endIndex);

    return {
        data: projects,
        hasMore: page < totalPages,
    };
};

/**
 * Get top categories from manifest
 */
export const getTopCategories = async () => {
    const manifest = await getProjectManifest();
    return manifest.topCategories || [];
};
