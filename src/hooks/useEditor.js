import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

export const useEditor = ({ holder, tools }) => {
	const editorInstance = useRef(null);

	useEffect(() => {
		// Initialize Editor.js only if it hasn't been initialized yet.
		if (!editorInstance.current) {
			const editor = new EditorJS({
				holder: holder,
				autofocus: true,
				placeholder: "Write your blog content here...",
				tools: tools,
			});
			editorInstance.current = editor;
		}

		// Cleanup function to destroy the editor instance when the component unmounts.
		return () => {
			if (
				editorInstance.current &&
				typeof editorInstance.current.destroy === "function"
			) {
				editorInstance.current.destroy();
				editorInstance.current = null;
			}
		};
	}, [holder, tools]);

	return editorInstance;
};
