import React from "react";
import { useShapesStore } from "../store/useShapesStore";

export const InfiniteCanvas = () => {
    const shapes = useShapesStore((s) => s.shapes);
    // const { setCanvasMode, addFrame } = useCanvasStore();
    // const handleAddFrame = () => {
    //     addFrame({
    //         x: 100,
    //         y: 100,
    //         width: 800,
    //         height: 600,
    //         bgColor: "#f0f0f0",
    //     });
    //     setCanvasMode("framed");
    // };
    return (
        <g>
            {Object.values(shapes).map((shape) => (
                <ShapeRenderer key={shape.id} shape={shape} />
            ))}
            {/* <foreignObject x="100" y="100" width="100" height="50">
                <button
                    onClick={handleAddFrame}
                    class="px-5 py-2 rounded-lg bg-blue-500 text-white shadow-lg cursor-pointer"
                >
                    Add Frame
                </button>
            </foreignObject> */}
        </g>
    );
};
