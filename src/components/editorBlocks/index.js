import HeaderBlock from "./HeaderBlock";
import ParagraphBlock from "./ParagraphBlock";
import ListBlock from "./ListBlock";
import ImageBlock from "./ImageBlock";
import DelimiterBlock from "./DelimiterBlock";
import CodeBlock from "./CodeBlock";

export const blockRenderers = {
    header: HeaderBlock,
    paragraph: ParagraphBlock,
    list: ListBlock,
    // image: ImageBlock,
    // delimiter: DelimiterBlock,
    // code: CodeBlock,
};
