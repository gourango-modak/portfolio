import { useRenderLogger } from "../../hooks/useRenderLogger";
import { SHAPES } from "../../shapes/constants";
import { computeShapeBoundingBox } from "../../shapes/utils";
import { SELECTION_RECT_PADDING } from "./constants";
import { HandleCircle } from "./HandleCircle";
import { SelectionRect } from "./SelectionRect";
import { getLineSegmentHandles } from "./utils";

export const ShapeOutline = ({ shape, multipleSelected }) => {
    const { type } = shape;

    useRenderLogger("ShapeOutline");

    if (type === SHAPES.ARROW && !multipleSelected) {
        const handles = getLineSegmentHandles(shape);
        return (
            <>
                {Object.entries(handles).map(([key, h]) => (
                    <HandleCircle
                        key={key}
                        x={h.x}
                        y={h.y}
                        cursor={h.cursor}
                        handleId={key}
                    />
                ))}
            </>
        );
    }

    const bounds = computeShapeBoundingBox(shape);
    return (
        <SelectionRect
            bounds={bounds}
            padding={SELECTION_RECT_PADDING}
            showHandles={!multipleSelected}
            dashed={false}
        />
    );
};
