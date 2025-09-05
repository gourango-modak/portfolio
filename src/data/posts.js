import { POSTS_MANIFEST_FILE_URL } from "../config";
import { delay } from "../utils/common";

// Cache manifest in memory
let cachedPostManifest = null;

/**
 * Fetch the posts manifest file and cache it
 */
const getPostManifest = async () => {
    await delay(10 * 1000);
    if (!cachedPostManifest) {
        const res = await fetch(POSTS_MANIFEST_FILE_URL);
        cachedPostManifest = await res.json();
    }
    return cachedPostManifest;
};

export const fetchPosts = async (page = 1, pageSize = 10) => {
    const manifest = await getPostManifest();
    const allPosts = manifest.posts || [];
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalPosts);

    // Slice posts for the current page
    const posts = allPosts.slice(startIndex, endIndex);

    return {
        data: posts,
        hasMore: page < totalPages,
    };
};

/**
 * Get top tags from manifest
 */
export const getTopTags = async () => {
    const manifest = await getPostManifest();
    return manifest.topTags || [];
};
