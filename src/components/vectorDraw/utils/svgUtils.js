export const getSvgPathFromStroke = (stroke) => {
    if (!stroke.length) return "";
    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ["M", ...stroke[0], "Q"]
    );
    d.push("Z");
    return d.join(" ");
};

export const getRectToPathData = (rect) => {
    const { x, y, width, height } = rect;
    return `M${x},${y} L${x + width},${y} L${x + width},${y + height} L${x},${
        y + height
    } Z`;
};

export const getRoughRectPath = (
    x,
    y,
    w,
    h,
    roughness = 0,
    strokeWidth = 1,
    seed = 0
) => {
    // Simple deterministic pseudo-random generator
    const rand = (() => {
        let s = seed;
        return () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    })();

    const jitter = (v) => v + (rand() - 0.5) * roughness + strokeWidth * 0.3;

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

export function getArrowHeadPoints(shape) {
    const { x1, y1, x2, y2, properties } = shape;

    const { headLength, headAngle, strokeWidth } = properties;

    // Adjust arrowhead length based on strokeWidth
    const adjustedHeadLength =
        headLength.value * Math.max(1, strokeWidth.value / 2);

    // Compute main line angle
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const rad = (headAngle.value * Math.PI) / 180;

    // Arrowhead points relative to tip (x2, y2)
    const hx1 = x2 - adjustedHeadLength * Math.cos(angle - rad);
    const hy1 = y2 - adjustedHeadLength * Math.sin(angle - rad);

    const hx2 = x2 - adjustedHeadLength * Math.cos(angle + rad);
    const hy2 = y2 - adjustedHeadLength * Math.sin(angle + rad);

    return [
        { x: x2, y: y2 }, // tip
        { x: hx1, y: hy1 }, // left corner
        { x: hx2, y: hy2 }, // right corner
    ];
}

export const getRoughArrowPath = (x1, y1, x2, y2, properties, seed = 0) => {
    const { roughness, lineGap = 0, strokeWidth } = properties;

    // Deterministic pseudo-random generator
    const rand = (() => {
        let s = seed;
        return () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    })();

    const jitter = (v) =>
        v + (rand() - 0.5) * roughness.value * strokeWidth.value;

    // 1️⃣ Compute arrowhead points using shared helper
    const arrowHeadPoints = getArrowHeadPoints({
        x1,
        y1,
        x2,
        y2,
        properties,
        seed,
    });
    const [tip, left, right] = arrowHeadPoints;

    // 2️⃣ Calculate perpendicular offset for lineGap
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (dy / len) * lineGap;
    const offsetY = (-dx / len) * lineGap;

    // 3️⃣ Generate rough shaft lines
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

    // 4️⃣ Combine shaft + arrowhead
    return `${roughLines} M${left.x},${left.y} L${tip.x},${tip.y} L${right.x},${right.y}`;
};
