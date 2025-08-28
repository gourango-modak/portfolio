import { forwardRef, useImperativeHandle, useState } from "react";
import { useEditor } from "../../hooks/useEditor"; // Import the custom hook
import { EDITOR_JS_TOOLS } from "../../config/editorTools"; // Import the configuration
import BlogTextField from "./BlogTextField";
import "./BlogEditor.css";

const BlogEditor = forwardRef(({ onSave }, ref) => {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
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
                const createdAt = Date.now();
                const content = await editorInstance.current.save();
                // Flatten all text from blocks
                const allText = content.blocks
                    .map((block) => {
                        // Only consider blocks with text content
                        if (
                            block.type === "paragraph" ||
                            block.type === "header"
                        ) {
                            return block.data.text;
                        }
                        return "";
                    })
                    .join(" ");

                // Extract hashtags using regex
                const tags = Array.from(
                    allText.matchAll(/#\w+/g),
                    (match) => match[0]
                );
                const blogData = {
                    id,
                    title,
                    summary,
                    createdAt,
                    content,
                    tags,
                };

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
            <BlogTextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title..."
                fontStyle="font-bold text-3xl"
            />
            <BlogTextField
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary..."
            />
            <div id="editorjs"></div>
        </div>
    );
});

export default BlogEditor;
