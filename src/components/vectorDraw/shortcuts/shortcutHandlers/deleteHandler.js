import { COMMANDS } from "../../store/slices/commandHistorySlice/constants";
import { commandHistorySlice, shapeSlice } from "../../store/utils";

export const deleteShortcutHandler = (e) => {
    if (e.key.toLowerCase() !== "delete") return false;
    e.preventDefault();

    const {
        selectedShapeIds,
        shapeOrder,
        shapes,
        setShapes,
        setSelectedShapeIds,
        setSelectedShapesBounds,
    } = shapeSlice.getSlice();

    if (!selectedShapeIds || selectedShapeIds.size === 0) return true;

    const deletedShapes = {};
    selectedShapeIds.forEach((id) => {
        if (shapes[id]) deletedShapes[id] = shapes[id];
    });

    if (Object.keys(deletedShapes).length === 0) return true;

    const cmdSlice = commandHistorySlice.getSlice();
    cmdSlice.beginCommand(COMMANDS.DELETE_SHAPES, {
        shapeOrderBeforeDelete: [...shapeOrder],
        shapeIds: selectedShapeIds,
        deletedShapes,
    });

    const remainingShapes = { ...shapes };
    selectedShapeIds.forEach((id) => delete remainingShapes[id]);
    const remainingOrder = shapeOrder.filter((id) => !selectedShapeIds.has(id));

    // Clear selection and bounds
    setSelectedShapeIds(new Set());
    setSelectedShapesBounds(null);
    setShapes(remainingShapes, remainingOrder);

    cmdSlice.finalizeCommand({
        shapeIds: Array.from(selectedShapeIds),
        deletedShapes,
    });

    return true;
};
