import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";

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

export const getCanvasObjectProperties = (id) => {
    const { shapes } = shapeSlice.getSlice();
    const { frames } = frameSlice.getSlice();

    if (shapes[id]) return shapes[id].properties || null;
    if (frames[id]) return frames[id].properties || null;

    return null;
};

export function updateCanvasObjectProperties(id, updatedProps) {
    const { shapes, updateShape } = shapeSlice.getSlice();
    const { frames, updateFrame } = frameSlice.getSlice();

    if (shapes[id]) {
        updateShape(id, {
            properties: { ...shapes[id].properties, ...updatedProps },
        });
        return;
    }

    if (frames[id]) {
        updateFrame(id, { properties: updatedProps });
    }
}
