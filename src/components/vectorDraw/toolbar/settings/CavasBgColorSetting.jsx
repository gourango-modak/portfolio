import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useCanvasStore } from "../../store/useCanvasStore";
import { ColorSetting } from "./ColorSetting";

export const CanvasBgColorSetting = () => {
    const canvasBgColor = useCanvasStore((s) => s.bgColor);
    const setCanvasBgColor = useCanvasStore((s) => s.setCanvasBgColor);

    const handleBgColorChange = (_, bgColor) => {
        setCanvasBgColor(bgColor);
    };

    useRenderLogger("CanvasBgColorSetting");

    return (
        <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">
                Canvas Background
            </label>
            <ColorSetting
                property="bgColor"
                value={canvasBgColor}
                onChange={handleBgColorChange}
            />
        </div>
    );
};
