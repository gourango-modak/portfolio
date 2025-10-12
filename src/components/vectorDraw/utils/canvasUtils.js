import { canvasPropertiesSlice } from "../store/utils";

let canvasLastPointerPosition = { x: 0, y: 0 };

export const updateCanvasLastPointerPosition = (e) => {
    const { tx, ty } = getTransformedEvent(e);
    canvasLastPointerPosition = {
        x: tx,
        y: ty,
    };
};

export const getCanvasLastPointerPosition = () => canvasLastPointerPosition;

export const getTransformedEvent = (e) => {
    const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
    return {
        ...e,
        tx: (e.clientX - pan.x) / scale,
        ty: (e.clientY - pan.y) / scale,
    };
};

export function toViewportPoint({ x, y }, scale, pan) {
    if (!scale) {
        scale = canvasPropertiesSlice.getSlice().properties.scale;
    }
    if (!pan) {
        pan = canvasPropertiesSlice.getSlice().properties.pan;
    }

    return {
        x: x * scale + pan.x,
        y: y * scale + pan.y,
    };
}
