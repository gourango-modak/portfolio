import { ToolPropertyField } from "./ToolPropertyField";
import { toolRegistry } from "../../../tools/registry";
import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { toolbarSlice } from "../../../store/utils";
import { updateCanvasObjectProperties } from "./../../../utils/canvasUtils";

export const ToolPropertyItem = ({
    propertyName,
    property,
    canvasObjectId,
}) => {
    const { activeTool, toolProperties, updateToolProperties } =
        toolbarSlice.getSlice();
    const prop = canvasObjectId
        ? property
        : toolProperties[activeTool]?.[propertyName] ??
          toolRegistry[activeTool]?.defaultProperties?.[propertyName];

    const handlePropertyChange = (propertyName, property) => {
        if (canvasObjectId) {
            updateCanvasObjectProperties(canvasObjectId, {
                [propertyName]: property,
            });
        } else {
            updateToolProperties(activeTool, propertyName, property);

            const toolInstance = toolbarSlice.getSlice().activeToolInstance;
            toolInstance?.updateProperties?.();
        }
    };

    useRenderLogger("ToolPropertyItem");

    return (
        <ToolPropertyField
            propertyName={propertyName}
            property={prop}
            onChange={handlePropertyChange}
        />
    );
};
