import { CANVAS_MODES } from "../constants";
import { TOOLS } from "./constants";
import { toolRegistry } from "./registry";

export function isRegisteredTool(toolName) {
    return Boolean(toolRegistry[toolName]);
}
