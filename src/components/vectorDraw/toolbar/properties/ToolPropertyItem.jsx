import { ToolPropertyField } from "./ToolPropertyField";
import { toolRegistry } from "../../tools/toolRegistry";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { toolbarSlice } from "../../store/storeUtils";

export const ToolPropertyItem = ({ propertyName }) => {
    const { activeTool, toolProperties, updateToolProperties } =
        toolbarSlice.getSlice();
    const property =
        toolProperties[activeTool]?.[propertyName] ??
        toolRegistry[activeTool]?.defaultProperties?.[propertyName];

    const handlePropertyChange = (propertyName, property) => {
        updateToolProperties(activeTool, propertyName, property);

        const toolInstance = toolbarSlice.getSlice().activeToolInstance;
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
