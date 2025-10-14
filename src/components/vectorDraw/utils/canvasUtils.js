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

export function getSafeViewportPosition(bbox, margin = 10) {
    const { x, y, width, height } = bbox;
    const { innerWidth, innerHeight } = window;

    let safeX = x;
    let safeY = y;

    // Prevent horizontal overflow
    if (safeX + width > innerWidth - margin) {
        safeX = Math.max(innerWidth - width - margin, margin);
    } else if (safeX < margin) {
        safeX = margin;
    }

    // Prevent vertical overflow
    if (safeY + height > innerHeight - margin) {
        safeY = Math.max(innerHeight - height - margin, margin);
    } else if (safeY < margin) {
        safeY = margin;
    }

    return { x: safeX, y: safeY };
}
