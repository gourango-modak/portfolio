import { useRenderLogger } from "../../hooks/useRenderLogger";
import { CanvasBgProperty } from "./CavasBgProperty";
import { FrameBgProperty } from "./FrameBgProperty";
import { canvasPropertiesSlice } from "../../store/utils";
import { useCanvasModeProperty } from "../../store/selectors/canvasPropertiesSelectors";
import { CANVAS_MODE_ICONS, CANVAS_MODES } from "../../constants";

export const CanvasProperties = () => {
    const canvasModeProperty = useCanvasModeProperty();
    const { setCanvasMode } = canvasPropertiesSlice.getSlice();

    const handleChange = (mode) => {
        setCanvasMode(mode);
    };

    useRenderLogger("CanvasProperties");

    return (
        <div className="flex flex-col gap-4 p-4 text-sm text-gray-800">
            {/* Canvas Mode */}
            <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">
                    {canvasModeProperty.label}
                </label>
                <div className="flex gap-2">
                    {Object.entries(CANVAS_MODE_ICONS).map(([mode, Icon]) => (
                        <button
                            key={mode}
                            className={`p-2 rounded border cursor-pointer ${
                                canvasModeProperty.value === mode
                                    ? "border-indigo-500 bg-indigo-50"
                                    : "border-gray-300"
                            }`}
                            onClick={() => handleChange(mode)}
                        >
                            <Icon className="w-5 h-5" />
                        </button>
                    ))}
                </div>
            </div>

            <CanvasBgProperty />

            {/* Frame Background */}
            {canvasModeProperty.value !== CANVAS_MODES.INFINITE && (
                <FrameBgProperty />
            )}
        </div>
    );
};
