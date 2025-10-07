import { getShapeBoundingRect } from "../canvasUtils";
import { useRenderLogger } from "../hooks/useRenderLogger";
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

    const INDIVIDUAL_PADDING = 4;
    const GROUP_PADDING = 10;

    const renderSelectionRect = (bounds, padding, styleOverrides = {}) => {
        const { x, y, width, height } = bounds;
        return (
            <rect
                x={x - padding}
                y={y - padding}
                width={width + 2 * padding}
                height={height + 2 * padding}
                fill="none"
                stroke="#007AFF"
                strokeWidth={1}
                {...styleOverrides}
            />
        );
    };

    const renderIndividualRects = () =>
        Array.from(selectedShapeIds).map((id) => {
            const shape = shapes[id];
            if (!shape) return null;

            const bounds = getShapeBoundingRect(shape);
            return (
                <g key={id}>
                    {renderSelectionRect(bounds, INDIVIDUAL_PADDING)}
                </g>
            );
        });

    const renderGroupRect = () => {
        if (selectedShapeIds.size <= 1 || !selectedShapesBounds) return null;

        return renderSelectionRect(selectedShapesBounds, GROUP_PADDING, {
            strokeDasharray: "4 2",
        });
    };

    return (
        <>
            {renderIndividualRects()}
            {renderGroupRect()}
        </>
    );
};
