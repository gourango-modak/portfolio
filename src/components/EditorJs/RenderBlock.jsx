import { EDITORJS_BLOCKS } from "./editorJsConfig";
import { generateHeaderBlockId } from "./editorJsUtils";

const RenderBlock = ({ block, index }) => {
    const BlockComponent = EDITORJS_BLOCKS[block.type];

    if (!BlockComponent) {
        return (
            <p key={index} className="text-red-500">
                Unsupported block: {block.type}
            </p>
        );
    }

    const commonProps = {
        isFirstBlock: index === 0,
        ...block.data,
    };

    if (block.type === "header") {
        return (
            <BlockComponent
                key={index}
                {...commonProps}
                id={generateHeaderBlockId(block.data.text)}
            />
        );
    }

    return <BlockComponent key={index} {...commonProps} />;
};

export default RenderBlock;
