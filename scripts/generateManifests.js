import fs from "fs";
import path from "path";
import { POST_FILES_BASE_URL, PROJECT_FILES_BASE_URL } from "../src/config.js";

// Helper function to read JSON files from a folder
const readJsonFiles = (folderPath, excludeFile) => {
    const dir = path.resolve(folderPath);
    const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".json") && f !== excludeFile);

    return files.map((file) => {
        const content = fs.readFileSync(path.join(dir, file), "utf-8");
        const json = JSON.parse(content);
        return { ...json, _fileName: file }; // store file name for URL
    });
};

// Helper function to get top N occurrences from an array
const getTopOccurrences = (arr, topN = 10) => {
    const countMap = {};
    arr.forEach((item) => {
        countMap[item] = (countMap[item] || 0) + 1;
    });

    return Object.entries(countMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([key]) => key);
};

// Generate posts manifest with top 10 tags
const generatePostsManifest = () => {
    const folder = "public/data/blogs";
    const manifestFile = "posts-manifest.json";
    const posts = readJsonFiles(folder, manifestFile);

    // Collect all tags
    const allTags = posts.flatMap((post) => post.tags || []);
    const topTags = getTopOccurrences(allTags, 10);

    const manifest = {
        totalPosts: posts.length,
        topTags,
        posts: posts.map((p) => {
            return {
                title: p.title,
                url: `${POST_FILES_BASE_URL}/${p._fileName}`,
                tags: p.tags || [],
                description: p.description,
                slug: p.slug,
            };
        }),
    };

    fs.writeFileSync(
        path.join(folder, manifestFile),
        JSON.stringify(manifest, null, 2)
    );
    console.log(
        `✅ Generated posts manifest with ${posts.length} posts and top tags`
    );
};

// Generate projects manifest with top 10 categories
const generateProjectsManifest = () => {
    const folder = "public/data/projects";
    const manifestFile = "projects-manifest.json";
    const projects = readJsonFiles(folder, manifestFile);

    // Collect all categories
    const allCategories = projects.map((p) => p.category).filter(Boolean);
    const topCategories = getTopOccurrences(allCategories, 10);

    const manifest = {
        totalProjects: projects.length,
        topCategories,
        projects: projects.map((p) => {
            return {
                title: p.title,
                category: p.category,
                url: `${PROJECT_FILES_BASE_URL}/${p._fileName}`,
                description: p.description,
                slug: p.slug,
            };
        }),
    };

    fs.writeFileSync(
        path.join(folder, manifestFile),
        JSON.stringify(manifest, null, 2)
    );
    console.log(
        `✅ Generated projects manifest with ${projects.length} projects and top categories`
    );
};

// Run generators
generatePostsManifest();
generateProjectsManifest();
