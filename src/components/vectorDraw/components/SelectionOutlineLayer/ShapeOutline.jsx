import { computeShapeBoundingBox } from "../../boundingBox/shapeBoundingBox";
import { useRenderLogger } from "../../hooks/useRenderLogger";
import { SHAPES } from "../../shapes/constants";
import {
    useCanvasPan,
    useCanvasScale,
} from "../../store/selectors/canvasPropertiesSelectors";
import { SELECTION_RECT_PADDING } from "./constants";
import { HandleCircle } from "./HandleCircle";
import { SelectionRect } from "./SelectionRect";
import { getLineSegmentHandles } from "./utils";

export const ShapeOutline = ({ shape, multipleSelected }) => {
    const scale = useCanvasScale();
    const pan = useCanvasPan();
    const { type } = shape;

    useRenderLogger("ShapeOutline");

    if (shape.locked) return;

    if (type === SHAPES.ARROW && !multipleSelected) {
        const handles = getLineSegmentHandles(shape, scale, pan);
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
