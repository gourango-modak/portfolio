import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";
import Delimiter from "@editorjs/delimiter";
import CodeTool from "@editorjs/code";

// This configuration object defines all the tools and their settings for Editor.js.
export const EDITOR_JS_TOOLS = {
    header: Header,
    list: List,
    image: {
        class: ImageTool,
        config: {
            uploader: {
                // This mock uploader returns the path to a local asset.
                // Replace this with your actual image upload logic.
                async uploadByFile(file) {
                    return {
                        success: 1,
                        file: {
                            url: `/src/assets/${file.name}`,
                        },
                    };
                },
                // Allows uploading images via a URL.
                async uploadByUrl(url) {
                    return {
                        success: 1,
                        file: { url },
                    };
                },
            },
        },
    },
    inlineCode: InlineCode,
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        config: {
            preserveBlank: true,
        },
    },
    delimiter: Delimiter,
    code: CodeTool,
};
