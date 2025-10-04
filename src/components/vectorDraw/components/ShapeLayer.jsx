import { useCanvasStore } from "../store/useCanvasStore";
import { useShapeStore } from "../store/useShapeStore";
import ShapeRenderer from "./ShapeRenderer";

const ShapeLayer = () => {
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
            {shapeOrder.map((id) => (
                <ShapeRenderer key={id} shapeId={id} />
            ))}
        </svg>
    );
};

export default ShapeLayer;
