import {
    POST_TAGS_MANIFEST_FILE_URL,
    POSTS_MANIFEST_FILE_URL,
} from "../config";
import { fetchData } from "./utils";

// Cache post manifest in memory
let cachedPostManifest = null;

// Cache post tags manifest in memory
let cachedPostTagsManifest = null;

/**
 * Fetch the posts manifest file and cache it
 */
const getPostManifest = async () => {
    if (!cachedPostManifest) {
        const res = await fetchData(POSTS_MANIFEST_FILE_URL);
        cachedPostManifest = await res.json();
    }
    return cachedPostManifest;
};

export const fetchPosts = async (page = 1, pageSize = 10, filters = {}) => {
    const manifest = await getPostManifest();
    const allPosts = manifest.posts || [];

    const { searchTerm = "", selectedTags = [] } = filters;

    // Apply filters
    const filteredPosts = allPosts.filter((post) => {
        const matchesTitle = post.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        // Ensure post.tags is an array, and check intersection with selectedTags
        const matchesTags =
            selectedTags.length > 0
                ? post.tags?.some((tag) => selectedTags.includes(tag))
                : true;

        return matchesTitle && matchesTags;
    });

    // Pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredPosts.length);
    const posts = filteredPosts.slice(startIndex, endIndex);

    return posts;
};

/**
 * Get top tags from manifest
 */
export const getTopTags = async () => {
    const manifest = await getPostManifest();
    return manifest.topTags || [];
};

/**
 * Fetch a single post by slug
 */
export const fetchPostBySlug = async (slug) => {
    const manifest = await getPostManifest();
    const allPosts = manifest.posts || [];

    const post = allPosts.find((p) => p.slug === slug);
    if (!post) {
        throw new Error(`Post with slug ${slug} not found`);
    }

    if (!post.url) {
        throw new Error(`Post with slug ${slug} does not have a url`);
    }

    const res = await fetchData(post.url);
    if (!res.ok) {
        throw new Error(`Failed to fetch content for post with slug ${slug}`);
    }

    return await res.json();
};

/**
 * Fetch the post tags manifest file and cache it
 */
const getPostTagsManifest = async () => {
    if (!cachedPostTagsManifest) {
        const res = await fetchData(POST_TAGS_MANIFEST_FILE_URL);
        cachedPostTagsManifest = await res.json();
    }
    return cachedPostTagsManifest;
};

/**
 * Fetch all post tags
 */
export const fetchPostTags = async () => {
    const manifest = await getPostTagsManifest();
    return manifest.tags || [];
};
