import { canvasPropertiesSlice } from "../store/utils";
import { toolRegistry } from "./registry";

export function getScreenPoint({ x, y }) {
    const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
    return {
        x: x * scale + pan.x,
        y: y * scale + pan.y,
    };
}

export function isRegisteredTool(toolName) {
    return Boolean(toolRegistry[toolName]);
}
