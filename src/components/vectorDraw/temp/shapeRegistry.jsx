import React from "react";

/**
 * Renders a rectangle shape.
 * @param {object} props - The shape properties.
 * @param {boolean} isLive - True if the shape is being drawn or moved.
 */
const RectangleRenderer = ({ shape, isLive }) => (
    <rect
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        fill={isLive ? "none" : shape.fillColor}
        stroke={shape.strokeColor}
        strokeWidth={shape.strokeWidth}
    />
);

/**
 * Renders an ellipse shape.
 * @param {object} props - The shape properties.
 * @param {boolean} isLive - True if the shape is being drawn or moved.
 */
const EllipseRenderer = ({ shape, isLive }) => (
    <ellipse
        cx={shape.x}
        cy={shape.y}
        rx={shape.width / 2}
        ry={shape.height / 2}
        fill={isLive ? "none" : shape.fillColor}
        stroke={shape.strokeColor}
        strokeWidth={shape.strokeWidth}
    />
);

// You can add more shape renderers here as your app grows.
// For example:
// const LineRenderer = ({ shape, isLive }) => (<line.../>);

/**
 * A registry that maps shape types to their React components.
 * This object is the single source of truth for rendering logic.
 */
export const shapeRegistry = {
    rectangle: RectangleRenderer,
    ellipse: EllipseRenderer,
};
