import { fetchAllData } from "./dataFetcher";

const postBaseUrl =
    "https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/master/public/data/blogs/";

const postFiles = [
    "1756361402748_introduction-to-hashing.json",
    "1756387678932_hashing_-a-fundamental-technique-in-data-structures.json",
    "1756392574607_understanding-hashing-and-its-various-types.json",
];

export const fetchPosts = async (limit) => {
    const posts = await fetchAllData(postBaseUrl, postFiles, "posts");

    if (limit && Number.isInteger(limit) && limit > 0) {
        return posts.slice(0, limit);
    }

    return posts;
};
