import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Code from "./tools/code";
import Title from "./tools/title";
import TagList from "./tools/tagList";
import { CONTENT_TYPES } from "../config";
import TagLine from "./tools/project/tagline";
import Gallery from "./tools/project/gallery";
import InlineCode from "./tools/inlineCode";

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: true,
        config: {
            levels: [1, 2, 3], // only show h1, h2, h3
            defaultLevel: 2,
        },
    },
    list: {
        class: List,
        inlineToolbar: true,
    },
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
    },
    table: Table,
    code: Code,
    title: Title,
    tags: TagList,
    inlineCode: InlineCode,
};

export const CUSTOM_TOOLS = {
    CODE: {
        TYPE: "code",
    },
    TITLE: {
        TYPE: "title",
    },
    TAGLIST: {
        TYPE: "tags",
    },
    TAGLINE: {
        TYPE: "tagline",
    },
    GALLERY: {
        TYPE: "gallery",
    },
    INLINE_CODE: {
        TYPE: "inlineCode",
    },
};

export const getEditorJsTools = (contentType) => {
    const tools = EDITOR_JS_TOOLS;
    switch (contentType) {
        case CONTENT_TYPES.BLOG:
            return tools;
        case CONTENT_TYPES.PROJECT:
            tools.tagline = TagLine;
            tools.gallery = Gallery;
            return tools;
        default:
            return tools;
    }
};

export const EDITOR_JS_INITIALDATA = {
    blocks: [
        {
            type: CUSTOM_TOOLS.TITLE.TYPE,
            data: {
                text: "",
            },
        },
    ],
};

export function getEditorJsInitialData(contentType) {
    switch (contentType) {
        case CONTENT_TYPES.BLOG:
            return {
                ...EDITOR_JS_INITIALDATA,
                blocks: [...EDITOR_JS_INITIALDATA.blocks],
            };
        case CONTENT_TYPES.PROJECT:
            return {
                ...EDITOR_JS_INITIALDATA,
                blocks: [
                    ...EDITOR_JS_INITIALDATA.blocks,
                    {
                        type: CUSTOM_TOOLS.TAGLINE.TYPE,
                        data: { text: "" },
                    },
                ],
            };
        default:
            return EDITOR_JS_INITIALDATA;
    }
}
