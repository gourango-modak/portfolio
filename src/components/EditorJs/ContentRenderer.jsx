import { BLOCK_RENDERERS } from "./Block";

const EditorJsContentRenderer = ({ content }) => {
    if (!content || !content.blocks) return null;

    return (
        <div>
            {content.blocks.map((block, index) => {
                const BlockComponent = BLOCK_RENDERERS[block.type];
                if (!BlockComponent) {
                    return (
                        <p key={index} className="text-red-500">
                            Unsupported block: {block.type}
                        </p>
                    );
                }
                return (
                    <BlockComponent
                        key={index}
                        isFirstBlock={index == 0}
                        {...block.data}
                    />
                );
            })}
        </div>
    );
};

export default EditorJsContentRenderer;
