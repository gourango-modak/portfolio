import { blockRenderers } from "../editorBlocks";

const BlogPostRenderer = ({ content }) => {
    if (!content || !content.blocks) return null;

    return (
        <div className="editor-content">
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

export default BlogPostRenderer;
