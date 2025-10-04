import { TOOL_PROPERTIES_COMPONENTS } from "./propertiesUtils";

export const ToolPropertyField = ({ propertyName, property, onChange }) => {
    const Component = TOOL_PROPERTIES_COMPONENTS[propertyName];
    if (!Component) return null;

    const commonProps = {
        propertyName,
        value: property.value,
        onChange,
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-gray-600 text-sm font-medium">
                {property.label}
            </label>
            <Component {...commonProps} />
        </div>
    );
};
