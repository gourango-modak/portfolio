import { PenLine } from "lucide-react";
// const store = useCanvasStore.getState(); // Only setter API

export const arrowTool = {
    name: "arrowTool",
    icon: PenLine,
    cursor: "default",
    label: "Arrow Tool",
    defaultSettings: {
        strokeColor: { value: "#000", label: "Stroke Color" },
        strokeWidth: { value: 2, label: "Stroke Width" },
        isDashed: { value: false, label: "Dashed Line" },
    },
    onDown: (event) => {
        // console.log("Down", event);
        // store.startShape({ type: "arrow", from: pos, to: pos });
    },
    onMove: (event) => {
        // console.log("Move", event);
        // store.updateShape({ to: pos });
    },
    onUp: (event) => {
        // console.log("Up", event);
        // store.commitShape();
    },
};
