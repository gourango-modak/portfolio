import { selectShapesInRect } from "./../helpers/selectShapesInRect";

export const finalizeDragSelection = (
    tool,
    start,
    end,
    shapes,
    deselectAll,
    selectShape
) => {
    if (!tool.dragging) return;

    selectShapesInRect(tool, start, end, shapes, deselectAll, selectShape);
};
