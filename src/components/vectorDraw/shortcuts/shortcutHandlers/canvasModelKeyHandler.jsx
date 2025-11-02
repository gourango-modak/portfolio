import { CANVAS_MODE_SHORTCUTS } from "../../constants";
import { canvasPropertiesSlice, toolbarSlice } from "../../store/utils";
import { TOOLS } from "../../tools/constants";

let pressedKeys = new Set();

export const canvasModelKeyHandler = (e) => {
    if (e.type === "keydown") {
        pressedKeys.add(e.code);

        // Auto detect shortcuts
        for (const shortcut of CANVAS_MODE_SHORTCUTS) {
            const isPressed = [...shortcut.keys].every((key) =>
                pressedKeys.has(key)
            );

            if (isPressed) {
                const { properties, setCanvasMode } =
                    canvasPropertiesSlice.getSlice();
                if (properties.mode.value === shortcut.mode) return false;

                setCanvasMode(shortcut.mode);

                const { activeTool, activeToolInstance, setActiveTool } =
                    toolbarSlice.getSlice();

                if (activeTool === TOOLS.TEXT) {
                    activeToolInstance.cleanUpTextInput();
                }

                setActiveTool(TOOLS.SELECTION);

                return true;
            }
        }
    } else if (e.type === "keyup") {
        pressedKeys.delete(e.code);
    }

    return false;
};
