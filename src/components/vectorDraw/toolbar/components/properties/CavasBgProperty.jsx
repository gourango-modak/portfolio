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
            <label>{canvasBgColor.label}</label>
            <ColorProperty
                property={canvasBgColor}
                onChange={handleChange}
                id={canvasBgColor.id}
            />
        </div>
    );
};
