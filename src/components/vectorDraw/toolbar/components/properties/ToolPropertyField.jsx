import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { TOOL_PROPERTIES_COMPONENTS } from "./constants";

export const ToolPropertyField = ({ propertyName, property, onChange }) => {
    if (!property?.type) return null;

    const Component = TOOL_PROPERTIES_COMPONENTS[property.type];
    if (!Component) return null;

    const commonProps = {
        propertyName,
        property,
        onChange,
    };

    useRenderLogger("ToolPropertyField");

    return (
        <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium">
                {property.label}
            </label>
            <Component {...commonProps} />
        </div>
    );
};
