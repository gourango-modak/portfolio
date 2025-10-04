import { useState } from "react";
import getStroke from "perfect-freehand";

const FreehandCanvas = () => {
    const [points, setPoints] = useState([]);
    const [strokes, setStrokes] = useState([]);

    function handlePointerDown(e) {
        setPoints([{ x: e.clientX, y: e.clientY }]);
    }

    function handlePointerMove(e) {
        if (points.length === 0) return;
        setPoints([...points, { x: e.clientX, y: e.clientY }]);
    }

    function handlePointerUp() {
        const stroke = getStroke(points, { size: 24 });
        const pathData = getSvgPathFromStroke(stroke);
        setStrokes([...strokes, pathData]);
        setPoints([]);
    }

    const liveStroke = points.length
        ? getSvgPathFromStroke(getStroke(points, { size: 24 }))
        : null;

    return (
        <svg
            style={{ width: "100vw", height: "100vh", background: "#fff" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {strokes.map((d, i) => (
                <path key={i} d={d} fill="black" />
            ))}
            {liveStroke && <path d={liveStroke} fill="black" />}
        </svg>
    );
};

const average = (a, b) => (a + b) / 2;

function getSvgPathFromStroke(points, closed = true) {
    const len = points.length;

    if (len < 4) {
        return ``;
    }

    let a = points[0];
    let b = points[1];
    const c = points[2];

    let result = `M${a[0].toFixed(2)},${a[1].toFixed(2)} Q${b[0].toFixed(
        2
    )},${b[1].toFixed(2)} ${average(b[0], c[0]).toFixed(2)},${average(
        b[1],
        c[1]
    ).toFixed(2)} T`;

    for (let i = 2, max = len - 1; i < max; i++) {
        a = points[i];
        b = points[i + 1];
        result += `${average(a[0], b[0]).toFixed(2)},${average(
            a[1],
            b[1]
        ).toFixed(2)} `;
    }

    if (closed) {
        result += "Z";
    }

    return result;
}

export default FreehandCanvas;
