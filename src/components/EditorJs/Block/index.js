import EditorJsCodeBlock from "./Code";
import EditorJsGalleryBlock from "./Gallery";
import EditorJsHeaderBlock from "./Header";
import EditorJsImageBlock from "./Image";
import EditorJsListBlock from "./List";
import EditorJsParagraphBlock from "./Paragraph";

export const BLOCK_RENDERERS = {
    header: EditorJsHeaderBlock,
    paragraph: EditorJsParagraphBlock,
    list: EditorJsListBlock,
    image: EditorJsImageBlock,
    code: EditorJsCodeBlock,
    gallery: EditorJsGalleryBlock,
};
