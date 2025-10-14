import { canvasPropertiesSlice, frameSlice, shapeSlice } from "../store/utils";
import { TEXT_LINE_HEIGHT } from "../tools/constants";

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

export function updateCanvasObjectProperties(id, updatedProperties) {
    const { shapes, updateShape } = shapeSlice.getSlice();
    const { frames, updateFrame } = frameSlice.getSlice();

    const shape = shapes[id];
    if (shape) {
        const updatedProps = {};
        if (
            updatedProperties.fontSize.value !== shape.properties.fontSize.value
        ) {
            const { width, height } = measureTextSize(shape.text, {
                ...shape.properties,
                ...updatedProperties,
            });
            updatedProps.width = width;
            updatedProps.height = height;
        }

        updatedProps.properties = {
            ...shape.properties,
            ...updatedProperties,
        };
        updateShape(id, updatedProps);
        return;
    }

    const frame = frames[id];
    if (frame) {
        const width = updatedProps?.width?.value || frame.width;
        const height = updatedProps?.height?.value || frame.height;
        updateFrame(id, {
            width,
            height,
            properties: { ...frame.properties, ...updatedProps },
        });
    }
}

export function measureTextSize(text, properties) {
    // Create a temporary hidden span to measure
    const span = document.createElement("span");
    Object.assign(span.style, {
        position: "absolute",
        visibility: "hidden",
        whiteSpace: "pre",
        fontFamily: properties.fontFamily.value,
        fontSize: `${properties.fontSize.value}px`,
        lineHeight: TEXT_LINE_HEIGHT,
    });

    span.textContent = text || " ";
    document.body.appendChild(span);

    // Measure text width visually using span and
    // add a small buffer for spacing (same as text tool)
    const measuredWidth = span.offsetWidth + properties.fontSize.value / 3;
    const lineCount = text.split("\n").length;
    const measuredHeight =
        lineCount * properties.fontSize.value * TEXT_LINE_HEIGHT;

    span.remove();

    return {
        width: measuredWidth,
        height: measuredHeight,
    };
}
