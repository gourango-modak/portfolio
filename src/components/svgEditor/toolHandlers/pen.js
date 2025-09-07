import getStroke from "perfect-freehand";
import { PEN_OPTIONS, TOOLS } from "../svgEdtiorConfig";
import { generateId } from "./../../../utils/common";

export const penHandler = {
    onPointerDown: (_, { setPoints }, coords, e) => {
        setPoints([[coords.x, coords.y, e.pressure || 0.5]]);
    },
    onPointerMove: (_, { setPoints }, coords, e) => {
        if (e.buttons !== 1) return;
        setPoints((prev) => [...prev, [coords.x, coords.y, e.pressure || 0.5]]);
    },
    onPointerUp: ({ points }, { setShapes, setPoints }) => {
        if (points.length === 0) return;
        const stroke = getStroke(points, PEN_OPTIONS);
        setShapes((prev) => [
            ...prev,
            { id: generateId(), type: TOOLS.PEN, points: stroke },
        ]);
        setPoints([]);
    },
};
