import { generateId } from "../../../../../utils/common";
import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { TOOL_PROPERTIES_COMPONENTS } from "./constants";

export const ToolPropertyField = ({ propertyName, property, onChange }) => {
    const Component = TOOL_PROPERTIES_COMPONENTS[propertyName];
    if (!Component) return null;

    const commonProps = {
        propertyName,
        property: { ...property },
        onChange,
        id: `${propertyName}_${generateId()}`,
    };

    useRenderLogger("ToolPropertyField");

    return (
        <div className="flex flex-col gap-1">
            <label className="text-[12px] text-gray-500 font-medium uppercase tracking-wide">
                {property.label}
            </label>
            <Component {...commonProps} />
        </div>
    );
};
