import { computeSelectedShapesBounds } from "../../../../shapes/utils";
import { COMMANDS } from "../constants";

export const undoHandlers = {
    [COMMANDS.ADD_SHAPE]: (set, cmd) =>
        set((s) => {
            const { [cmd.shape.id]: _, ...rest } = s.shapeSlice.shapes;
            const newSel = new Set(s.shapeSlice.selectedShapeIds);
            newSel.delete(cmd.shape.id);
            const newBounds =
                newSel.size > 0
                    ? computeSelectedShapesBounds(newSel, rest)
                    : null;

            return {
                shapeSlice: {
                    ...s.shapeSlice,
                    shapes: rest,
                    shapeOrder: s.shapeSlice.shapeOrder.filter(
                        (id) => id !== cmd.shape.id
                    ),
                    selectedShapeIds: newSel,
                    selectedShapesBounds: newBounds,
                },
            };
        }),

    [COMMANDS.UPDATE_SHAPES]: (set, cmd) =>
        set((s) => {
            const { shapes, selectedShapeIds, selectedShapesBounds } =
                s.shapeSlice;
            const newShapes = { ...shapes };
            for (const id in cmd.prevProps) {
                const shape = newShapes[id];
                if (!shape) continue;
                newShapes[id] = {
                    ...shape,
                    ...cmd.prevProps[id],
                    version: shape.version + 1,
                };
            }

            const newBounds = selectedShapeIds.size
                ? computeSelectedShapesBounds(selectedShapeIds, newShapes)
                : selectedShapesBounds;

            return {
                shapeSlice: {
                    ...s.shapeSlice,
                    shapes: newShapes,
                    selectedShapesBounds: newBounds,
                },
            };
        }),

    [COMMANDS.DELETE_SHAPES]: (set, cmd) =>
        set((s) => {
            const { shapes, shapeOrder } = s.shapeSlice;
            const restoredShapes = { ...shapes, ...cmd.deletedShapes };
            const restoredOrder = [...shapeOrder];
            for (const id of cmd.shapeOrderBeforeDelete)
                if (!restoredOrder.includes(id)) restoredOrder.push(id);

            return {
                shapeSlice: {
                    ...s.shapeSlice,
                    shapes: restoredShapes,
                    shapeOrder: restoredOrder,
                },
            };
        }),

    [COMMANDS.ADD_SHAPES]: (set, cmd) =>
        set((s) => {
            const newShapes = { ...s.shapeSlice.shapes };
            const idsToRemove = cmd.shapes.map((shape) => shape.id);
            idsToRemove.forEach((id) => delete newShapes[id]);

            const newOrder = s.shapeSlice.shapeOrder.filter(
                (id) => !idsToRemove.includes(id)
            );

            return {
                shapeSlice: {
                    ...s.shapeSlice,
                    shapes: newShapes,
                    shapeOrder: newOrder,
                },
            };
        }),
};
