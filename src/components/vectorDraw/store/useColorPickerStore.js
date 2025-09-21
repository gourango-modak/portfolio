import { create } from "zustand";

export const useColorPickerStore = create((set) => ({
    colorPickers: {},

    open: (id, initialColor, position) =>
        set((s) => ({
            colorPickers: {
                ...s.colorPickers,
                [id]: { isOpen: true, color: initialColor, position },
            },
        })),

    close: (id) =>
        set((s) => ({
            colorPickers: {
                ...s.colorPickers,
                [id]: { ...s.colorPickers[id], isOpen: false },
            },
        })),

    setColor: (id, color) =>
        set((s) => ({
            colorPickers: {
                ...s.colorPickers,
                [id]: { ...s.colorPickers[id], color },
            },
        })),
}));
