import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Paragraph from "@editorjs/paragraph";
import Table from "@editorjs/table";
import Code from "./tools/code";
import Title from "./tools/title";
import TagList from "./tools/tagList";
import TagLine from "./tools/tagline";
import InlineCode from "./tools/inlineCode";
import Gallery from "./tools/gallery";
import { CONTENT_TYPES } from "../../config";
import EditorJsHeaderBlock from "./blocks/EditorJsHeaderBlock";
import EditorJsParagraphBlock from "./blocks/EditorJsParagraphBlock";
import EditorJsCodeBlock from "./blocks/EditorJsCodeBlock";
import EditorJsGalleryBlock from "./blocks/EditorJsGalleryBlock";
import EditorJsListBlock from "./blocks/EditorJsListBlock";
import EditorJsImageBlock from "./blocks/EditorJsImageBlock";

export const EDITOR_JS_TOOLS = {
    header: {
        class: Header,
        inlineToolbar: true,
        config: {
            defaultLevel: 1,
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
        config: {
            preserveBlank: true, // This option ensures empty paragraph blocks are saved.
        },
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
            tools.header = {
                class: Header,
                inlineToolbar: true,
                config: {
                    levels: [2, 3], // only show h1, h2, h3
                    defaultLevel: 2,
                },
            };
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

export const NON_RENDER_EDITORJS_BLOCKS = [
    CUSTOM_TOOLS.TITLE.TYPE,
    CUSTOM_TOOLS.TAGLINE.TYPE,
    CUSTOM_TOOLS.TAGLIST.TYPE,
];

export const EDITORJS_BLOCKS = {
    header: EditorJsHeaderBlock,
    paragraph: EditorJsParagraphBlock,
    list: EditorJsListBlock,
    image: EditorJsImageBlock,
    code: EditorJsCodeBlock,
    gallery: EditorJsGalleryBlock,
};
