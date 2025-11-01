import fs from "fs";
import path from "path";
import {
    CATEGORY_FILES_BASE_URL,
    CATEGORY_MANIFEST_FILE_NAME,
    POST_FILES_BASE_URL,
    POST_TAGS_MANIFEST_FILE_NAME,
    POSTS_MANIFEST_FILE_NAME,
    PROJECT_FILES_BASE_URL,
    PROJECT_TAGS_MANIFEST_FILE_NAME,
    PROJECTS_MANIFEST_FILE_NAME,
} from "../src/config.js";

// Helper function to read JSON files from a folder
const readJsonFiles = (folderPath) => {
    const dir = path.resolve(folderPath);
    const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".json") && !f.includes("manifest"));

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
    const manifestFile = POSTS_MANIFEST_FILE_NAME;
    const posts = readJsonFiles(folder);

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
                createdAt: p.createdAt,
                id: p.id,
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
    const manifestFile = PROJECTS_MANIFEST_FILE_NAME;
    const projects = readJsonFiles(folder);

    // Collect all categories
    const allCategories = projects.map((p) => p.category?.name).filter(Boolean);
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
                createdAt: p.createdAt,
                id: p.id,
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

// Generate categories manifest
const generateCategoriesManifest = () => {
    const folder = "public/data/categories";
    const manifestFile = CATEGORY_MANIFEST_FILE_NAME;
    const categories = readJsonFiles(folder);
    console.log(categories);

    const manifest = {
        totalCategories: categories.length,
        categories: categories.map((p) => {
            return {
                name: p.name,
                url: `${CATEGORY_FILES_BASE_URL}/${p._fileName}`,
                id: p.id,
            };
        }),
    };

    fs.writeFileSync(
        path.join(folder, manifestFile),
        JSON.stringify(manifest, null, 2)
    );
    console.log(
        `✅ Generated categories manifest with ${categories.length} categories`
    );
};

// Generate project tags manifest
const generateProjectTagsManifest = () => {
    const folder = "public/data/projects";
    const manifestFile = PROJECT_TAGS_MANIFEST_FILE_NAME;
    const projects = readJsonFiles(folder);

    // Extract all tags from all projects, flatten, and remove duplicates
    const allTags = projects
        .map((p) => p.tags || []) // ensure it's always an array
        .flat() // flatten nested arrays
        .map((tag) => tag.trim().toLowerCase()) // normalize case/spacing
        .filter((tag, index, self) => tag && self.indexOf(tag) === index); // unique + non-empty

    const manifest = {
        totalTags: allTags.length,
        tags: allTags,
    };

    fs.writeFileSync(
        path.join(folder, manifestFile),
        JSON.stringify(manifest, null, 2)
    );
    console.log(
        `✅ Generated project tags manifest with ${allTags.length} tags`
    );
};

// Generate post tags manifest
const generatePostTagsManifest = () => {
    const folder = "public/data/blogs";
    const manifestFile = POST_TAGS_MANIFEST_FILE_NAME;
    const posts = readJsonFiles(folder);

    // Extract all tags from all projects, flatten, and remove duplicates
    const allTags = posts
        .map((p) => p.tags || []) // ensure it's always an array
        .flat() // flatten nested arrays
        .map((tag) => tag.trim().toLowerCase()) // normalize case/spacing
        .filter((tag, index, self) => tag && self.indexOf(tag) === index); // unique + non-empty

    const manifest = {
        totalTags: allTags.length,
        tags: allTags,
    };

    fs.writeFileSync(
        path.join(folder, manifestFile),
        JSON.stringify(manifest, null, 2)
    );
    console.log(`✅ Generated post tags manifest with ${allTags.length} tags`);
};

// Run generators
generatePostsManifest();
generatePostTagsManifest();
generateProjectsManifest();
generateProjectTagsManifest();
generateCategoriesManifest();
