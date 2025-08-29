import { blockRenderers } from "../../editorBlocks";

const EditorContentRenderer = ({ content }) => {
    if (!content || !content.blocks) return null;

    return (
        <div>
            {content.blocks.map((block, index) => {
                const BlockComponent = blockRenderers[block.type];
                if (!BlockComponent) {
                    return (
                        <p key={index} className="text-red-500">
                            Unsupported block: {block.type}
                        </p>
                    );
                }
                return <BlockComponent key={index} {...block.data} />;
            })}
        </div>
    );
};

export default EditorContentRenderer;
