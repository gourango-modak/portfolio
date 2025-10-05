import { getShapeBoundingRect } from "../canvasUtils";
import { useShapeStore } from "../store/useShapeStore";
import { useRenderLogger } from "../hooks/useRenderLogger";

export const SelectionOutlineLayer = () => {
    const selectedShapeIds = useShapeStore((s) => s.selectedShapeIds);
    const selectedShapesBounds = useShapeStore((s) => s.selectedShapesBounds);

    useRenderLogger("SelectionOutlineLayer");

    if (!selectedShapeIds?.size) return null;

    const shapes = useShapeStore.getState().shapes;

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
