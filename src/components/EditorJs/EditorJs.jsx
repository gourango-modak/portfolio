import { forwardRef, useImperativeHandle, useRef } from "react";
import "./EditorJs.css";
import { EDITOR_JS_TOOLS } from "./config";
import { useEditor } from "./hooks/useEditor";

const EditorJs = forwardRef(
    ({ onSave, onChange, initialData, tools = EDITOR_JS_TOOLS }, ref) => {
        const editorInstance = useEditor({
            holder: "editorjs-container",
            tools: tools,
            initialData: initialData || {},
            onChange: onChange,
        });

        useImperativeHandle(ref, () => ({
            async save(options) {
                if (!editorInstance.current) {
                    console.error("Editor instance is not available.");
                    return;
                }

                try {
                    const content = await editorInstance.current.save();
                    if (onSave) {
                        onSave({ content, options });
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
