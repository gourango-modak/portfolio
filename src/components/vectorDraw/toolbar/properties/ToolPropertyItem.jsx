import { ToolPropertyField } from "./ToolPropertyField";
import { useToolbarStore } from "./../../store/useToolbarStore";
import { toolRegistry } from "../../tools/toolRegistry";
import { useRenderLogger } from "../../hooks/useRenderLogger";

export const ToolPropertyItem = ({ propertyName }) => {
    const activeTool = useToolbarStore.getState().activeTool;
    const property =
        useToolbarStore.getState().toolProperties[activeTool]?.[propertyName] ??
        toolRegistry[activeTool]?.defaultProperties?.[propertyName];

    const updateToolProperties = useToolbarStore((s) => s.updateToolProperties);

    const handlePropertyChange = (propertyName, property) => {
        updateToolProperties(activeTool, propertyName, property);
        const toolInstance = useToolbarStore.getState().activeToolInstance;
        toolInstance?.updateProperties?.();
    };

    useRenderLogger("ToolPropertyItem");

    return (
        <ToolPropertyField
            propertyName={propertyName}
            property={property}
            onChange={handlePropertyChange}
        />
    );
};
