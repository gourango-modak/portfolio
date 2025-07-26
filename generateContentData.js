import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the folder containing markdown blog posts
const postsDir = path.join(__dirname, "./src/content");
// Output directory where the generated JSON files will be saved
const outputDir = path.join(__dirname, "./src/content/json");

// Utility: Extracts frontmatter metadata and main content from markdown
function parseFrontMatter(content) {
	const lines = content.split("\n");
	const metadataIndices = lines.reduce((acc, line, i) => {
		if (/^---/.test(line)) acc.push(i);
		return acc;
	}, []);

	let metadata = {};
	// Extract frontmatter block if it exists
	if (metadataIndices.length >= 2) {
		const rawMetadata = lines.slice(
			metadataIndices[0] + 1,
			metadataIndices[1]
		);
		rawMetadata.forEach((line) => {
			const [key, ...rest] = line.split(":");
			metadata[key.trim()] = rest.join(":").trim();
		});
	}

	// Extract main content after the frontmatter block
	const body =
		metadataIndices.length >= 2
			? lines
					.slice(metadataIndices[1] + 1)
					.join("\n")
					.trim()
			: content.trim();

	return { metadata, content: body };
}

// Utility: Converts filename to a slug (URL-friendly string)
function slugify(filename) {
	return filename
		.toLowerCase()
		.replace(/\.[^/.]+$/, "")
		.replace(/\s+/g, "-");
}

// Main function to process blog posts and generate output files
async function generate() {
	try {
		const files = await fs.readdir(postsDir);

		const posts = [];
		const tagsMap = {};
		const categoriesMap = {};
		const searchIndex = [];

		// Process only .md files
		const mdFiles = files.filter((file) =>
			file.toLowerCase().endsWith(".md")
		);

		for (const file of mdFiles) {
			const filePath = path.join(postsDir, file);
			const raw = await fs.readFile(filePath, "utf8");
			const { metadata, content } = parseFrontMatter(raw);

			// Fallbacks if metadata is missing
			const dateStr = metadata.date || "1970-01-01";
			const dateObj = new Date(dateStr);
			// Convert the post date string into a Unix timestamp (seconds since Jan 1, 1970).
			// Date.getTime() returns milliseconds, so we divide by 1000 to get seconds.
			// This numeric timestamp is used for sorting posts by date and as a unique ID.
			const timestamp = dateObj.getTime() / 1000;

			const tags = metadata.tags
				? metadata.tags
						.split(",")
						.map((tag) => tag.trim())
						.filter(Boolean)
				: [];

			const category = metadata.category
				? metadata.category.trim()
				: "general";

			const series = metadata.series || null;
			const seriesOrder = metadata.series_order
				? Number(metadata.series_order)
				: null;

			const summary = metadata.summary
				? metadata.summary + (content.length > 150 ? "..." : "")
				: "";

			// Build the post object
			const post = {
				id: timestamp,
				slug: slugify(file),
				title: metadata.title || "No title given",
				author: metadata.author || "No author given",
				date: dateStr,
				tags,
				category,
				series,
				seriesOrder,
				summary,
				content: content || "No content given",
			};

			posts.push(post);

			// Add post to each tag in the map
			tags.forEach((tag) => {
				if (!tagsMap[tag]) tagsMap[tag] = [];
				tagsMap[tag].push(post.slug);
			});

			// Add post to category map
			if (!categoriesMap[category]) categoriesMap[category] = [];
			categoriesMap[category].push(post.slug);
		}

		// Sort posts from newest to oldest
		posts.sort((a, b) => b.id - a.id);

		// Write all output JSON files
		await fs.writeFile(
			path.join(outputDir, "posts.json"),
			JSON.stringify(posts, null, 2)
		);
		await fs.writeFile(
			path.join(outputDir, "tags.json"),
			JSON.stringify(tagsMap, null, 2)
		);
		await fs.writeFile(
			path.join(outputDir, "categories.json"),
			JSON.stringify(categoriesMap, null, 2)
		);

		console.log(
			"Blog content processed and JSON files saved successfully!"
		);
	} catch (err) {
		console.error("Error processing blog posts:", err);
	}
}

generate();
