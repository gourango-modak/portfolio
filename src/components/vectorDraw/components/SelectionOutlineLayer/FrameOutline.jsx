import { useRenderLogger } from "../../hooks/useRenderLogger";
import { SELECTION_RECT_PADDING } from "./constants";
import { SelectionRect } from "./SelectionRect";

export const FrameOutline = ({ frame, multipleSelected }) => {
    useRenderLogger("FrameOutline");

    // Frames are simple bounding boxes
    const bounds = {
        x: frame.x,
        y: frame.y,
        width: frame.width,
        height: frame.height,
    };

    return (
        <SelectionRect
            bounds={bounds}
            padding={SELECTION_RECT_PADDING}
            showHandles={!multipleSelected}
            dashed={false}
        />
    );
};
