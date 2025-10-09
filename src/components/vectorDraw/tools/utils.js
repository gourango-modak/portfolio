import { canvasPropertiesSlice } from "../store/utils";

export function getScreenPoint({ x, y }) {
    const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
    return {
        x: x * scale + pan.x,
        y: y * scale + pan.y,
    };
}
