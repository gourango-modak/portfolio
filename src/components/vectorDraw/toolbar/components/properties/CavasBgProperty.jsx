import { useRenderLogger } from "../../../hooks/useRenderLogger";
import { canvasPropertiesSlice } from "../../../store/utils";
import { ColorProperty } from "./ColorProperty";

export const CanvasBgProperty = () => {
    const {
        properties: { canvasBgColor },
        setCanvasBg,
    } = canvasPropertiesSlice.getSlice();

    const handleChange = (_, { value }) => {
        setCanvasBg(value);
    };

    useRenderLogger("CanvasBgProperty");

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[12px] text-gray-500 font-medium uppercase tracking-wide">
                {canvasBgColor.label}
            </label>
            <ColorProperty
                property={canvasBgColor}
                onChange={handleChange}
                id={canvasBgColor.id}
            />
        </div>
    );
};
