export const createCanvasObjectSlice = (set, get) => ({
    canvasObjectSlice: {
        lastSelectedId: null,

        deselectAll: () =>
            set((state) => {
                return {
                    canvasObjectSlice: {
                        ...state.canvasObjectSlice,
                        lastSelectedId: null,
                    },
                };
            }),
    },
});
