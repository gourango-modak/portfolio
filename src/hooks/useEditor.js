import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

export const useEditor = ({ holder, tools, initialData }) => {
    const editorInstance = useRef(null);

    useEffect(() => {
        if (!holder) return;

        // If an instance already exists, destroy it before re-initializing
        if (
            editorInstance.current &&
            typeof editorInstance.current.destroy === "function"
        ) {
            editorInstance.current.destroy();
            editorInstance.current = null;
        }

        const editor = new EditorJS({
            holder: holder,
            autofocus: true,
            placeholder: "Write your content here...",
            tools: tools,
            data: initialData,
        });

        editorInstance.current = editor;

        return () => {
            if (
                editorInstance.current &&
                typeof editorInstance.current.destroy === "function"
            ) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, [holder, tools, initialData]); // Re-run when initialData changes

    return editorInstance;
};
