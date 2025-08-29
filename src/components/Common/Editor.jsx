import { forwardRef, useImperativeHandle } from "react";
import { useEditor } from "../../hooks/useEditor";
import { EDITOR_JS_TOOLS } from "../../config/editorjs/editorTools";
import "./Editor.css";

const Editor = forwardRef(({ onSave, initialData }, ref) => {
    const editorInstance = useEditor({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        initialData: initialData,
    });

    useImperativeHandle(ref, () => ({
        async save() {
            if (!editorInstance.current) {
                console.error("Editor instance is not available.");
                return;
            }

            try {
                const content = await editorInstance.current.save();
                if (onSave) {
                    onSave(content);
                }
            } catch (err) {
                console.error("Failed to save blog content:", err);
            }
        },
    }));

    return (
        <div id="editorjs" className="prose md:prose-lg max-w-none pr-15"></div>
    );
});

export default Editor;
