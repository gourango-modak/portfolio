import { canvasObjectSlice } from "../../store/utils";

export const shiftKeyHandler = (e) => {
    const { setPressedKey, clearPressedKey } = canvasObjectSlice.getSlice();

    if (e.key === "Shift") {
        if (e.type === "keydown") {
            setPressedKey("Shift");
        } else if (e.type === "keyup") {
            clearPressedKey();
        }
        return true;
    }

    return false;
};
