import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useToolbarStore } from "../../store/useToolbarStore";
import { getToolProperties } from "../../svgCanvasUtils";
import { toolRegistry } from "../../tools/toolRegistry";
import { ToolPropertyField } from "./ToolPropertyField";

export const ToolProperties = ({ activeTool }) => {
    const userActiveToolProperties = useToolbarStore(
        (s) => s.userToolProperties[activeTool]
    );
    const tool = toolRegistry[activeTool];
    const toolProperties = getToolProperties(
        userActiveToolProperties,
        activeTool
    );

    const handlePropertyChange = (property) => {
        console.log(property);
    };

    useRenderLogger("ToolProperties");

    return (
        <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-auto">
            {!activeTool && (
                <div className="text-gray-500 text-sm text-center py-8">
                    No tool selected
                </div>
            )}

            {tool && !toolProperties && (
                <div className="text-gray-500 text-sm text-center py-8">
                    <span className="font-medium">{tool.label}</span> has no
                    configurable settings.
                </div>
            )}

            {toolProperties && (
                <div className="flex flex-col gap-4">
                    {Object.entries(toolProperties).map(
                        ([propertyName, property]) => (
                            <ToolPropertyField
                                key={property.label}
                                propertyName={propertyName}
                                property={property}
                                onChange={handlePropertyChange}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
};
