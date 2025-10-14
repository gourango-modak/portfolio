import { generateId } from "../../../../utils/common";
import { computeShapesBoundingBox } from "../../boundingBox/shapesBoundingBox";
import { resolveShapeFrameId } from "../../utils/frameUtils";
import { COMMANDS } from "./commandHistorySlice/constants";

export const createShapeSlice = (set, get) => ({
    shapeSlice: {
        shapes: {},
        shapeOrder: [],

        selectedShapeIds: new Set(), // track selected shapes by id
        selectedShapesBounds: null, // store combined bounds for quick access

        copiedShapes: null, // store copied shapes temporarily

        getShapes: () => {
            const { shapes } = get().shapeSlice;
            const { frameSlice, canvasPropertiesSlice } = get();

            const isPagedMode = canvasPropertiesSlice.isPagedCanvasMode();

            // Return all shapes if not in paged mode
            if (!isPagedMode) return shapes;

            const activeFrameId = frameSlice.activeFrameId;
            // Return only shapes belonging to the active frame
            if (activeFrameId) {
                return Object.fromEntries(
                    Object.entries(shapes).filter(
                        ([, shape]) => shape.frameId === activeFrameId
                    )
                );
            }

            return shapes;
        },

        setSelectedShapeIds: (selectedShapeIds) =>
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice, // keep other state intact
                    selectedShapeIds,
                },
            })),

        setSelectedShapesBounds: (selectedShapesBounds) =>
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice, // keep other state intact
                    selectedShapesBounds,
                },
            })),

        setShapes: (newShapes, newShapeOrder) =>
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    shapes: newShapes,
                    shapeOrder: newShapeOrder,
                },
            })),

        addShape: (shape) => {
            const id = generateId();
            const newShape = { id, version: 1, ...shape };

            get().commandHistorySlice.executeCommand({
                type: COMMANDS.ADD_SHAPE,
                shape: newShape,
            });

            return id;
        },

        updateShape: (id, updatedProps) => {
            const shape = get().shapeSlice.shapes[id];
            if (!shape) return;

            // Don't resolve shape frame Id when frame is selected;
            const frameId =
                get().frameSlice.selectedFrameIds.size > 0
                    ? shape.frameId
                    : resolveShapeFrameId(shape);

            set((state) => {
                const newShapes = {
                    ...state.shapeSlice.shapes,
                    [id]: {
                        ...shape,
                        ...updatedProps,
                        frameId,
                        version: shape.version + 1,
                    },
                };

                const newBounds = state.shapeSlice.selectedShapeIds.has(id)
                    ? computeShapesBoundingBox(
                          state.shapeSlice.selectedShapeIds,
                          newShapes
                      )
                    : state.shapeSlice.selectedShapesBounds;

                return {
                    shapeSlice: {
                        ...state.shapeSlice,
                        shapes: newShapes,
                        selectedShapesBounds: newBounds,
                    },
                };
            });
        },

        selectShape: (id) =>
            set((state) => {
                const newSelected = new Set(state.shapeSlice.selectedShapeIds);
                newSelected.add(id);
                const newBounds = computeShapesBoundingBox(
                    newSelected,
                    state.shapeSlice.shapes
                );

                return {
                    shapeSlice: {
                        ...state.shapeSlice,
                        selectedShapeIds: newSelected,
                        selectedShapesBounds: newBounds,
                    },
                    canvasObjectSlice: {
                        ...state.canvasObjectSlice,
                        lastSelectedId: id,
                    },
                };
            }),

        deselectShape: (id) =>
            set((state) => {
                const newSelected = new Set(state.shapeSlice.selectedShapeIds);
                newSelected.delete(id);
                const newBounds =
                    newSelected.size > 0
                        ? computeShapesBoundingBox(
                              newSelected,
                              state.shapeSlice.shapes
                          )
                        : null;

                return {
                    shapeSlice: {
                        ...state.shapeSlice,
                        selectedShapeIds: newSelected,
                        selectedShapesBounds: newBounds,
                    },
                };
            }),

        deselectAll: () =>
            set((state) => {
                get().panelSlice.closeToolPropertiesPanel();
                return {
                    shapeSlice: {
                        ...state.shapeSlice,
                        selectedShapeIds: new Set(),
                        selectedShapesBounds: null,
                    },
                };
            }),

        reset: () =>
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    shapes: {},
                    shapeOrder: [],
                    selectedShapeIds: new Set(),
                    selectedShapesBounds: null,
                },
            })),

        copySelectedShapes: () => {
            const { shapes, selectedShapeIds } = get().shapeSlice;
            if (selectedShapeIds.size === 0) return;

            // Create deep copies of selected shapes (without IDs)
            const copied = Array.from(selectedShapeIds)
                .map((id) => {
                    const shape = shapes[id];
                    if (!shape) return null;
                    const { id: _, ...rest } = shape; // remove original id
                    return { ...rest };
                })
                .filter(Boolean);

            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    copiedShapes: copied,
                },
            }));
        },

        pasteShapesAt: (position) => {
            const { copiedShapes, deselectAll } = get().shapeSlice;
            const { executeCommand } = get().commandHistorySlice;

            if (!copiedShapes || copiedShapes.length === 0) return;

            deselectAll();

            const newShapes = copiedShapes.map((shape) => ({
                ...shape,
                id: generateId(),
                version: 1,
                x: position.x + ((shape.x || 0) - (copiedShapes[0].x || 0)),
                y: position.y + ((shape.y || 0) - (copiedShapes[0].y || 0)),
            }));

            // Execute single command for all shapes
            executeCommand({
                type: COMMANDS.ADD_SHAPES,
                shapes: newShapes,
            });

            // Select all pasted shapes
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    selectedShapeIds: new Set(newShapes.map((s) => s.id)),
                    selectedShapesBounds: computeShapesBoundingBox(
                        new Set(newShapes.map((s) => s.id)),
                        {
                            ...state.shapeSlice.shapes,
                            ...Object.fromEntries(
                                newShapes.map((s) => [s.id, s])
                            ),
                        }
                    ),
                },
            }));
        },

        serialize: () => {
            const { shapes, shapeOrder } = get().shapeSlice;
            return { shapes, shapeOrder }; // return plain object
        },

        deserialize: (data) => {
            if (!data) return;
            set((state) => ({
                shapeSlice: {
                    ...state.shapeSlice,
                    shapes: data.shapes ?? state.shapeSlice.shapes,
                    shapeOrder: data.shapeOrder ?? state.shapeSlice.shapeOrder,
                },
            }));
        },
    },
});
