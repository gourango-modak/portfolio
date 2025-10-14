import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { toolRegistry } from "../../../tools/registry";
import { getCanvasObjectProperties } from "../../../utils/canvasUtils";
import { ToolPropertyItem } from "./ToolPropertyItem";

export const ToolProperties = ({ activeTool, canvasObjectId }) => {
    const tool = toolRegistry[activeTool];

    useRenderLogger("ToolProperties");

    if (!activeTool) {
        return (
            <div className="text-gray-500 text-sm text-center py-8">
                No tool selected
            </div>
        );
    }

    if (!tool) {
        return (
            <div className="text-gray-500 text-sm text-center py-8">
                Invalid tool.
            </div>
        );
    }

    const props =
        getCanvasObjectProperties(canvasObjectId) || tool.defaultProperties;
    const hasProperties = props && Object.keys(props).length > 0;

    return (
        <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-auto">
            {!hasProperties ? (
                <div className="text-gray-500 text-sm text-center py-8">
                    <span className="font-medium">{tool.label}</span> has no
                    configurable settings.
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {Object.entries(props).map(([key, value]) => (
                        <ToolPropertyItem
                            key={key}
                            propertyName={key}
                            property={{ ...value, id: "tool_color" }}
                            canvasObjectId={canvasObjectId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
