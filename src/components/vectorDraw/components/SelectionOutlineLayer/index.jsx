import { useRenderLogger } from "../../hooks/useRenderLogger";
import {
    useSelectedShapeIds,
    useSelectedShapesBounds,
} from "../../store/selectors/shapeSelectors";
import {
    useSelectedFrameIds,
    useSelectedFramesBounds,
} from "../../store/selectors/frameSelectors";
import { shapeSlice, frameSlice } from "../../store/utils";
import { GROUP_SELECTION_RECT_PADDING } from "./constants";
import { SelectionRect } from "./SelectionRect";
import { ShapeOutline } from "./ShapeOutline";
import { FrameOutline } from "./FrameOutline";
import { combineBoundingBoxes } from "../../boundingBox/combineBoundingBoxes";
import { isPagedCanvasMode } from "./../../utils/canvasUtils";

export const SelectionOutlineLayer = () => {
    // Shapes
    const selectedShapeIds = useSelectedShapeIds();
    const selectedShapesBounds = useSelectedShapesBounds();
    const { shapes } = shapeSlice.getSlice();

    // Frames
    const selectedFrameIds = useSelectedFrameIds();
    const selectedFramesBounds = useSelectedFramesBounds();
    const { frames } = frameSlice.getSlice();

    useRenderLogger("SelectionOutlineLayer");

    // Render individual outlines
    const renderShapeOutlines = (multipleSelected) =>
        Array.from(selectedShapeIds).map((id) => {
            const shape = shapes[id];
            if (!shape) return null;
            return (
                <g key={id}>
                    <ShapeOutline
                        shape={shape}
                        multipleSelected={multipleSelected}
                    />
                </g>
            );
        });

    const renderFrameOutlines = (multipleSelected) =>
        Array.from(selectedFrameIds).map((id) => {
            const frame = frames[id];
            if (!frame) return null;
            return (
                <g key={id}>
                    <FrameOutline
                        frame={frame}
                        multipleSelected={multipleSelected}
                    />
                </g>
            );
        });

    let boundsArray = [selectedShapesBounds];

    // Don't include frame bounds in paged canvas mode
    // as we don't want the selection rect for frames
    if (!isPagedCanvasMode()) {
        boundsArray.push(selectedFramesBounds);
    }

    const totalSelectedCount = selectedShapeIds.size + selectedFrameIds.size;
    const multipleSelected = totalSelectedCount > 1;
    const combinedBounds = multipleSelected
        ? combineBoundingBoxes(boundsArray)
        : null;

    return (
        <>
            {renderShapeOutlines(multipleSelected)}
            {!isPagedCanvasMode() && renderFrameOutlines(multipleSelected)}

            {/* Render single group selection rectangle */}
            {combinedBounds && (
                <SelectionRect
                    bounds={combinedBounds}
                    padding={GROUP_SELECTION_RECT_PADDING}
                    dashed
                    showHandles
                />
            )}
        </>
    );
};
