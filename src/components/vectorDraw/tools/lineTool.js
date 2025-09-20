import { MoveUpRight } from "lucide-react";
// import { useCanvasStore } from "../temp/useCanvasStore";

// const store = useCanvasStore.getState(); // Only setter API

export const lineTool = {
    name: "lineTool",
    icon: MoveUpRight,
    cursor: "default",
    label: "Line",
    defaultSettings: {
        strokeColor: { value: "#000", label: "Stroke Color" },
        strokeWidth: { value: 2, label: "Stroke Width" },
        isDashed: { value: false, label: "Dashed Line" },
    },
    onDown: ({ pos }) => {
        // store.startShape({ type: "line", points: [pos] });
    },
    onMove: ({ pos }) => {
        // store.updateShape((shape) => ({
        //     points: [...shape.points, pos],
        // }));
    },
    onUp: () => {
        // store.commitShape();
    },
};
