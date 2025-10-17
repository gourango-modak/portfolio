export const createCanvasObjectSlice = (set, get) => ({
    canvasObjectSlice: {
        lastSelectedId: null,
        pressedKey: null,

        deselectAll: () =>
            set((state) => {
                return {
                    canvasObjectSlice: {
                        ...state.canvasObjectSlice,
                        lastSelectedId: null,
                    },
                };
            }),

        setPressedKey: (key) =>
            set((state) => ({
                canvasObjectSlice: {
                    ...state.canvasObjectSlice,
                    pressedKey: key,
                },
            })),

        clearPressedKey: () =>
            set((state) => ({
                canvasObjectSlice: {
                    ...state.canvasObjectSlice,
                    pressedKey: null,
                },
            })),
    },
});
