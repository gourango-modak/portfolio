import { POST_FILES_BASE_URL, POSTS_MANIFEST_FILE_URL } from "../config";
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

export const fetchPosts = async () => {
    const postFiles = await getPostFiles();
    const posts = await fetchAllData(POST_FILES_BASE_URL, postFiles, "posts");
    return posts;
};
