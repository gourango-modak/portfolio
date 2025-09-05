import {
    EDITORJS_BLOCKS,
    NON_RENDER_EDITORJS_BLOCKS,
} from "../../config/config";

const EditorJsContentRenderer = ({ content }) => {
    if (!content || !content.blocks) return null;

    return (
        <div className="editorjs-content">
            {content.blocks
                .filter(
                    (block) => !NON_RENDER_EDITORJS_BLOCKS.includes(block.type)
                )
                .map((block, index) => {
                    const BlockComponent = EDITORJS_BLOCKS[block.type];
                    if (!BlockComponent) {
                        return (
                            <p key={index} className="text-red-500">
                                Unsupported block: {block.type}
                            </p>
                        );
                    }
                    if (block.type === "header") {
                        const id = block.data.text
                            .replace(/\s+/g, "-")
                            .toLowerCase();
                        return (
                            <BlockComponent
                                key={index}
                                id={id}
                                isFirstBlock={index == 0}
                                {...block.data}
                            />
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
