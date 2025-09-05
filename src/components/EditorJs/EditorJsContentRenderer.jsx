import { shouldRenderBlock } from "./editorJsUtils";
import RenderBlock from "./RenderBlock";

const EditorJsContentRenderer = ({ content }) => {
    if (!content?.blocks) return null;

    return (
        <div className="editorjs-content">
            {content.blocks.filter(shouldRenderBlock).map((block, index) => (
                <RenderBlock key={index} block={block} index={index} />
            ))}
        </div>
    );
};

export default EditorJsContentRenderer;
