import { ToolButton } from "./ToolButton";
import { ToolGroup } from "./ToolGroup";
import { toolbarConfig } from "./toolbarConfig";
import { useRenderLogger } from "../debugging/useRenderLogger";
import { toolActionHandlers } from "./toolActionHandlers";

export const ToolbarItems = ({ orientation }) => {
    const handleToolBtnClick = (tool) => {
        toolActionHandlers[tool.action](tool);
    };

    useRenderLogger("ToolbarItems");

    return (
        <>
            {toolbarConfig.map((item) =>
                item.tools ? (
                    <ToolGroup
                        key={item.group}
                        item={item}
                        orientation={orientation}
                        onToolBtnClick={handleToolBtnClick}
                    />
                ) : (
                    <ToolButton
                        key={item.name}
                        item={item}
                        onClick={handleToolBtnClick}
                    />
                )
            )}
        </>
    );
};
