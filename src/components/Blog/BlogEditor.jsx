import { forwardRef, useImperativeHandle, useState } from "react";
import { useEditor } from "../../hooks/useEditor"; // Import the custom hook
import { EDITOR_JS_TOOLS } from "../../config/editorTools"; // Import the configuration
import BlogTitle from "./BlogTitle";
import "./BlogEditor.css";

const BlogEditor = forwardRef(({ onSave }, ref) => {
	const [title, setTitle] = useState("");
	const editorInstance = useEditor({
		holder: "editorjs",
		tools: EDITOR_JS_TOOLS,
	});

	// Expose a 'save' method to the parent component via the ref.
	useImperativeHandle(ref, () => ({
		async save() {
			if (!editorInstance.current) {
				console.error("Editor instance is not available.");
				return;
			}

			try {
				const id = Date.now() + Math.floor(Math.random() * 1000);
				const content = await editorInstance.current.save();
				const blogData = { title, content, id };

				// Pass the saved data up to the parent.
				if (onSave) {
					onSave(blogData);
				}

				console.log("Saved blog data:", blogData);
			} catch (err) {
				console.error("Failed to save blog content:", err);
			}
		},
	}));

	return (
		<div className="blog-editor">
			<BlogTitle
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Title..."
			/>
			<div id="editorjs"></div>
		</div>
	);
});

export default BlogEditor;
