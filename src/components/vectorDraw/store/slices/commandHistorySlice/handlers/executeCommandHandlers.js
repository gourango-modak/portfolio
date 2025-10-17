import { COMMANDS } from "../constants";
import { computeShapesBoundingBox } from "./../../../../boundingBox/shapesBoundingBox";
import { computeFramesBoundingBox } from "./../../../../boundingBox/framesBoundingBox";
import { createFrameTitleShape } from "../../../../utils/frameUtils";

export const executeCommandHandlers = {
    [COMMANDS.ADD_SHAPE]: (set, cmd) =>
        set((s) => ({
            shapeSlice: {
                ...s.shapeSlice,
                shapes: { ...s.shapeSlice.shapes, [cmd.shape.id]: cmd.shape },
                shapeOrder: [...s.shapeSlice.shapeOrder, cmd.shape.id],
            },
        })),

    [COMMANDS.UPDATE_SHAPES]: (set, cmd) =>
        set((s) => {
            const { shapes, selectedShapeIds, selectedShapesBounds } =
                s.shapeSlice;
            const newShapes = { ...shapes };
            for (const id in cmd.newProps) {
                const shape = newShapes[id];
                if (!shape) continue;
                newShapes[id] = {
                    ...shape,
                    ...cmd.newProps[id],
                    properties: {
                        ...shape.properties,
                        ...cmd.newProps[id].properties,
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
            const { shapes, shapeOrder, selectedShapeIds } = s.shapeSlice;
            const newShapes = { ...shapes };
            const newOrder = shapeOrder.filter((id) => !cmd.shapeIds.has(id));

            for (const id of cmd.shapeIds) delete newShapes[id];

            const newSelected = new Set(selectedShapeIds);
            cmd.shapeIds.forEach((id) => newSelected.delete(id));

            const newBounds =
                newSelected.size > 0
                    ? computeShapesBoundingBox(newSelected, newShapes)
                    : null;

            return {
                shapeSlice: {
                    ...s.shapeSlice,
                    shapes: newShapes,
                    shapeOrder: newOrder,
                    selectedShapeIds: newSelected,
                    selectedShapesBounds: newBounds,
                },
            };
        }),

    [COMMANDS.ADD_SHAPES]: (set, cmd) =>
        set((s) => {
            const newShapes = { ...s.shapeSlice.shapes };
            const newOrder = [...s.shapeSlice.shapeOrder];

            cmd.shapes.forEach((shape) => {
                newShapes[shape.id] = shape;
                newOrder.push(shape.id);
            });

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
            for (const id in cmd.newProps) {
                const frame = newFrames[id];
                if (!frame) continue;
                newFrames[id] = {
                    ...frame,
                    ...cmd.newProps[id],
                    properties: {
                        ...frame.properties,
                        ...cmd.newProps[id].properties,
                    },
                    version: (frame.version || 0) + 1,
                };
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
            };
        }),

    [COMMANDS.ADD_FRAME]: (set, cmd) =>
        set((s) => {
            // Add the frame
            const newFrames = {
                ...s.frameSlice.frames,
                [cmd.frame.id]: cmd.frame,
            };
            const newFrameOrder = [...s.frameSlice.frameOrder, cmd.frame.id];

            // Create the title shape for this frame
            const titleShape = createFrameTitleShape({
                x: cmd.frame.x,
                y: cmd.frame.y,
                text: cmd?.frameFromTemplate
                    ? `Page_${newFrameOrder.length}`
                    : "Frame",
                color: cmd.frame.properties.borderColor.value,
            });
            titleShape.frameId = cmd.frame.id;
            newFrames[cmd.frame.id].titleShapeId = titleShape.id;

            // Add the title shape to the shapeSlice
            const newShapes = {
                ...s.shapeSlice.shapes,
                [titleShape.id]: titleShape,
            };
            const newShapeOrder = [...s.shapeSlice.shapeOrder, titleShape.id];

            return {
                frameSlice: {
                    ...s.frameSlice,
                    frames: newFrames,
                    frameOrder: newFrameOrder,
                    activeFrameId: cmd?.frameFromTemplate ? cmd.frame.id : null,
                },
                shapeSlice: {
                    ...s.shapeSlice,
                    shapes: newShapes,
                    shapeOrder: newShapeOrder,
                },
            };
        }),
};
