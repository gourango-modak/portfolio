import { forwardRef, useImperativeHandle, useState } from "react";
import { useEditor } from "../../hooks/useEditor";
import { EDITOR_JS_TOOLS } from "../../config/editorjs/editorTools";
import "./BlogPostEditor.css";
import { generateId } from "../../utils/id";
import { extractTagsFromContent } from "../../utils/tags";

const BlogEditor = forwardRef(({ onSave }, ref) => {
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
                    createdAt: Date.now(),
                    content,
                    tags,
                };

                // Pass the saved data up to the parent.
                if (onSave) {
                    onSave(post);
                }
            } catch (err) {
                console.error("Failed to save blog content:", err);
            }
        },
    }));

    return (
        <div
            id="editorjs"
            className="prose md:prose-lg lg:prose-xl max-w-none pr-15"
        ></div>
    );
});

export default BlogEditor;
