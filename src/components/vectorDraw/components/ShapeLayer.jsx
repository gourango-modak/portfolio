import { useCanvasStore } from "../store/useCanvasStore";
import { useShapeStore } from "../store/useShapeStore";
import ShapeRenderer from "./ShapeRenderer";

const ShapeLayer = () => {
    const scale = useCanvasStore((s) => s.properties.scale);
    const pan = useCanvasStore((s) => s.properties.pan);

    const shapeOrder = useShapeStore((s) => s.shapeOrder);
    const canvasBgColor = useCanvasStore((s) => s.properties.canvasBgColor);

    return (
        <svg
            style={{
                position: "absolute",
                width: "100%",
                height: "100vh",
                background: canvasBgColor.value,
            }}
        >
            <g transform={`translate(${pan.x}, ${pan.y}) scale(${scale})`}>
                {shapeOrder.map((id) => (
                    <ShapeRenderer key={id} shapeId={id} />
                ))}
            </g>
        </svg>
    );
};

export default ShapeLayer;
