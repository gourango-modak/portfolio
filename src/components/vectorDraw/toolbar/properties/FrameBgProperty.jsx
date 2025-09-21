import { useRenderLogger } from "../../debugging/useRenderLogger";
import { useCanvasStore } from "../../store/useCanvasStore";
import { ColorProperty } from "./ColorProperty";

export const FrameBgProperty = () => {
    const activeFrameId = useCanvasStore((s) => s.activeFrameId);
    const setFrameBg = useCanvasStore((s) => s.setFrameBg);
    const activeFrame = useCanvasStore((s) => s.frames[activeFrameId]);

    const handleChange = ({ value }) => {
        setFrameBg(activeFrameId, value);
    };

    useRenderLogger("FrameBgProperty");

    return (
        activeFrameId && (
            <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                    Frame Background
                </label>
                <ColorProperty
                    propertyName="frameBgColor"
                    value={activeFrame.bgColor}
                    onChange={handleChange}
                />
            </div>
        )
    );
};
