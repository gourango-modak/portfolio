import { produceWithPatches } from "immer";
import {
    genId,
    isPointInShape,
    validateShape,
    isPointInFrame,
} from "../store/shapesHelpers";
import { useCanvasStore } from "./useCanvasStore";
import { useToolbarStore } from "../store/useToolbarStore";

function applyShapeMutation(fn, get, set, meta = {}, commitToHistory = true) {
    const currentShapes = get().shapes;
    const [nextShapes, patches, inversePatches] = produceWithPatches(
        currentShapes,
        (draft) => {
            fn(draft);
        }
    );

    if (!patches || patches.length === 0 || !commitToHistory) {
        set({ shapes: nextShapes });
        return;
    }

    set((state) => ({
        shapes: nextShapes,
        historyPast: [...state.historyPast, { patches, inversePatches, meta }],
        historyFuture: [],
    }));
}

const createHistoryActions = (set, get) => ({
    undo() {
        const past = get().historyPast;
        if (!past.length) return;
        const last = past[past.length - 1];
        const current = get().shapes;
        const prevShapes = applyPatches(current, last.inversePatches);
        set((state) => ({
            shapes: prevShapes,
            historyPast: state.historyPast.slice(0, -1),
            historyFuture: [
                { patches: last.patches, inversePatches: last.inversePatches },
                ...state.historyFuture,
            ],
        }));
    },

    redo() {
        const future = get().historyFuture;
        if (!future.length) return;
        const next = future[0];
        const current = get().shapes;
        const nextShapes = applyPatches(current, next.patches);
        set((state) => ({
            shapes: nextShapes,
            historyFuture: state.historyFuture.slice(1),
            historyPast: [...state.historyPast, next],
        }));
    },

    clearHistory() {
        set({ historyPast: [], historyFuture: [] });
    },
});

const createShapeActions = (set, get) => ({
    addShape(shape) {
        const id = genId();
        applyShapeMutation(
            (draft) => {
                draft[id] = { ...shape, id, version: 1 };
            },
            get,
            set,
            { type: "add", id }
        );
        set((s) => ({ shapeOrder: [...s.shapeOrder, id] }));
        return id;
    },

    updateShape(id, partial) {
        applyShapeMutation(
            (draft) => {
                if (!draft[id]) return;
                draft[id] = {
                    ...draft[id],
                    ...partial,
                    version: (draft[id].version || 0) + 1,
                };
            },
            get,
            set,
            { type: "update", id }
        );
    },

    deleteShape(id) {
        applyShapeMutation(
            (draft) => {
                delete draft[id];
            },
            get,
            set,
            { type: "delete", id }
        );
        set((s) => ({ shapeOrder: s.shapeOrder.filter((sid) => sid !== id) }));
    },

    bringToFront(id) {
        set((s) => ({
            shapeOrder: [...s.shapeOrder.filter((x) => x !== id), id],
        }));
    },

    sendToBack(id) {
        set((s) => ({
            shapeOrder: [id, ...s.shapeOrder.filter((x) => x !== id)],
        }));
    },
});

const createLiveActions = (set, get) => ({
    startDraw(shape, clickPoint) {
        const { frames, canvasMode } = useCanvasStore.getState();
        const toolbarState = useToolbarStore.getState();

        // Merge default and user settings for the active tool
        const mergedSettings = {
            ...toolbarState.toolSettings[toolbarState.activeTool],
            ...toolbarState.userSettings[toolbarState.activeTool],
        };

        const id = genId();
        const newShape = {
            ...shape,
            ...mergedSettings,
            id,
            isDrawing: true,
            version: 1,
        };

        if (canvasMode === "framed") {
            const frame = Object.values(frames).find((f) =>
                isPointInFrame(clickPoint, f)
            );
            if (frame) {
                newShape.frameId = frame.id;
            }
        }

        applyShapeMutation(
            (draft) => {
                draft[id] = newShape;
            },
            get,
            set,
            { type: "add", id }
        );
        set((s) => ({
            shapeOrder: [...s.shapeOrder, id],
            currentLiveShapeId: id,
        }));
        return id;
    },

    liveUpdate(id, partial) {
        applyShapeMutation(
            (draft) => {
                if (!draft[id]) return;
                draft[id] = {
                    ...draft[id],
                    ...partial,
                    version: (draft[id].version || 0) + 1,
                };
            },
            get,
            set,
            { type: "live-update", id },
            false
        );
    },

    commitDraw() {
        const id = get().currentLiveShapeId;
        if (!id) return;
        const shapeToCommit = get().shapes[id];
        if (!validateShape(shapeToCommit)) {
            applyShapeMutation(
                (draft) => {
                    delete draft[id];
                },
                get,
                set,
                { type: "cancel-draw" },
                false
            );
            set({ currentLiveShapeId: null });
            return;
        }
        applyShapeMutation(
            (draft) => {
                draft[id].isDrawing = false;
                draft[id].version = (draft[id].version || 0) + 1;
            },
            get,
            set,
            { type: "commit-add", id }
        );
        set({ currentLiveShapeId: null });
    },

    startMove(id) {
        applyShapeMutation(
            (draft) => {
                draft[id].isMoving = true;
                draft[id].version = (draft[id].version || 0) + 1;
            },
            get,
            set,
            { type: "start-move", id }
        );
        set({ currentLiveShapeId: id });
    },

    commitMove() {
        const id = get().currentLiveShapeId;
        if (!id) return;
        applyShapeMutation(
            (draft) => {
                draft[id].isMoving = false;
                draft[id].version = (draft[id].version || 0) + 1;
            },
            get,
            set,
            { type: "commit-move", id }
        );
        set({ currentLiveShapeId: null });
    },

    eraseShapeAtPoint(point) {
        const { shapes, shapeOrder } = get();
        for (let i = shapeOrder.length - 1; i >= 0; i--) {
            const id = shapeOrder[i];
            const shape = shapes[id];
            if (!shape) continue;
            if (isPointInShape(point, shape)) {
                this.deleteShape(id);
                return;
            }
        }
    },

    selectShapeAtPoint(point) {
        const { shapes, shapeOrder } = get();
        let foundId = null;
        for (let i = shapeOrder.length - 1; i >= 0; i--) {
            const id = shapeOrder[i];
            const shape = shapes[id];
            if (!shape) continue;
            if (isPointInShape(point, shape)) {
                foundId = id;
                break;
            }
        }
        set({ selectedShapeId: foundId });
    },
});

export const createAllActions = (set, get) => ({
    ...createHistoryActions(set, get),
    ...createShapeActions(set, get),
    ...createLiveActions(set, get),
});
