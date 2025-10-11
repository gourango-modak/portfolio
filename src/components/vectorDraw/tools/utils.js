import { toolRegistry } from "./registry";

export function isRegisteredTool(toolName) {
    return Boolean(toolRegistry[toolName]);
}
