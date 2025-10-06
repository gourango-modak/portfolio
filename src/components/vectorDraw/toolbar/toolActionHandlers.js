import { downloadJson, generateId } from "../../../utils/common";
import {
    canvasPropertiesSlice,
    deserializeDrawingAppState,
    frameSlice,
    panelSlice,
    serializeDrawingAppState,
    shapeSlice,
    toolbarSlice,
} from "../store/storeUtils";
import { INSPECTOR_PANEL_TARGETS } from "./properties/propertiesUtils";
import { TOOL_ACTION_TYPES } from "./toolbarConfig";

export const toolActionHandlers = {
    [TOOL_ACTION_TYPES.SELECT_TOOL]: ({ name }) => {
        toolbarSlice.getSlice().setActiveTool(name);
    },
    [TOOL_ACTION_TYPES.OPEN_CANVAS_PROPERTIES_PANEL]: () => {
        panelSlice
            .getSlice()
            .openInspectorPanel(INSPECTOR_PANEL_TARGETS.CANVAS);
    },
    [TOOL_ACTION_TYPES.ADD_PAGE]: () => {
        frameSlice.getSlice().addFrame();
    },
    [TOOL_ACTION_TYPES.PREV_PAGE]: () => {
        frameSlice.getSlice().prevFrame();
    },
    [TOOL_ACTION_TYPES.NEXT_PAGE]: () => {
        frameSlice.getSlice().nextFrame();
    },
    [TOOL_ACTION_TYPES.EXPORT_DRAWING_STATE]: () => {
        downloadJson(serializeDrawingAppState(), generateId());
    },
    [TOOL_ACTION_TYPES.IMPORT_DRAWING_STATE]: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";

        input.style.display = "none";
        document.body.appendChild(input);

        const cleanup = () => {
            if (input.parentNode) {
                document.body.removeChild(input);
            }
        };

        input.onchange = (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonString = event.target.result;
                    deserializeDrawingAppState(jsonString);
                } catch (err) {
                    console.error("Failed to import drawing state:", err);
                }
            };
            reader.readAsText(file);
        };

        input.click();

        // Ensure cleanup if user cancels file selection (onchange won’t fire)
        setTimeout(cleanup, 1000);
    },
    [TOOL_ACTION_TYPES.CLEAR_CANVAS]: () => {
        shapeSlice.getSlice().reset();
    },
    [TOOL_ACTION_TYPES.RESET_ZOOM_AND_PAN]: () => {
        canvasPropertiesSlice.getSlice().resetViewport();
    },
};
