import { toolbarSlice } from "../../store/utils";
import { TOOLS } from "../../tools/constants";

export const escapeKeyHandler = (e) => {
    if (e.key === "Escape") {
        const { activeTool, setActiveTool, activeToolInstance } =
            toolbarSlice.getSlice();
        if (activeTool === TOOLS.TEXT) {
            activeToolInstance.clearBlurEvent();
            activeToolInstance.cleanUpTextInput();
        }
        setActiveTool(TOOLS.SELECTION);
        return true;
    }

    return false;
};
