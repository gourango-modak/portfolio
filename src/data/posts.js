import { fetchAllData } from "./dataFetcher";

const postBaseUrl =
    "https://raw.githubusercontent.com/gourango-modak/portfolio/refs/heads/master/public/data/blogs/";

const postFiles = [
    "1756888667159_howtouseconfigureawaittoimprovecasyncperformance.json",
];

export const fetchPosts = async (limit) => {
    const posts = await fetchAllData(postBaseUrl, postFiles, "posts");

    if (limit && Number.isInteger(limit) && limit > 0) {
        return posts.slice(0, limit);
    }

    return posts;
};
