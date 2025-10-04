import { useShapeStore } from "../store/useShapeStore";
import { getCombinedSelectionBounds } from "../canvasUtils";
import { useRenderLogger } from "../hooks/useRenderLogger";

export const CombinedSelectionRect = () => {
    const selectedShapeIds = useShapeStore((s) => s.selectedShapeIds);
    useShapeStore((s) => s.shapes);

    useRenderLogger("CombinedSelectionRect");

    if (selectedShapeIds.size <= 1) return null;

    const combinedBounds = getCombinedSelectionBounds(selectedShapeIds);
    const padding = 10;

    return (
        <rect
            x={combinedBounds.x - padding}
            y={combinedBounds.y - padding}
            width={combinedBounds.width + 2 * padding}
            height={combinedBounds.height + 2 * padding}
            stroke="#007AFF"
            strokeWidth={1}
            fill="none"
            strokeDasharray="4 2"
        />
    );
};
