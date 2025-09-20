import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useCanvasStore } from "../../store/useCanvasStore";
import { ColorSetting } from "./ColorSetting";

export const FrameBgColorSetting = () => {
    const activeFrameId = useCanvasStore((s) => s.activeFrameId);
    const setFrameBgColor = useCanvasStore((s) => s.setFrameBgColor);
    const activeFrame = useCanvasStore((s) => s.frames[activeFrameId]);

    const handleBgColorChange = (_, bgColor) => {
        setFrameBgColor(activeFrameId, bgColor);
    };

    useRenderLogger("FrameBgColorSetting");

    return (
        activeFrameId && (
            <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                    Frame Background
                </label>
                <ColorSetting
                    property="frameBgColor"
                    value={activeFrame.bgColor}
                    onChange={handleBgColorChange}
                />
            </div>
        )
    );
};
