import fs from "fs";
import path from "path";

// Helper function to generate manifest for a folder
const generateManifest = (folderPath, outputFile) => {
    const dir = path.resolve(folderPath);
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

    fs.writeFileSync(path.resolve(outputFile), JSON.stringify(files, null, 2));
    console.log(`✅ Generated ${outputFile} with ${files.length} files`);
};

// Generate posts manifest
generateManifest("public/data/blogs", "public/data/blogs/posts-manifest.json");

// Generate projects manifest
generateManifest(
    "public/data/projects",
    "public/data/projects/projects-manifest.json"
);
