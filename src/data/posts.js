import { POSTS_MANIFEST_FILE_URL } from "../config";
import { fetchAllData } from "./dataFetcher";

let cachedPostFiles = null; // cache manifest in memory

const getPostFiles = async () => {
    if (!cachedPostFiles) {
        cachedPostFiles = await fetch(POSTS_MANIFEST_FILE_URL).then((res) =>
            res.json()
        );
    }
    return cachedPostFiles;
};

export const fetchPosts = async (limit) => {
    const postFiles = await getPostFiles();
    const posts = await fetchAllData(postBaseUrl, postFiles, "posts");

    if (limit && Number.isInteger(limit) && limit > 0) {
        return posts.slice(0, limit);
    }

    return posts;
};
