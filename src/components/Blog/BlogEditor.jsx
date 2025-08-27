import { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import BlogTitle from "./BlogTitle";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";
import CodeBox from "@bomdi/codebox";
import Delimiter from "@coolbytes/editorjs-delimiter";
import "./BlogEditor.css";

const BlogEditor = ({ onSave }) => {
	const editorInstance = useRef(null);
	const [title, setTitle] = useState("");

	useEffect(() => {
		// Initialize Editor.js only if not already initialized
		const initEditor = async () => {
			if (!editorInstance.current) {
				editorInstance.current = new EditorJS({
					holder: "editorjs",
					autofocus: true,
					placeholder: "Write your blog content here...",
					tools: {
						header: Header,
						list: List,
						image: {
							class: ImageTool,
							config: {
								uploader: {
									/**
									 * This function is called when user selects an image
									 * @param {File} file - selected file
									 * @returns {Promise<{success: number, file: {url: string}}>}
									 */
									async uploadByFile(file) {
										// If you want to use a pre-existing image from your assets folder,
										// you can return its path directly:
										return {
											success: 1,
											file: {
												// Example: local image in /public/images/
												url: `/src/assets/${file.name}`,
											},
										};
									},
									// Optional: upload by URL
									async uploadByUrl(url) {
										return {
											success: 1,
											file: { url }, // just return the URL
										};
									},
								},
							},
						},
						inlineCode: {
							class: InlineCode,
						},
						paragraph: {
							class: Paragraph,
							inlineToolbar: true,
						},
						codeBox: {
							class: CodeBox,
							config: {
								themeURL:
									"https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
								themeName: "atom-one-dark", // Optional
								useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
							},
						},
						delimiter: {
							class: Delimiter,
							config: {
								styleOptions: ["star", "dash", "line"],
								defaultStyle: "star",
								lineWidthOptions: [50, 60, 100],
								defaultLineWidth: 25,
								lineThicknessOptions: [1, 2, 3, 4, 5, 6],
								defaultLineThickness: 2,
							},
						},
					},
				});

				try {
					await editorInstance.current.isReady;
					console.log("Editor.js is ready");
				} catch (err) {
					console.error("Editor.js initialization failed:", err);
				}
			}
		};

		initEditor();

		// Cleanup on unmount
		return () => {
			if (
				editorInstance.current &&
				typeof editorInstance.current.destroy === "function"
			) {
				editorInstance.current.destroy();
				editorInstance.current = null;
			}
		};
	}, []);

	const handleSave = async () => {
		if (!editorInstance.current) return;

		try {
			const outputData = await editorInstance.current.save();
			const blogData = { title, content: outputData };
			if (onSave) onSave(blogData);
			console.log("Saved blog data:", blogData);
		} catch (err) {
			console.error("Failed to save blog content:", err);
		}
	};

	return (
		<div className="blog-editor">
			<BlogTitle
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Title..."
			/>
			<div id="editorjs" className=""></div>
			<button
				onClick={handleSave}
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Save Blog
			</button>
		</div>
	);
};

export default BlogEditor;
