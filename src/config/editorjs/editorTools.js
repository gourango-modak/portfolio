import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import CodeTool from "./code";
import TitleTool from "./title";
import TagListTool from "./tagList";
import TaglineTool from "./project/tagline";

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
    paragraph: {
        class: Paragraph,
        inlineToolbar: true,
        // config: {
        //     preserveBlank: true,
        // },
    },
    code: CodeTool,
    title: TitleTool,
};

export const EDITOR_JS_INITIALDATA = {
    blocks: [
        {
            type: "title",
            data: {
                text: "",
            },
        },
    ],
};

export const getEditorTools = ({
    includeTags = false,
    includeTagline = false,
}) => {
    const tools = EDITOR_JS_TOOLS;

    if (includeTags) {
        tools.tag = TagListTool;
    }

    if (includeTagline) {
        tools.tagline = TaglineTool;
    }

    return tools;
};

export function getProjectTools() {
    return getEditorTools({ includeTagline: true, includeTags: true });
}

// Blog-specific initial data
export function getBlogEditorInitialData() {
    return {
        ...EDITOR_JS_INITIALDATA,
        blocks: [...EDITOR_JS_INITIALDATA.blocks],
    };
}

// Project-specific initial data
export function getProjectEditorInitialData() {
    return {
        ...EDITOR_JS_INITIALDATA,
        blocks: [
            ...EDITOR_JS_INITIALDATA.blocks,
            {
                type: "tagline",
                data: { text: "" },
            },
        ],
    };
}
