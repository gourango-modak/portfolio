import { useToolbarStore } from "../store/useToolbarStore";
import { ToolButton } from "./ToolButton";
import { ToolGroup } from "./ToolGroup";
import { toolbarConfig } from "./toolbarConfig";
import { useRenderLogger } from "../debugging/useRenderLogger";

export const ToolbarItems = ({ orientation }) => {
    const setActiveTool = useToolbarStore((s) => s.setActiveTool);

    const handleToolBtnClick = (name) => {
        setActiveTool(name);
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
