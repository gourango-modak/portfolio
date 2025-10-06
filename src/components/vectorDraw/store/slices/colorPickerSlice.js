export const createColorPickerSlice = (set, get) => ({
    colorPickerSlice: {
        colorPickers: {},

        open: (id, initialColor, position) =>
            set((state) => ({
                colorPickerSlice: {
                    ...state.colorPickerSlice,
                    colorPickers: {
                        ...state.colorPickerSlice.colorPickers,
                        [id]: { isOpen: true, color: initialColor, position },
                    },
                },
            })),

        close: (id) =>
            set((state) => ({
                colorPickerSlice: {
                    ...state.colorPickerSlice,
                    colorPickers: {
                        ...state.colorPickerSlice.colorPickers,
                        [id]: {
                            ...state.colorPickerSlice.colorPickers[id],
                            isOpen: false,
                        },
                    },
                },
            })),

        setColor: (id, color) =>
            set((state) => ({
                colorPickerSlice: {
                    ...state.colorPickerSlice,
                    colorPickers: {
                        ...state.colorPickerSlice.colorPickers,
                        [id]: {
                            ...state.colorPickerSlice.colorPickers[id],
                            color,
                        },
                    },
                },
            })),
    },
});
