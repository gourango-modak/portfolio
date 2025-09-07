import getStroke from "perfect-freehand";
import {
    distance,
    getOpenArrowHead,
    getSvgPathFromStroke,
} from "./svgEditorUtils";
import { FONT_FAMILY, MIN_ARROW_LENGTH, TOOLS } from "./svgEdtiorConfig";

/**
 * Returns an SVG <path> element representing a pen stroke.
 * Notes:
 * - Current strokes use `options` to apply smoothing, thinning, and streamline in real-time.
 * - Saved strokes do not use `options` to preserve the original shape.
 */
export const PenShape = ({ points, options = null, color = "black" }) => {
    // Apply smoothing if options are provided; otherwise use raw points
    const strokePoints = options ? getStroke(points, options) : points;

    // Convert stroke points to SVG path string
    const d = getSvgPathFromStroke(strokePoints);

    return <path d={d} fill={color} />;
};

export const RectangleShape = ({ start, end }) => {
    const x = Math.min(start.x, end.x);
    const y = Math.min(start.y, end.y);
    const width = Math.abs(end.x - start.x);
    const height = Math.abs(end.y - start.y);
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke="black"
            strokeWidth={2}
            fill="none"
        />
    );
};

export const ArrowShape = ({ start, end }) => {
    if (distance(start, end) < MIN_ARROW_LENGTH) return null;
    return (
        <g>
            <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="black"
                strokeWidth={2}
            />
            <path
                d={getOpenArrowHead(start, end)}
                stroke="black"
                strokeWidth={2}
                fill="none"
            />
        </g>
    );
};

export const TextShape = ({ x, y, value, fontSize }) => (
    <text x={x} y={y} fontSize={fontSize} fontFamily={FONT_FAMILY} fill="black">
        {value}
    </text>
);

export const RenderShape = ({ shape }) => {
    switch (shape.type) {
        case TOOLS.PEN:
            return <PenShape points={shape.points} />;
        case TOOLS.RECTANGLE:
            return <RectangleShape start={shape.start} end={shape.end} />;
        case TOOLS.ARROW:
            return <ArrowShape start={shape.start} end={shape.end} />;
        case TOOLS.TEXT:
            return <TextShape {...shape} />;
        default:
            return null;
    }
};
