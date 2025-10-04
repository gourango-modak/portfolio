import { useCanvasStore } from "../../store/useCanvasStore";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { ToolPropertyField } from "./ToolPropertyField";

export const PageProperties = () => {
    const frameTemplate = useCanvasStore((s) => s.frameTemplate);
    const updateFrameTemplate = useCanvasStore((s) => s.updateFrameTemplate);

    const handlePropertyChange = (propertyName, { value }) => {
        updateFrameTemplate({ [propertyName]: value });
    };

    useRenderLogger("PageSettingsPanel");

    return (
        <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-auto">
            <div className="flex flex-col gap-4">
                {Object.entries(frameTemplate).map(([key, prop]) => (
                    <ToolPropertyField
                        key={key}
                        property={prop}
                        propertyName={key}
                        onChange={handlePropertyChange}
                    />
                ))}
            </div>
        </div>
    );
};
