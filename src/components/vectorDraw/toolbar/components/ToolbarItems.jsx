import { ToolButton } from "./ToolButton";
import { ToolGroup } from "./ToolGroup";
import { toolbarConfig } from "../config";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { toolActionHandlers } from "./../actions/index";

export const ToolbarItems = ({ orientation }) => {
    const handleToolBtnClick = (tool) => {
        if (tool.action) {
            toolActionHandlers[tool.action](tool);
        }
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
