import { useRenderLogger } from "../../hooks/useRenderLogger";
import { useToolbarStore } from "../../store/useToolbarStore";
import { toolRegistry } from "../../tools/toolRegistry";
import { ToolPropertyField } from "./ToolPropertyField";

export const ToolProperties = ({ activeTool }) => {
    const activeToolProperties = useToolbarStore(
        (s) => s.toolProperties[activeTool]
    );

    const updateToolProperties = useToolbarStore((s) => s.updateToolProperties);
    const tool = toolRegistry[activeTool];
    const toolProperties = {
        ...tool.defaultProperties,
        ...activeToolProperties,
    };

    const handlePropertyChange = (propertyName, property) => {
        updateToolProperties(activeTool, propertyName, property);
        const tool = useToolbarStore.getState().activeToolInstance;
        tool.updateProperties();
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
                    {Object.entries(toolProperties).map(([key, prop]) => (
                        <ToolPropertyField
                            key={key}
                            property={prop}
                            propertyName={key}
                            onChange={handlePropertyChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
