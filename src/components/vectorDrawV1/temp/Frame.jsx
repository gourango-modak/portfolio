import React from "react";
import { useShapesStore } from "../stores/useShapesStore";
import ShapeRenderer from "./ShapeRenderer";

const Frame = React.memo(({ frame }) => {
    const frameShapes = useShapesStore((s) =>
        Object.values(s.shapes).filter((shape) => shape.frameId === frame.id)
    );

    return (
        <g transform={`translate(${frame.x}, ${frame.y})`}>
            <rect
                x={0}
                y={0}
                width={frame.width}
                height={frame.height}
                fill={frame.bgColor}
                stroke="#ccc"
                strokeWidth="2"
            />
            {frameShapes.map((shape) => (
                <ShapeRenderer key={shape.id} shape={shape} />
            ))}
        </g>
    );
});

export default Frame;
