import { forwardRef, useImperativeHandle, useRef } from "react";
import "./EditorJs.css";
import { EDITOR_JS_TOOLS } from "../../config/editorJs/editorTools";
import { useEditor } from "../../hooks/useEditor";

const EditorJs = forwardRef(
    ({ onSave, initialData, tools = EDITOR_JS_TOOLS }, ref) => {
        const holderRef = useRef(null);
        const editorInstance = useEditor({
            holder: holderRef.current,
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

        return <div ref={holderRef} className="editorjs pr-15"></div>;
    }
);

export default EditorJs;
