import { forwardRef, useImperativeHandle, useState } from "react";
import { useEditor } from "../../hooks/useEditor"; // Import the custom hook
import { EDITOR_JS_TOOLS } from "../../config/editorTools"; // Import the configuration
import BlogPostTextField from "./BlogPostTextField";
import "./BlogPostEditor.css";
import { generateId } from "../../utils/id";
import { extractTagsFromContent } from "../../utils/tags";

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
                const content = await editorInstance.current.save();
                const tags = extractTagsFromContent(content);

                const post = {
                    id: generateId(),
                    title,
                    summary,
                    createdAt: Date.now(),
                    content,
                    tags,
                };

                // Pass the saved data up to the parent.
                if (onSave) {
                    onSave(post);
                }

                console.log("Saved blog data:", post);
            } catch (err) {
                console.error("Failed to save blog content:", err);
            }
        },
    }));

    return (
        <>
            {/* <BlogPostTextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title..."
                fontStyle="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800"
            />
            <BlogPostTextField
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary..."
                fontStyle="text-base md:text-lg lg:text-xl text-slate-600"
            /> */}
            <div
                id="editorjs"
                className="prose md:prose-lg lg:prose-xl max-w-none"
            ></div>
        </>
    );
});

export default BlogEditor;
