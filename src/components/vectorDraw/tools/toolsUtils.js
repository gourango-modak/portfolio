import { canvasPropertiesSlice } from "../store/storeUtils";

export const TOOLS = {
    PEN: "PEN",
    SELECTION: "SELECTION",
    PAN: "PAN",
    RECTANGLE: "RECTANGLE",
    ARROW: "ARROW",
    ERASER: "ERASER",
    TEXT: "TEXT",
};

export const getRoughRectPath = (x, y, w, h, roughness = 0) => {
    const jitter = (v) => v + (Math.random() - 0.5) * roughness;

    const makePath = () => {
        const x1 = jitter(x),
            y1 = jitter(y);
        const x2 = jitter(x + w),
            y2 = jitter(y);
        const x3 = jitter(x + w),
            y3 = jitter(y + h);
        const x4 = jitter(x),
            y4 = jitter(y + h);
        return `M${x1},${y1} L${x2},${y2} L${x3},${y3} L${x4},${y4} Z`;
    };

    return roughness > 0
        ? `${makePath()} ${makePath()}`
        : `M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`;
};

export const getRoughArrowPath = (x1, y1, x2, y2, properties) => {
    const {
        roughness,
        headLength,
        headAngle,
        lineGap = 0,
        strokeWidth,
    } = properties;

    const jitter = (v) =>
        v + (Math.random() - 0.5) * roughness.value * strokeWidth.value;
    const adjustedHeadLength =
        headLength.value * Math.max(1, strokeWidth.value / 2);

    // Arrowhead points
    const getArrowHeadPoints = () => {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const rad = (headAngle.value * Math.PI) / 180;

        const hx1 = x2 - adjustedHeadLength * Math.cos(angle - rad);
        const hy1 = y2 - adjustedHeadLength * Math.sin(angle - rad);

        const hx2 = x2 - adjustedHeadLength * Math.cos(angle + rad);
        const hy2 = y2 - adjustedHeadLength * Math.sin(angle + rad);

        return { hx1, hy1, hx2, hy2 };
    };

    const { hx1, hy1, hx2, hy2 } = getArrowHeadPoints();

    // Calculate perpendicular offset for lineGap
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (dy / len) * lineGap;
    const offsetY = (-dx / len) * lineGap;

    // Generate two rough lines for shaft
    const roughLines =
        roughness.value > 0
            ? [
                  `M${jitter(x1 + offsetX)},${jitter(y1 + offsetY)} L${jitter(
                      x2 + offsetX
                  )},${jitter(y2 + offsetY)}`,
                  `M${jitter(x1 - offsetX)},${jitter(y1 - offsetY)} L${jitter(
                      x2 - offsetX
                  )},${jitter(y2 - offsetY)}`,
              ].join(" ")
            : `M${x1 + offsetX},${y1 + offsetY} L${x2 + offsetX},${
                  y2 + offsetY
              } M${x1 - offsetX},${y1 - offsetY} L${x2 - offsetX},${
                  y2 - offsetY
              }`;

    // Combine shaft + single arrowhead
    return `${roughLines} M${hx1},${hy1} L${x2},${y2} L${hx2},${hy2}`;
};

export function getScreenPoint({ x, y }) {
    const { scale, pan } = canvasPropertiesSlice.getSlice().properties;
    return {
        x: x * scale + pan.x,
        y: y * scale + pan.y,
    };
}
