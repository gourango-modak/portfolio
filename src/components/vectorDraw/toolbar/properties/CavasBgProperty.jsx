import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useCanvasStore } from "../../store/useCanvasStore";
import { ColorProperty } from "./ColorProperty";

export const CanvasBgProperty = () => {
    const canvasBgColor = useCanvasStore((s) => s.bgColor);
    const setCanvasBg = useCanvasStore((s) => s.setCanvasBg);

    const handleChange = (_, bgColor) => {
        setCanvasBg(bgColor);
    };

    useRenderLogger("CanvasBgProperty");

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
                Canvas Background
            </label>
            <ColorProperty id="canvasBgColor" value={canvasBgColor} />
        </div>
    );
};
