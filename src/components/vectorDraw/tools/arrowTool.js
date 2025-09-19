import { PenLine } from "lucide-react";
// const store = useCanvasStore.getState(); // Only setter API

export const arrowTool = {
    name: "arrowTool",
    icon: PenLine,
    cursor: "default",
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
