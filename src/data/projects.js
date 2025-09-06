import { PROJECT_MANIFEST_FILE_URL } from "../config";
import { fetchData } from "./utils";

// Cache manifest in memory
let cachedProjectManifest = null;

/**
 * Fetch the projects manifest file and cache it
 */
const getProjectManifest = async () => {
    if (!cachedProjectManifest) {
        const res = await fetchData(PROJECT_MANIFEST_FILE_URL);
        cachedProjectManifest = await res.json();
    }
    return cachedProjectManifest;
};

export const fetchProjects = async (page = 1, pageSize = 10, filters = {}) => {
    const manifest = await getProjectManifest();
    const allProjects = manifest.projects || [];

    const { searchTerm = "", selectedCategories = [] } = filters;

    // Apply filters
    const filteredProjects = allProjects.filter((project) => {
        const matchesTitle = project.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategories.length > 0
                ? selectedCategories.includes(project.category)
                : true;

        return matchesTitle && matchesCategory;
    });

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredProjects.length);
    const projects = filteredProjects.slice(startIndex, endIndex);

    return projects;
};

/**
 * Get top categories from manifest
 */
export const getTopCategories = async () => {
    const manifest = await getProjectManifest();
    return manifest.topCategories || [];
};

/**
 * Fetch a single project by slug
 */
export const fetchProjectBySlug = async (slug) => {
    const manifest = await getProjectManifest();
    const allProjects = manifest.projects || [];

    const project = allProjects.find((p) => p.slug === slug);
    if (!project) {
        throw new Error(`Project with slug ${slug} not found`);
    }

    if (!project.url) {
        throw new Error(`Project with slug ${slug} does not have a url`);
    }

    const res = await fetchData(project.url);
    if (!res.ok) {
        throw new Error(
            `Failed to fetch content for project with slug ${slug}`
        );
    }

    return await res.json();
};

/**
 * Fetch a single project by url
 */
export const fetchProjectByUrl = async (url) => {
    const res = await fetchData(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch content for project with url ${url}`);
    }

    return await res.json();
};
