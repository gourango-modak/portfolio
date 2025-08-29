import HeaderBlock from "./HeaderBlock";
import ParagraphBlock from "./ParagraphBlock";
import ListBlock from "./ListBlock";
import ImageBlock from "./ImageBlock";
import CodeBlock from "./CodeBlock";

export const blockRenderers = {
    header: HeaderBlock,
    paragraph: ParagraphBlock,
    list: ListBlock,
    image: ImageBlock,
    code: CodeBlock,
};
