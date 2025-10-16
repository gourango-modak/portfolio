import { computeShapesBoundingBox } from "../../../../boundingBox/shapesBoundingBox";
import { COMMANDS } from "../constants";
import { computeFramesBoundingBox } from "./../../../../boundingBox/framesBoundingBox";

export const undoHandlers = {
    [COMMANDS.ADD_SHAPE]: (set, cmd) =>
        set((s) => {
            const { [cmd.shape.id]: _, ...rest } = s.shapeSlice.shapes;
            const newSel = new Set(s.shapeSlice.selectedShapeIds);
            newSel.delete(cmd.shape.id);
            const newBounds =
                newSel.size > 0 ? computeShapesBoundingBox(newSel, rest) : null;

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
                    properties: {
                        ...shape.properties,
                        ...cmd.prevProps[id].properties,
                    },
                    version: shape.version + 1,
                };
            }

            const newBounds = selectedShapeIds.size
                ? computeShapesBoundingBox(selectedShapeIds, newShapes)
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

    [COMMANDS.UPDATE_FRAMES]: (set, cmd) =>
        set((s) => {
            const { frames, selectedFrameIds, selectedFramesBounds } =
                s.frameSlice;
            const newFrames = { ...frames };
            const newShapes = { ...s.shapeSlice.shapes }; // include shapes

            for (const id in cmd.prevProps) {
                const frame = newFrames[id];
                if (!frame) continue;

                // Update the frame itself
                newFrames[id] = {
                    ...frame,
                    ...cmd.prevProps[id],
                    version: (frame.version || 0) + 1,
                };

                // If this frame has a title shape, apply previous props
                if (frame.titleShapeId) {
                    const titleShape = newShapes[frame.titleShapeId];
                    const prevTitleProps = cmd.prevProps[frame.titleShapeId];
                    if (titleShape && prevTitleProps) {
                        newShapes[frame.titleShapeId] = {
                            ...titleShape,
                            ...prevTitleProps,
                            version: (titleShape.version || 0) + 1,
                        };
                    }
                }
            }

            const newBounds = selectedFrameIds.size
                ? computeFramesBoundingBox(selectedFrameIds, newFrames)
                : selectedFramesBounds;

            return {
                frameSlice: {
                    ...s.frameSlice,
                    frames: newFrames,
                    selectedFramesBounds: newBounds,
                },
                shapeSlice: {
                    ...s.shapeSlice,
                    shapes: newShapes,
                },
            };
        }),

    [COMMANDS.ADD_FRAME]: (set, cmd) =>
        set((s) => {
            // Remove the added frame
            const { [cmd.frame.id]: _, ...rest } = s.frameSlice.frames;

            // Remove from selected frames if it was selected
            const newSel = new Set(s.frameSlice.selectedFrameIds);
            newSel.delete(cmd.frame.id);

            // Recompute selected frames bounding box
            const newBounds =
                newSel.size > 0 ? computeFramesBoundingBox(newSel, rest) : null;

            return {
                frameSlice: {
                    ...s.frameSlice,
                    frames: rest,
                    frameOrder: s.frameSlice.frameOrder.filter(
                        (id) => id !== cmd.frame.id
                    ),
                    selectedFrameIds: newSel,
                    selectedFramesBounds: newBounds,
                },
            };
        }),
};
