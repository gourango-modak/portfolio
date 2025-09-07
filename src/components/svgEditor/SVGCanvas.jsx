import { RenderShape } from "./Shapes";
import { CurrentDrawing } from "./CurrentDrawing";

export const SVGCanvas = ({
    svgRef,
    shapes,
    points,
    currentShape,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
}) => {
    return (
        <svg
            ref={svgRef}
            width="100%"
            height="100vh"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                backgroundColor: "#fff",
                touchAction: "none",
                userSelect: "none",
            }}
        >
            {shapes.map((shape) => (
                <RenderShape key={shape.id} shape={shape} />
            ))}

            {/* current tool preview */}
            <CurrentDrawing points={points} currentShape={currentShape} />
        </svg>
    );
};
