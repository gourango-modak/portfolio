import { useShapeStore } from "../store/useShapeStore";
import { useRenderLogger } from "../hooks/useRenderLogger";

export const GroupedSelectionRect = () => {
    const selectedShapeIds = useShapeStore((s) => s.selectedShapeIds);
    const selectedShapesBounds = useShapeStore((s) => s.selectedShapesBounds);

    useRenderLogger("CombinedSelectionRect");

    if (selectedShapeIds.size <= 1 || !selectedShapesBounds) return null;

    const padding = 10;

    return (
        <rect
            x={selectedShapesBounds.x - padding}
            y={selectedShapesBounds.y - padding}
            width={selectedShapesBounds.width + 2 * padding}
            height={selectedShapesBounds.height + 2 * padding}
            stroke="#007AFF"
            strokeWidth={1}
            fill="none"
            strokeDasharray="4 2"
        />
    );
};
