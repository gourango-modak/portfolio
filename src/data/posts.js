import { fetchAllData } from "./dataFetcher";

const postBaseUrl =
    "https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/master/public/data/blogs/";

const postFiles = ["1756505232165_howdoeshttpsactuallywork.json"];

export const fetchPosts = async (limit) => {
    const posts = await fetchAllData(postBaseUrl, postFiles, "posts");

    if (limit && Number.isInteger(limit) && limit > 0) {
        return posts.slice(0, limit);
    }

    return posts;
};
