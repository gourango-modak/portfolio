import { forwardRef, useImperativeHandle, useRef } from "react";
import "./EditorJs.css";
import { EDITOR_JS_TOOLS } from "./editorJsConfig";
import { useEditor } from "./hooks/useEditor";

const EditorJs = forwardRef(
    ({ onSave, initialData, tools = EDITOR_JS_TOOLS }, ref) => {
        const editorInstance = useEditor({
            holder: "editorjs-container",
            tools: tools,
            initialData: initialData || {},
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

        return <div id="editorjs-container" className="editorjs"></div>;
    }
);

export default EditorJs;
