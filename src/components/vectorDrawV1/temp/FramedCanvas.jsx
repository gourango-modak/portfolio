import React from "react";
import { useCanvasStore } from "../stores/useCanvasStore";
import Frame from "./Frame";

const FramedCanvas = () => {
    const {
        frames,
        frameOrder,
        canvasMode,
        activeFrameId,
        nextFrame,
        prevFrame,
    } = useCanvasStore();
    let framesToRender = [];
    if (canvasMode === "framed") {
        framesToRender = frameOrder.map((id) => frames[id]);
    } else if (canvasMode === "paged-frame" && activeFrameId) {
        framesToRender = [frames[activeFrameId]];
    }
    const isPaged = canvasMode === "paged-frame";
    return (
        <g>
            {framesToRender.map((frame) => (
                <Frame key={frame.id} frame={frame} />
            ))}
            {isPaged && (
                <foreignObject x="200" y="200" width="200" height="50">
                    <div class="flex gap-2">
                        <button
                            onClick={prevFrame}
                            class="px-5 py-2 rounded-lg bg-blue-500 text-white cursor-pointer"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextFrame}
                            class="px-5 py-2 rounded-lg bg-blue-500 text-white cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </foreignObject>
            )}
        </g>
    );
};
