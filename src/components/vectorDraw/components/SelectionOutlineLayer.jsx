import { useRenderLogger } from "../hooks/useRenderLogger";
import { getShapeBoundingRect } from "../shapes/utils";
import {
    useSelectedShapeIds,
    useSelectedShapesBounds,
} from "../store/selectors/shapeSelectors";
import { shapeSlice } from "../store/utils";

export const SelectionOutlineLayer = () => {
    const selectedShapeIds = useSelectedShapeIds();
    const selectedShapesBounds = useSelectedShapesBounds();

    useRenderLogger("SelectionOutlineLayer");

    if (!selectedShapeIds?.size) return null;

    const { shapes } = shapeSlice.getSlice();

    const INDIVIDUAL_PADDING = 5;
    const GROUP_PADDING = 10;
    const HANDLE_SIZE = 6;

    // Draw rectangle (optionally with handles)
    const renderSelectionRect = (
        bounds,
        padding,
        { showHandles = true, dash = false } = {}
    ) => {
        const { x, y, width, height } = bounds;
        const corners = [
            { cx: x - padding, cy: y - padding },
            { cx: x + width + padding, cy: y - padding },
            { cx: x + width + padding, cy: y + height + padding },
            { cx: x - padding, cy: y + height + padding },
        ];

        return (
            <>
                {/* Outline */}
                <rect
                    x={x - padding}
                    y={y - padding}
                    width={width + padding * 2}
                    height={height + padding * 2}
                    fill="none"
                    stroke="#007AFF"
                    strokeWidth={1}
                    strokeDasharray={dash ? "4 2" : "none"}
                />

                {/* Resize handles */}
                {showHandles &&
                    corners.map((corner, index) => {
                        let cursor;
                        switch (index) {
                            case 0: // top-left
                            case 2: // bottom-right
                                cursor = "nwse-resize";
                                break;
                            case 1: // top-right
                            case 3: // bottom-left
                                cursor = "nesw-resize";
                                break;
                            default:
                                cursor = "default";
                        }
                        return (
                            <rect
                                key={index}
                                x={corner.cx - HANDLE_SIZE / 2}
                                y={corner.cy - HANDLE_SIZE / 2}
                                width={HANDLE_SIZE}
                                height={HANDLE_SIZE}
                                fill="white"
                                stroke="#007AFF"
                                strokeWidth={1}
                                cursor={cursor}
                            />
                        );
                    })}
            </>
        );
    };

    const multipleSelected = selectedShapeIds.size > 1;

    // Individual outlines (no handles when multiple selected)
    const renderIndividualRects = () =>
        Array.from(selectedShapeIds).map((id) => {
            const shape = shapes[id];
            if (!shape) return null;

            const bounds = getShapeBoundingRect(shape);
            return (
                <g key={id}>
                    {renderSelectionRect(bounds, INDIVIDUAL_PADDING, {
                        showHandles: !multipleSelected,
                    })}
                </g>
            );
        });

    // Group selection (single outline with handles)
    const renderGroupRect = () => {
        if (!multipleSelected || !selectedShapesBounds) return null;

        return renderSelectionRect(selectedShapesBounds, GROUP_PADDING, {
            dash: true,
            showHandles: true,
        });
    };

    return (
        <>
            {renderIndividualRects()}
            {renderGroupRect()}
        </>
    );
};
