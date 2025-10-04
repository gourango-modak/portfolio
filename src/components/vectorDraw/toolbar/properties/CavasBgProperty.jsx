import { useRenderLogger } from "../../hooks/useRenderLogger";
import { useCanvasStore } from "../../store/useCanvasStore";
import { ColorProperty } from "./ColorProperty";

export const CanvasBgProperty = () => {
    const canvasBgColor = useCanvasStore((s) => s.properties.canvasBgColor);
    const setCanvasBg = useCanvasStore((s) => s.setCanvasBg);

    const handleChange = (_, { value }) => {
        setCanvasBg(value);
    };

    useRenderLogger("CanvasBgProperty");

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
                {canvasBgColor.label}
            </label>
            <ColorProperty property={canvasBgColor} onChange={handleChange} />
        </div>
    );
};
